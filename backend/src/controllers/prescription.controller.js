// backend/src/controllers/prescription.controller.js

import { PrescriptionService } from "../services/prescription.service.js";
import { PharmacyService } from "../services/pharmacy.service.js";
import { z } from "zod";

const prescriptionSchema = z.object({
  newbornId: z.string(),
  consultationId: z.string().optional(),
  medicationName: z.string(),
  dosage: z.string(),
  frequency: z.string(),
  duration: z.string(),
  quantity: z.number().positive(),
  instructions: z.string().optional(),
});

export const createPrescription = async (req, res, next) => {
  try {
    const validated = prescriptionSchema.parse(req.body);
    const result = await PrescriptionService.create(validated, req.user.userId);
    res.status(201).json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const getPrescriptionsByNewborn = async (req, res, next) => {
  try {
    const prescriptions = await PrescriptionService.listByNewborn(
      req.params.newbornId,
    );
    res.json({ status: "success", data: prescriptions });
  } catch (error) {
    next(error);
  }
};

export const dispensePrescription = async (req, res, next) => {
  try {
    const result = await PharmacyService.dispensePrescription(
      req.params.id,
      req.body,
      req.user.userId,
    );
    res.json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const checkDrugInteractions = async (req, res, next) => {
  try {
    const interactions = await PharmacyService.checkDrugInteractions(
      req.body.drugIds,
    );
    res.json({ status: "success", data: interactions });
  } catch (error) {
    next(error);
  }
};
