# SEO Optimization Changelog

## 2026-09-10 nationwide SEO safety pass

- Simplified `artifacts/holiday-golf-carts/public/robots.txt` to the standard wildcard allow rule and sitemap-index reference; removed crawl-delay directives and redundant bot groups.
- Corrected the “a one-day” wording in `llms.txt` and `llms-full.txt`.
- Added the read-only `artifacts/holiday-golf-carts/public/.well-known/agent.json` discovery descriptor.
- Audited `artifacts/holiday-golf-carts/index.html`: retained truthful Organization, WebSite, and event markup, removed the unrelated developer Person schema, removed the unsupported price range and address-bearing event location, and kept nationwide metadata.
- Updated `seo/keyword-map.md` and `seo/audit-report.md` for nationwide Valentine's Day golf cart targeting.
- No Lighthouse, Rich Results, or other external validation is claimed by this pass.

Protected inventory files were deliberately skipped: `public/data/*.json`, `public/sitemap-pages.xml`, `public/sitemap-images.xml`, `scripts/src/sync-valentines-inventory.mjs`, `src/pages/Inventory.tsx`, `src/pages/Vehicle.tsx`, `src/components/CartCard.tsx`, `src/components/CartGrid.tsx`, and all inventory hooks, mappers, API behavior, and generated inventory contracts. No product feeds or duplicate inventory snapshots were created.

## Updated

- `artifacts/holiday-golf-carts/index.html` — added an invisible standalone developer `Person` schema and author meta tag for Noah Jaslow of Jaslow Digital Marketing.
- `artifacts/holiday-golf-carts/index.html` — strengthened default metadata and added factual nationwide Organization, AutoDealer, and WebSite schema.
- `artifacts/holiday-golf-carts/src/components/SeoManager.tsx` — updated static route titles and descriptions only; inventory route behavior was not changed.
- `artifacts/holiday-golf-carts/src/components/layout/Footer.tsx` — aligned business identity, phone, hours, and nationwide scope.
- `artifacts/holiday-golf-carts/src/pages/Contact.tsx` — removed a fabricated address and unsupported 24/7 claim; added verified nationwide support details.
- `artifacts/holiday-golf-carts/src/pages/Financing.tsx` — corrected the phone number and business-hours language.
- `artifacts/holiday-golf-carts/public/robots.txt` — explicitly allows public crawling, including named AI crawlers.
- `artifacts/holiday-golf-carts/public/sitemap.xml` — added last-modified dates to existing public routes.
- `artifacts/holiday-golf-carts/public/sitemap.xml` — converted to a standards-based sitemap index.
- `artifacts/holiday-golf-carts/public/sitemap-pages.xml` — added the six canonical public routes with dates, priorities, and change frequencies.
- `artifacts/holiday-golf-carts/public/sitemap-images.xml` — added the four static campaign images without copying vehicle inventory images.
- `artifacts/holiday-golf-carts/public/llms.txt` — added concise machine-readable site guidance.
- `artifacts/holiday-golf-carts/public/llms-full.txt` — added detailed factual site and citation guidance.
- `artifacts/holiday-golf-carts/public/api/site-info.json` — added static business and navigation data without inventory.
- `artifacts/holiday-golf-carts/public/ai.txt`, `seo.txt`, and `nlp.txt` — added factual machine-readable entity, intent, and discovery guidance without granting unverified data rights.
- `artifacts/holiday-golf-carts/public/bots.txt` and `crawlers.txt` — added pointers to authoritative crawler resources.
- `artifacts/holiday-golf-carts/public/geo.txt` — documented nationwide coverage and explicitly avoided unsupported local claims.
- `artifacts/holiday-golf-carts/public/humans.txt`, `accessibility.txt`, and `images.txt` — added factual human, accessibility, and image discovery information.
- `artifacts/holiday-golf-carts/public/ads.txt` — declared that no digital advertising sellers are currently listed.
- `artifacts/holiday-golf-carts/public/manifest.webmanifest` and `browserconfig.xml` — added install and tile metadata without claiming unsupported offline or push features.
- `artifacts/api-server/src/routes/site-info.ts` — added the same read-only, inventory-free response for Replit hosting.
- `artifacts/api-server/src/routes/index.ts` — registered the standalone site-information route; existing inventory route imports and mounts were not changed.
- `seo/keyword-map.md` — added nationwide keyword, entity, intent, and topic-cluster mapping.
- `seo/audit-report.md` — added page-by-page metadata and schema audit.

## Deliberately skipped: DMS and inventory bindings

- `artifacts/api-server/src/lib/inventory.ts` — DMS fetch, qualification, image, and mapping logic.
- `artifacts/api-server/src/routes/inventory.ts` — inventory API filtering and response logic.
- `artifacts/api-server/src/routes/locations.ts` — location data derived from the inventory snapshot.
- `artifacts/api-server/src/app.ts` — routing infrastructure for inventory APIs.
- `scripts/src/sync-black-friday-inventory.mjs` — generated inventory snapshot pipeline.
- `artifacts/holiday-golf-carts/src/pages/Inventory.tsx` — SRP-equivalent live inventory template.
- `artifacts/holiday-golf-carts/src/pages/Vehicle.tsx` — VDP-equivalent dynamic vehicle template.
- `artifacts/holiday-golf-carts/src/pages/Home.tsx` — contains featured inventory bindings.
- `artifacts/holiday-golf-carts/src/pages/Brands.tsx` — contains inventory-facet bindings.
- `artifacts/holiday-golf-carts/src/pages/Locations.tsx` — contains inventory-derived locations and counts.
- `artifacts/holiday-golf-carts/src/components/CartGrid.tsx` and `CartCard.tsx` — live inventory rendering.
- `artifacts/holiday-golf-carts/src/lib/pricing.ts` and `location-links.ts` — inventory-derived display helpers.
- `lib/api-spec/openapi.yaml`, `lib/api-client-react/src/generated/`, and `lib/api-zod/src/generated/` — inventory contracts and generated clients.
- `artifacts/holiday-golf-carts/public/data/` — generated DMS inventory, featured, and location snapshots.

The mixed inventory-aware files changed were `SeoManager.tsx`, where changes were limited to hard-coded static metadata strings, and `routes/index.ts`, where one independent read-only route was registered. No inventory hooks, handlers, bindings, canonical logic, inventory routes, data, pricing, photos, VINs, stock numbers, or feed fields were modified.