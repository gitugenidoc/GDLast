// backend/src/routes/smartcard.routes.js

import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import * as smartcardController from "../controllers/smartcard.controller.js";

const router = Router();

router.post("/", authenticate, smartcardController.generateCard);
router.get("/qr/:qrCode", smartcardController.getCardByQR);
router.get("/nfc/:nfcCode", smartcardController.getCardByNFC);
router.put("/:id/deactivate", authenticate, smartcardController.deactivateCard);

export default router;
