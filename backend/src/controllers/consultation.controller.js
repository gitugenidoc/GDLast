// backend/src/controllers/consultation.controller.js

import { ConsultationService } from "../services/consultation.service.js";
import { z } from "zod";

const consultationSchema = z.object({
  newbornId: z.string(),
  pediatricianId: z.string(),
  reason: z.string(),
  symptoms: z.string().optional(),
  diagnosis: z.string().optional(),
  diagnosisCodes: z.array(z.string()).optional(),
  notes: z.string().optional(),
  recommendations: z.string().optional(),
  consultedAt: z.string().datetime().optional(),
});

export const createConsultation = async (req, res, next) => {
  try {
    const validated = consultationSchema.parse(req.body);
    const result = await ConsultationService.create(validated, req.user.userId);
    res.status(201).json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const getConsultation = async (req, res, next) => {
  try {
    const consultation = await ConsultationService.getById(req.params.id);
    res.json({ status: "success", data: consultation });
  } catch (error) {
    next(error);
  }
};

export const getConsultationsByNewborn = async (req, res, next) => {
  try {
    const consultations = await ConsultationService.listByNewborn(
      req.params.newbornId,
    );
    res.json({ status: "success", data: consultations });
  } catch (error) {
    next(error);
  }
};

export const updateConsultation = async (req, res, next) => {
  try {
    const validated = consultationSchema.partial().parse(req.body);
    const result = await ConsultationService.update(
      req.params.id,
      validated,
      req.user.userId,
    );
    res.json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const deleteConsultation = async (req, res, next) => {
  try {
    await ConsultationService.delete(req.params.id, req.user.userId);
    res.json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
