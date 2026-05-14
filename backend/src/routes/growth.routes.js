// backend/src/routes/growth.routes.js

import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import * as growthController from "../controllers/growth.controller.js";

const router = Router();
router.use(authenticate);

router.post("/", growthController.createGrowth);
router.get("/newborn/:newbornId", growthController.getGrowthByNewborn);
router.put("/:id", growthController.updateGrowth);
router.delete("/:id", growthController.deleteGrowth);

export default router;
