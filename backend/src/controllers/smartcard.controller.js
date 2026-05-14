// backend/src/controllers/smartcard.controller.js

import { SmartCardService } from "../services/smartcard.service.js";

export const generateCard = async (req, res, next) => {
  try {
    const { newbornId, facilityId } = req.body;
    const result = await SmartCardService.generateCard(
      newbornId,
      facilityId,
      req.user.userId,
    );
    res.status(201).json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const getCardByQR = async (req, res, next) => {
  try {
    const card = await SmartCardService.getCardByQR(req.params.qrCode);
    if (!card)
      return res
        .status(404)
        .json({ status: "error", message: "Card not found" });
    res.json({ status: "success", data: card });
  } catch (error) {
    next(error);
  }
};

export const getCardByNFC = async (req, res, next) => {
  try {
    const card = await SmartCardService.getCardByNFC(req.params.nfcCode);
    if (!card)
      return res
        .status(404)
        .json({ status: "error", message: "Card not found" });
    res.json({ status: "success", data: card });
  } catch (error) {
    next(error);
  }
};

export const deactivateCard = async (req, res, next) => {
  try {
    const result = await SmartCardService.deactivateCard(
      req.params.id,
      req.user.userId,
    );
    res.json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};
