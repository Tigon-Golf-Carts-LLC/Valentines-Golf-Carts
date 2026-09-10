---
name: DMS inventory pagination
description: Non-obvious upstream paging behavior that affects complete live and static inventory.
---

Treat the DMS cart response as paginated and fetch every page indicated by its reported total. Do not assume that requesting a very large page size returns the full dataset.

**Why:** The upstream service began enforcing a 100-record response limit despite accepting a much larger requested page size, which made an apparently successful request contain only a small fraction of sellable inventory.

**How to apply:** Any inventory reader or export must paginate, deduplicate carts by their stable ID, and reject materially incomplete multi-page responses before replacing a known-good snapshot.