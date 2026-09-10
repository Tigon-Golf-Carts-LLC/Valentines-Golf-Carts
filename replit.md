# Valentines Golf Carts

One-day Valentine's Day Golf Cart Sales Event website with live nationwide dealership inventory from Tigon DMS.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `node scripts/src/sync-valentines-inventory.mjs` — refresh the static GitHub Pages inventory snapshot

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/holiday-golf-carts` — public Valentines sales website
- `artifacts/api-server` — live inventory API backed by Tigon DMS
- `scripts/src/sync-valentines-inventory.mjs` — static inventory snapshot generator
- `.github/workflows/deploy-valentines-golf-carts.yml` — scheduled GitHub Pages deployment
- `lib/api-spec/openapi.yaml` — API contract

## Architecture decisions

- The Replit-hosted site reads live API data; GitHub Pages reads generated static JSON snapshots.
- Only in-stock DMS carts are published.
- GitHub Actions refreshes inventory daily at 1:00 AM EST before rebuilding the site.

## Product

- Valentines-only promotional landing experience
- Searchable and filterable new and pre-owned inventory
- Vehicle details, financing information, participating locations, brands, and contact paths

## User preferences

- Brand: Valentines Golf Carts
- Domain: `valentinesgolfcarts.com`
- Palette: crisp white surfaces, deep readable text, strong red actions, and restrained pink accents
- Visual direction: clean and high-contrast; avoid foggy overlays, hazy gradients, glow effects, and low-opacity body text
- Event: One-day Valentine's Day Golf Cart Sales Event only

## Gotchas

- After OpenAPI changes, run codegen before typechecking.
- Static hosting requires the DMS snapshot script before the frontend build.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
