// backend/src/controllers/vaccination.controller.js

import { VaccinationService } from "../services/vaccination.service.js";
import { z } from "zod";

const vaccineSchema = z.object({
  newbornId: z.string(),
  vaccineName: z.string(),
  vaccineCode: z.string(),
  status: z.enum(["scheduled", "administered", "pending", "delayed"]),
  administeredDate: z.string().datetime().optional(),
  nextDueDate: z.string().datetime().optional(),
  batchNumber: z.string().optional(),
  notes: z.string().optional(),
});

export const createVaccination = async (req, res, next) => {
  try {
    const validated = vaccineSchema.parse(req.body);
    const result = await VaccinationService.create(validated, req.user.userId);
    res.status(201).json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const getVaccinationsByNewborn = async (req, res, next) => {
  try {
    const vaccs = await VaccinationService.listByNewborn(req.params.newbornId);
    res.json({ status: "success", data: vaccs });
  } catch (error) {
    next(error);
  }
};

export const updateVaccination = async (req, res, next) => {
  try {
    const validated = vaccineSchema.partial().parse(req.body);
    const result = await VaccinationService.update(
      req.params.id,
      validated,
      req.user.userId,
    );
    res.json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const deleteVaccination = async (req, res, next) => {
  try {
    await VaccinationService.delete(req.params.id, req.user.userId);
    res.json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
