// backend/src/routes/vaccination.routes.js

import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import * as vaccController from "../controllers/vaccination.controller.js";

const router = Router();
router.use(authenticate);

router.post("/", vaccController.createVaccination);
router.get("/newborn/:newbornId", vaccController.getVaccinationsByNewborn);
router.put("/:id", vaccController.updateVaccination);
router.delete("/:id", vaccController.deleteVaccination);

export default router;
