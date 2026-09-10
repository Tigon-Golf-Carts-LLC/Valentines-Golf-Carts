import { Router, type IRouter } from "express";
import healthRouter from "./health";
import inventoryRouter from "./inventory";
import locationsRouter from "./locations";
import siteInfoRouter from "./site-info";

const router: IRouter = Router();

router.use(healthRouter);
router.use(siteInfoRouter);
router.use(inventoryRouter);
router.use(locationsRouter);

export default router;
