// backend/src/routes/newborn.routes.js

import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import * as newbornController from "../controllers/newborn.controller.js";

const router = Router();

router.use(authenticate);

router.post("/", newbornController.createNewborn);
router.get("/", newbornController.listNewborns);
router.get("/:id", newbornController.getNewborn);
router.put("/:id", newbornController.updateNewborn);
router.delete("/:id", newbornController.deleteNewborn);

export default router;
