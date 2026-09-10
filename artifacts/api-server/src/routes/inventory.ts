import { Router, type IRouter } from "express";
import { GetFeaturedInventoryResponse, GetInventoryQueryParams, GetInventoryResponse } from "@workspace/api-zod";
import { inventorySnapshot } from "../lib/inventory";

const router: IRouter = Router();

router.get("/inventory", async (req, res): Promise<void> => {
  const parsed = GetInventoryQueryParams.safeParse(req.query);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  try {
    const snapshot = await inventorySnapshot();
    const { q, make, model, power, condition, seats, sort = "featured" } = parsed.data;
    let carts = snapshot.carts.filter((cart) =>
      (!q || `${cart.title} ${cart.color} ${cart.location}`.toLowerCase().includes(q.toLowerCase())) &&
      (!make || cart.make.toLowerCase() === make.toLowerCase() || cart.make.toLowerCase().replace(/[^a-z0-9]+/g, "-") === make) &&
      (!model || cart.model.toLowerCase() === model.toLowerCase() || cart.model.toLowerCase().replace(/[^a-z0-9]+/g, "-") === model) &&
      (!power || cart.fuel.toLowerCase() === power) && (!condition || cart.condition.toLowerCase() === condition) &&
      (!seats || cart.passengers.toLowerCase().includes(seats.toLowerCase()))
    );
    carts = [...carts].sort((a, b) => sort === "price-asc" ? (a.price ?? Infinity) - (b.price ?? Infinity) :
      sort === "price-desc" ? (b.price ?? 0) - (a.price ?? 0) : sort === "year-desc" ? b.year.localeCompare(a.year) : Number(b.isStreetLegal) - Number(a.isStreetLegal));
    res.json(GetInventoryResponse.parse({ ...snapshot, carts }));
  } catch (error) {
    req.log.error({ err: error }, "Live inventory fetch failed");
    res.status(502).json({ error: "Live inventory is temporarily unavailable" });
  }
});

router.get("/inventory/featured", async (req, res): Promise<void> => {
  try {
    const snapshot = await inventorySnapshot();
    res.json(GetFeaturedInventoryResponse.parse({ ...snapshot, carts: snapshot.carts.filter(c => c.isStreetLegal || c.isLifted).slice(0, 8) }));
  } catch (error) {
    req.log.error({ err: error }, "Featured inventory fetch failed");
    res.status(502).json({ error: "Featured inventory is temporarily unavailable" });
  }
});

export default router;
