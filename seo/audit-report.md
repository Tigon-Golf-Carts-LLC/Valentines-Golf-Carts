# SEO Audit Report

Audit date: 2026-09-10

## Scope notes

This is a nationwide campaign. No city, ZIP, street address, latitude/longitude, local landmark, rating, review, or social-profile URL was fabricated. Inventory-bound templates were audited but not structurally modified.

| Page | Title | Meta description | H1 | Primary focus | Schema |
|---|---|---|---|---|---|
| `/` | Valentines Golf Carts \| Nationwide Sale Event | Shop Valentines golf carts at the nationwide Valentine's Day Golf Cart Sales Event on February 14, 2027. | Valentines Golf Carts | Valentines golf carts | Organization, WebSite, Event |
| `/inventory` | Valentines Golf Cart Deals \| Nationwide Inventory | Browse current new and pre-owned Valentines golf cart listings from participating dealers nationwide. | Live Valentines Inventory | Valentines golf cart deals | Inventory system schema remains authoritative |
| `/brands` | Valentines Golf Cart Brands \| Nationwide Event Sale | Compare golf cart brands represented in the nationwide Valentine's Day Golf Cart Sales Event. | Shop by Brand | Valentines golf cart brands | No page-specific static schema |
| `/locations` | Valentines Golf Cart Dealers \| Nationwide Locations | Find participating dealer locations represented in the nationwide Valentine's Day Golf Cart Sales Event. | Participating Locations | participating golf cart dealers | No page-specific static schema |
| `/financing` | Valentines Golf Cart Financing \| Apply Online Today | Review financing resources for Valentines golf carts and use each lender's application process. | Golf Cart Financing & Loans | Valentines golf cart financing | No page-specific static schema |
| `/contact` | Contact Valentines Golf Carts | Contact the Valentines Golf Carts sales team about nationwide inventory, participating dealers, or financing. | Contact Valentines Golf Carts | Valentines Golf Carts contact | No page-specific static schema |

## Technical assets

- Canonical URLs are updated client-side per route and default to the official domain in the static shell.
- Open Graph and Twitter metadata are present in the static shell and updated per route where applicable.
- `robots.txt`, the sitemap index, page and image sitemaps, `llms.txt`, `llms-full.txt`, and `api/site-info.json` are present.
- Supporting factual discovery files include `ai.txt`, `seo.txt`, `nlp.txt`, `bots.txt`, `crawlers.txt`, `geo.txt`, `humans.txt`, `accessibility.txt`, and `images.txt`.
- A basic web manifest and browser tile configuration are present; offline caching and push notifications are not claimed.
- No Product, Vehicle, Car, Offer, AggregateRating, Review, or FAQ schema was added.
- Social handles were supplied without verified profile URLs, so `sameAs` remains omitted and `socialProfiles` is empty.

## Deliberately omitted requested files

- Product, Google Shopping, local inventory, API inventory, and data feeds: prohibited because they would duplicate or transform the protected DMS inventory.
- Vehicle model and dynamic inventory sitemaps: omitted rather than generating URLs from protected inventory data.
- Location GeoJSON, KML, and per-location schema: no verified city, address, coordinate, or 15-store source list was provided.
- Blog, news, post, author, tag, category, event, podcast, RSS, and Atom feeds: the site has no corresponding published content.
- Video and mobile sitemaps: the site has no indexable video pages or separate mobile URLs.
- `gpt.txt`, `claude.txt`, and `training.txt`: nonstandard files that would purport to grant broad intellectual-property or training rights.
- `security.txt`: no designated security contact or disclosure policy was provided.
- OpenSearch: no compatible free-text site-search endpoint exists.

## Protected files and skipped inventory work

The following DMS- or inventory-bound files were deliberately not modified:

- `artifacts/holiday-golf-carts/public/data/*.json` (generated inventory and location snapshots)
- `artifacts/holiday-golf-carts/public/sitemap-pages.xml` and `artifacts/holiday-golf-carts/public/sitemap-images.xml` (generated sitemap data)
- `scripts/src/sync-valentines-inventory.mjs` (inventory synchronization)
- `artifacts/holiday-golf-carts/src/pages/Inventory.tsx` and `src/pages/Vehicle.tsx` (live inventory templates)
- `artifacts/holiday-golf-carts/src/components/CartCard.tsx` and `CartGrid.tsx` (inventory rendering)
- All inventory hooks, mappers, API behavior, and related generated inventory contracts

No product feeds, shopping feeds, local-inventory feeds, duplicate inventory snapshots, or dynamic inventory URLs were created.

## Nonstandard files deliberately omitted

No `ai-plugin.json` was created because there is no plugin API. No broad AI-training authorization files, security policy, advertising seller file, or synthetic feed were added where verified rights, contacts, seller IDs, or source data were unavailable.