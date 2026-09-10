import { mkdir, readFile, writeFile } from "node:fs/promises";

const DMS_BASE = "https://api.tigondms.com/wp-website";
const IMAGE_BASE = "https://s3.amazonaws.com/prod.docs.s3/carts/";
const SITE_BASE = "https://valentinesgolfcarts.com";
const DMS_PAGE_SIZE = 100;
const DMS_PAGE_BATCH_SIZE = 10;
const outputDir = new URL("../../artifacts/holiday-golf-carts/public/data/", import.meta.url);
const publicDir = new URL("../../artifacts/holiday-golf-carts/public/", import.meta.url);

const slugify = (value) =>
  String(value ?? "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const escapeXml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

async function dms(path, body) {
  const response = await fetch(`${DMS_BASE}${path}`, {
    method: body ? "POST" : "GET",
    headers: { Accept: "application/json", ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) throw new Error(`DMS ${path} returned ${response.status}`);
  return response.json();
}

async function allDmsCarts() {
  const first = await dms("/get-carts", {
    pageNumber: 0,
    pageSize: DMS_PAGE_SIZE,
    isAllCarts: true,
  });
  const firstPage = Array.isArray(first?.carts) ? first.carts : [];
  const totalCarts = Number(first?.totalCarts ?? firstPage.length);
  const pageCount = Math.ceil(totalCarts / DMS_PAGE_SIZE);
  const carts = [...firstPage];

  for (let pageNumber = 1; pageNumber < pageCount; pageNumber += DMS_PAGE_BATCH_SIZE) {
    const pageNumbers = Array.from(
      { length: Math.min(DMS_PAGE_BATCH_SIZE, pageCount - pageNumber) },
      (_, index) => pageNumber + index,
    );
    const pages = await Promise.all(
      pageNumbers.map((number) =>
        dms("/get-carts", {
          pageNumber: number,
          pageSize: DMS_PAGE_SIZE,
          isAllCarts: true,
        }),
      ),
    );
    for (const page of pages) {
      if (Array.isArray(page?.carts)) carts.push(...page.carts);
    }
  }

  const uniqueCarts = [...new Map(carts.map((cart) => [String(cart?._id), cart])).values()];
  if (uniqueCarts.length < Math.floor(totalCarts * 0.99)) {
    throw new Error(
      `Incomplete paginated DMS response: received ${uniqueCarts.length} of ${totalCarts} carts.`,
    );
  }
  return uniqueCarts;
}

const facet = (carts, field) => {
  const values = new Map();
  for (const cart of carts) {
    const label = String(cart[field] ?? "").trim();
    const key = slugify(label);
    if (!key || !label) continue;
    const item = values.get(key) ?? { key, label, count: 0 };
    item.count += 1;
    values.set(key, item);
  }
  return [...values.values()].sort((a, b) => a.label.localeCompare(b.label));
};

const [storesResult, rawCarts] = await Promise.all([
  dms("/tigon-stores"),
  allDmsCarts(),
]);
const stores = Array.isArray(storesResult) ? storesResult : [];
const storeMap = new Map(stores.map((store) => [store.storeId, store]));

const carts = rawCarts
  .filter((raw) =>
    (
      String(raw?.status).trim().toLowerCase() === "retail" ||
      raw?.rfsStatus?.isRFS === true
    ) &&
    Array.isArray(raw?.imageUrls) &&
    raw.imageUrls.some((image) => typeof image === "string" && image.trim().length > 0)
  )
  .map((raw) => {
    const make = String(raw?.cartType?.make ?? "").trim();
    const model = String(raw?.cartType?.model ?? "").trim();
    const year = String(raw?.cartType?.year ?? "").trim();
    const color = String(raw?.cartAttributes?.cartColor ?? "").trim();
    const store = storeMap.get(raw?.cartLocation?.locationId ?? raw?.cartLocation?.latestStoreId);
    const city = String(store?.address?.city ?? "");
    const images = raw.imageUrls
      .filter((name) => typeof name === "string" && name.trim().length > 0)
      .map((name) => `${IMAGE_BASE}${name}`);
    const price = Number(raw.retailPrice ?? raw.salePrice ?? raw.webPrice ?? 0) || null;
    return {
      id: String(raw._id), slug: slugify(`${make}-${model}-${color}-${city}-${raw._id}`),
      make, model, title: [year, make, model].filter(Boolean).join(" "), year, price,
      condition: raw.isUsed ? "Used" : "New", fuel: raw.isElectric ? "Electric" : "Gas", color,
      passengers: String(raw?.cartAttributes?.passengers ?? ""), city,
      state: String(store?.address?.state ?? ""), stateCode: String(store?.address?.stateCode ?? ""),
      location: String(store?.name ?? city), isStreetLegal: raw?.title?.isStreetLegal === true,
      isLifted: raw?.cartAttributes?.isLifted === true, images, vin: String(raw?.vinNo ?? ""),
      sku: String(raw?.pid ?? raw?._id ?? ""), serial: String(raw?.serialNo ?? ""),
      odometer: raw?.odometer ?? null, hours: raw?.hour ?? null, warranty: String(raw?.warrantyLength ?? ""),
      specifications: {
        seatColor: String(raw?.cartAttributes?.seatColor ?? ""), driveTrain: String(raw?.cartAttributes?.driveTrain ?? ""),
        tireType: String(raw?.cartAttributes?.tireType ?? ""), tireRimSize: String(raw?.cartAttributes?.tireRimSize ?? ""),
        hasSoundSystem: raw?.cartAttributes?.hasSoundSystem === true, hasHitch: raw?.cartAttributes?.hasHitch === true,
        hasExtendedTop: raw?.cartAttributes?.hasExtendedTop === true, batteryType: String(raw?.battery?.type ?? ""),
        batteryBrand: String(raw?.battery?.brand ?? ""), batteryYear: String(raw?.battery?.year ?? ""),
        batteryAmpHours: String(raw?.battery?.ampHours ?? ""), batteryVoltage: String(raw?.battery?.batteryVoltage ?? ""),
        batteryPackVoltage: String(raw?.battery?.packVoltage ?? ""), engineMake: String(raw?.engine?.make ?? ""),
        horsepower: String(raw?.engine?.horsepower ?? ""), stroke: String(raw?.engine?.stroke ?? ""),
      },
    };
  });

const prices = carts.map((cart) => cart.price).filter((price) => typeof price === "number");
const makes = facet(carts, "make");
const models = facet(carts, "model").map((item) => ({
  ...item,
  makeKey: slugify(carts.find((cart) => slugify(cart.model) === item.key)?.make),
}));
const locations = stores.map((store) => ({
  slug: slugify(`${store?.address?.city}-${store?.address?.state}`), city: String(store?.address?.city ?? ""),
  state: String(store?.address?.state ?? ""), stateCode: String(store?.address?.stateCode ?? ""),
  address: String(store?.address?.address1 ?? ""), postalCode: String(store?.address?.postalCode ?? ""),
  phone: String(store?.phone ?? ""), cartCount: carts.filter((cart) => cart.location === store.name).length,
  latitude: store?.storeLocation?.latitude ?? null, longitude: store?.storeLocation?.longitude ?? null,
})).filter((location) => location.city);

const snapshot = {
  generatedAt: new Date().toISOString(), source: "Tigon DMS daily snapshot",
  summary: {
    total: carts.length, new: carts.filter((cart) => cart.condition === "New").length,
    used: carts.filter((cart) => cart.condition === "Used").length,
    electric: carts.filter((cart) => cart.fuel === "Electric").length,
    gas: carts.filter((cart) => cart.fuel === "Gas").length,
    streetLegal: carts.filter((cart) => cart.isStreetLegal).length,
    lifted: carts.filter((cart) => cart.isLifted).length,
    priceMin: prices.length ? Math.min(...prices) : null, priceMax: prices.length ? Math.max(...prices) : null,
  },
  facets: { makes, models, colors: facet(carts, "color"), seats: facet(carts, "passengers") },
  carts, locations,
};

let previousTotal = 0;
try {
  const previousSnapshot = JSON.parse(
    await readFile(new URL("inventory.json", outputDir), "utf8"),
  );
  previousTotal = Number(previousSnapshot?.summary?.total ?? previousSnapshot?.carts?.length ?? 0);
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

const minimumSafeTotal = Math.max(100, previousTotal > 0 ? Math.floor(previousTotal * 0.8) : 0);
if (carts.length < minimumSafeTotal) {
  throw new Error(
    `Refusing to publish an incomplete DMS snapshot: received ${carts.length} qualifying carts; expected at least ${minimumSafeTotal}.`,
  );
}

const lastModified = new Date().toISOString().slice(0, 10);
const staticPages = [
  ["/", "weekly", "1.0"],
  ["/inventory", "hourly", "0.9"],
  ["/brands", "daily", "0.8"],
  ["/locations", "daily", "0.8"],
  ["/financing", "monthly", "0.7"],
  ["/contact", "monthly", "0.8"],
  ["/policies/terms-and-conditions", "yearly", "0.4"],
  ["/policies/sales-event-policy", "yearly", "0.5"],
  ["/policies/return-policy", "yearly", "0.4"],
  ["/policies/privacy-policy", "yearly", "0.4"],
  ["/policies/delivery-policy", "yearly", "0.4"],
  ["/policies/publishing-policy", "yearly", "0.3"],
  ["/policies/feedback-policy", "yearly", "0.3"],
  ["/policies/corrections-policy", "yearly", "0.3"],
  ["/policies/diversity-policy", "yearly", "0.3"],
  ["/policies/ethics-policy", "yearly", "0.3"],
  ["/policies/staffing-report", "yearly", "0.3"],
];
const pageEntries = [
  ...staticPages.map(
    ([path, changefreq, priority]) => `  <url>
    <loc>${SITE_BASE}${path}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  ),
  ...carts.map(
    (cart) => `  <url>
    <loc>${SITE_BASE}/inventory/${escapeXml(cart.slug)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`,
  ),
];
const sitemapPages = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pageEntries.join("\n")}
</urlset>
`;
const homepageImages = [
  ["hero_2.jpg", "Valentines Golf Carts one-day Valentine's Day Golf Cart Sales Event on February 14, 2027", "Valentines Golf Carts Event"],
  ["lineup_2.jpg", "Golf cart lineup for the one-day Valentine's Day Golf Cart Sales Event", "Valentines Golf Cart Lineup"],
  ["logo_2.png", "Valentines Golf Carts campaign logo", "Valentines Golf Carts Logo"],
  ["valentines-social-card.jpg", "Valentines Golf Carts social sharing artwork", "Valentines Golf Carts Social Image"],
  ["valentines-app-icon.png", "Valentines Golf Carts application icon", "Valentines Golf Carts App Icon"],
];
const homepageImageEntry = `  <url>
    <loc>${SITE_BASE}/</loc>
${homepageImages
  .map(
    ([path, caption, title]) => `    <image:image>
      <image:loc>${SITE_BASE}/${path}</image:loc>
      <image:caption>${escapeXml(caption)}</image:caption>
      <image:title>${escapeXml(title)}</image:title>
    </image:image>`,
  )
  .join("\n")}
  </url>`;
const vehicleImageEntries = carts.map(
  (cart) => `  <url>
    <loc>${SITE_BASE}/inventory/${escapeXml(cart.slug)}</loc>
${cart.images
  .map(
    (image) => `    <image:image>
      <image:loc>${escapeXml(image)}</image:loc>
       <image:caption>${escapeXml(`${cart.title} Valentine's Day Golf Cart Sales Event deal`)}</image:caption>
      <image:title>${escapeXml(cart.title)}</image:title>
    </image:image>`,
  )
  .join("\n")}
  </url>`,
);
const sitemapImages = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[homepageImageEntry, ...vehicleImageEntries].join("\n")}
</urlset>
`;
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_BASE}/sitemap-pages.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_BASE}/sitemap-images.xml</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>
</sitemapindex>
`;

await mkdir(outputDir, { recursive: true });
await Promise.all([
  writeFile(new URL("inventory.json", outputDir), JSON.stringify(snapshot)),
  writeFile(new URL("featured.json", outputDir), JSON.stringify({ ...snapshot, carts: carts.filter((cart) => cart.isStreetLegal || cart.isLifted).slice(0, 8) })),
  writeFile(new URL("locations.json", outputDir), JSON.stringify(locations)),
  writeFile(new URL("sitemap-pages.xml", publicDir), sitemapPages),
  writeFile(new URL("sitemap-images.xml", publicDir), sitemapImages),
  writeFile(new URL("sitemap.xml", publicDir), sitemapIndex),
]);
console.info(
  `Synced ${carts.length} qualifying Retail/RFS carts and regenerated vehicle and image sitemaps.`,
);