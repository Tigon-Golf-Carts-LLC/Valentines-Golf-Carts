import { Router, type IRouter } from "express";
import { GetLocationsResponse } from "@workspace/api-zod";
import { inventorySnapshot } from "../lib/inventory";

const router: IRouter = Router();
router.get("/locations", async (req, res): Promise<void> => {
  try { res.json(GetLocationsResponse.parse((await inventorySnapshot()).locations)); }
  catch (error) { req.log.error({ err: error }, "Locations fetch failed"); res.status(502).json({ error: "Locations are temporarily unavailable" }); }
});
export default router;
