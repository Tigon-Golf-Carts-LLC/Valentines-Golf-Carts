import { useEffect } from "react";
import { useLocation } from "wouter";
import { policiesBySlug } from "@/lib/policies";

const SITE_URL = "https://valentinesgolfcarts.com";

const pages: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Valentines Golf Carts | Nationwide Sale Event",
    description:
      "Shop Valentine's Day golf carts. Browse nationwide new and pre-owned event inventory, compare options, and contact our team today.",
  },
  "/inventory": {
    title: "Valentine's Day Golf Cart Deals | Nationwide Inventory",
    description:
      "Browse Valentine's Day golf cart deals across nationwide live inventory. Filter new and pre-owned carts by brand, power type, and price, then request details.",
  },
  "/brands": {
    title: "Valentine's Day Golf Cart Brands | Nationwide Event Sale",
    description:
      "Compare golf cart brands included in the nationwide Valentine's Day Golf Cart Sales Event. Review available makes, then browse current event inventory.",
  },
  "/locations": {
    title: "Valentine's Day Golf Cart Dealers | Nationwide Locations",
    description:
      "Find participating dealers across the United States for the Valentine's Day Golf Cart Sales Event. Check current locations and browse available inventory.",
  },
  "/financing": {
    title: "Valentine's Day Golf Cart Financing | Apply Online Today",
    description:
      "Compare financing programs for Valentine's Day golf carts through six national lending partners. Estimate a monthly payment and apply online today.",
  },
  "/contact": {
    title: "Contact Valentines Golf Carts | Nationwide Event",
    description:
      "Contact Valentines Golf Carts about event deals, nationwide inventory, participating dealers, or financing. Call or send a message today.",
  },
};

function setMeta(selector: string, content: string) {
  document
    .querySelector<HTMLMetaElement>(selector)
    ?.setAttribute("content", content);
}

export function SeoManager() {
  const [location] = useLocation();

  useEffect(() => {
    const route = location.startsWith("/inventory/") ? "/inventory" : location;
    const policySlug = location.match(/^\/policies\/([^/?#]+)/)?.[1];
    const policy = policySlug ? policiesBySlug[policySlug] : undefined;
    const meta = policy
      ? {
          title: `${policy.title} | Valentines Golf Carts`,
          description: policy.description,
        }
      : (pages[route] ?? {
          title: "Valentines Golf Carts | Nationwide Annual Sales Event",
          description:
            "Shop the nationwide Valentine's Day Golf Cart Sales Event. Browse current inventory, participating dealers, and financing options.",
        });
    const canonicalPath = location === "/" ? "" : location.split("?")[0];
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    document.title = meta.title;
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.description);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[name="twitter:title"]', meta.title);
    setMeta('meta[name="twitter:description"]', meta.description);
    document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute("href", canonicalUrl);
  }, [location]);

  return null;
}
