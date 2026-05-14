// backend/src/routes/consultation.routes.js

import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import * as consultController from "../controllers/consultation.controller.js";

const router = Router();
router.use(authenticate);

router.post("/", consultController.createConsultation);
router.get("/:id", consultController.getConsultation);
router.get("/newborn/:newbornId", consultController.getConsultationsByNewborn);
router.put("/:id", consultController.updateConsultation);
router.delete("/:id", consultController.deleteConsultation);

export default router;
