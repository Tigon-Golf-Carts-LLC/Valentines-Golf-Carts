---
name: Static inventory URLs
description: Production routing constraint for inventory snapshot fallbacks on nested SPA routes.
---

On the custom domain, resolve static inventory snapshot URLs from the site root. Do not resolve them relative to `document.baseURI` on nested routes.

**Why:** Relative snapshot paths on a vehicle-detail route are interpreted beneath `/inventory/`; the SPA rewrite then returns HTML instead of JSON, causing a production-only detail-page crash.

**How to apply:** When changing static-host fallbacks, test at least one nested inventory URL and confirm the network request targets `/data/...`. Preserve base-relative behavior only for hosts that intentionally publish beneath a path prefix, such as GitHub Pages.