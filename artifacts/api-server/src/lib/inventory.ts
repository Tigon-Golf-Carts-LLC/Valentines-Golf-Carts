const DMS_BASE = "https://api.tigondms.com/wp-website";
const IMAGE_BASE = "https://s3.amazonaws.com/prod.docs.s3/carts/";
const CACHE_MS = 5 * 60 * 1000;
const DMS_PAGE_SIZE = 100;
const DMS_PAGE_BATCH_SIZE = 10;

type RawRecord = Record<string, any>;
type Snapshot = { generatedAt: string; source: string; summary: any; facets: any; carts: any[]; locations: any[] };
let cache: { expires: number; data: Snapshot } | null = null;

const slugify = (value: unknown) =>
  String(value ?? "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function dms(path: string, body?: unknown): Promise<any> {
  const response = await fetch(`${DMS_BASE}${path}`, {
    method: body ? "POST" : "GET",
    headers: { Accept: "application/json", ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`DMS ${path} returned ${response.status}`);
  return response.json();
}

async function allDmsCarts(): Promise<RawRecord[]> {
  const first = await dms("/get-carts", {
    pageNumber: 0,
    pageSize: DMS_PAGE_SIZE,
    isAllCarts: true,
  });
  const firstPage: RawRecord[] = Array.isArray(first?.carts) ? first.carts : [];
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

function priceOf(raw: RawRecord): number | null {
  for (const value of [raw.retailPrice, raw.salePrice, raw.webPrice, raw.internetPrice, raw.listPrice, raw.askingPrice]) {
    const number = typeof value === "string" ? Number(value.replace(/[^0-9.]/g, "")) : value;
    if (typeof number === "number" && Number.isFinite(number) && number > 0) return number;
  }
  return null;
}

function sellable(raw: RawRecord) {
  const hasImages = Array.isArray(raw?.imageUrls) &&
    raw.imageUrls.some((image: unknown) => typeof image === "string" && image.trim().length > 0);

  return (
    String(raw?.status).trim().toLowerCase() === "retail" ||
    raw?.rfsStatus?.isRFS === true
  ) &&
    hasImages;
}

function facet(carts: any[], field: string, labelField = field) {
  const values = new Map<string, { key: string; label: string; count: number }>();
  for (const cart of carts) {
    const label = String(cart[labelField] ?? "").trim();
    const key = slugify(cart[field]);
    if (!key || !label) continue;
    const item = values.get(key) ?? { key, label, count: 0 };
    item.count++;
    values.set(key, item);
  }
  return [...values.values()].sort((a, b) => a.label.localeCompare(b.label));
}

export async function inventorySnapshot(): Promise<Snapshot> {
  if (cache && cache.expires > Date.now()) return cache.data;
  const [stores, rawCarts] = await Promise.all([dms("/tigon-stores"), allDmsCarts()]);
  const storeMap = new Map((Array.isArray(stores) ? stores : []).map((store: RawRecord) => [store.storeId, store]));
  const carts = rawCarts.filter(sellable).map((raw) => {
    const make = String(raw?.cartType?.make ?? "").trim();
    const model = String(raw?.cartType?.model ?? "").trim();
    const year = String(raw?.cartType?.year ?? "").trim();
    const color = String(raw?.cartAttributes?.cartColor ?? "").trim();
    const store = storeMap.get(raw?.cartLocation?.locationId ?? raw?.cartLocation?.latestStoreId) as RawRecord | undefined;
    const city = String(store?.address?.city ?? "");
    const state = String(store?.address?.state ?? "");
    return {
      id: String(raw._id), slug: slugify(`${make}-${model}-${color}-${city}-${raw._id}`), make, model,
      title: [year, make, model].filter(Boolean).join(" "), year, price: priceOf(raw),
      condition: raw.isUsed ? "Used" : "New", fuel: raw.isElectric ? "Electric" : "Gas", color,
      passengers: String(raw?.cartAttributes?.passengers ?? ""), city, state,
      stateCode: String(store?.address?.stateCode ?? ""), location: String(store?.name ?? city),
      isStreetLegal: raw?.title?.isStreetLegal === true, isLifted: raw?.cartAttributes?.isLifted === true,
      images: (() => {
        return raw.imageUrls
          .filter((x: unknown): x is string => typeof x === "string" && x.trim().length > 0)
          .map((x: string) => `${IMAGE_BASE}${x}`);
      })(),
      vin: String(raw?.vinNo ?? ""), sku: String(raw?.pid ?? raw?._id ?? ""),
      serial: String(raw?.serialNo ?? ""), odometer: raw?.odometer ?? null, hours: raw?.hour ?? null,
      warranty: String(raw?.warrantyLength ?? ""),
      specifications: {
        seatColor: String(raw?.cartAttributes?.seatColor ?? ""),
        driveTrain: String(raw?.cartAttributes?.driveTrain ?? ""),
        tireType: String(raw?.cartAttributes?.tireType ?? ""),
        tireRimSize: String(raw?.cartAttributes?.tireRimSize ?? ""),
        hasSoundSystem: raw?.cartAttributes?.hasSoundSystem === true,
        hasHitch: raw?.cartAttributes?.hasHitch === true,
        hasExtendedTop: raw?.cartAttributes?.hasExtendedTop === true,
        batteryType: String(raw?.battery?.type ?? ""),
        batteryBrand: String(raw?.battery?.brand ?? ""),
        batteryYear: String(raw?.battery?.year ?? ""),
        batteryAmpHours: String(raw?.battery?.ampHours ?? ""),
        batteryVoltage: String(raw?.battery?.batteryVoltage ?? ""),
        batteryPackVoltage: String(raw?.battery?.packVoltage ?? ""),
        engineMake: String(raw?.engine?.make ?? ""),
        horsepower: String(raw?.engine?.horsepower ?? ""),
        stroke: String(raw?.engine?.stroke ?? ""),
      },
    };
  });
  const prices = carts.map((c) => c.price).filter((p): p is number => typeof p === "number");
  const makes = facet(carts, "make");
  const modelsMap = new Map<string, any>();
  for (const cart of carts) {
    const key = slugify(cart.model);
    const mapKey = `${slugify(cart.make)}:${key}`;
    if (!key) continue;
    const item = modelsMap.get(mapKey) ?? { key, label: cart.model, count: 0, makeKey: slugify(cart.make) };
    item.count++;
    modelsMap.set(mapKey, item);
  }
  const locations = (Array.isArray(stores) ? stores : []).map((store: RawRecord) => {
    const city = String(store?.address?.city ?? "");
    return {
      slug: slugify(`${city}-${store?.address?.state}`), city, state: String(store?.address?.state ?? ""),
      stateCode: String(store?.address?.stateCode ?? ""), address: String(store?.address?.address1 ?? ""),
      postalCode: String(store?.address?.postalCode ?? ""), phone: String(store?.phone ?? ""),
      cartCount: carts.filter((cart) => cart.location === store.name).length,
      latitude: store?.storeLocation?.latitude ?? null, longitude: store?.storeLocation?.longitude ?? null,
    };
  }).filter((location: any) => location.city);
  const data = {
    generatedAt: new Date().toISOString(), source: "Tigon DMS live",
    summary: {
      total: carts.length, new: carts.filter(c => c.condition === "New").length, used: carts.filter(c => c.condition === "Used").length,
      electric: carts.filter(c => c.fuel === "Electric").length, gas: carts.filter(c => c.fuel === "Gas").length,
      streetLegal: carts.filter(c => c.isStreetLegal).length, lifted: carts.filter(c => c.isLifted).length,
      priceMin: prices.length ? Math.min(...prices) : null, priceMax: prices.length ? Math.max(...prices) : null,
    },
    facets: { makes, models: [...modelsMap.values()].sort((a, b) => a.label.localeCompare(b.label)), colors: facet(carts, "color"), seats: facet(carts, "passengers") },
    carts, locations,
  };
  cache = { expires: Date.now() + CACHE_MS, data };
  return data;
}
