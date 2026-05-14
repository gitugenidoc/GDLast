// backend/src/controllers/growth.controller.js

import { GrowthService } from "../services/growth.service.js";
import { z } from "zod";

const growthSchema = z.object({
  newbornId: z.string(),
  weight: z.number().positive(),
  height: z.number().positive(),
  headCircumference: z.number().positive().optional(),
  measuredAt: z.string().datetime().optional(),
  notes: z.string().optional(),
});

export const createGrowth = async (req, res, next) => {
  try {
    const validated = growthSchema.parse(req.body);
    const result = await GrowthService.create(validated, req.user.userId);
    res.status(201).json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const getGrowthByNewborn = async (req, res, next) => {
  try {
    const records = await GrowthService.listByNewborn(req.params.newbornId);
    res.json({ status: "success", data: records });
  } catch (error) {
    next(error);
  }
};

export const updateGrowth = async (req, res, next) => {
  try {
    const validated = growthSchema.partial().parse(req.body);
    const result = await GrowthService.update(
      req.params.id,
      validated,
      req.user.userId,
    );
    res.json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const deleteGrowth = async (req, res, next) => {
  try {
    await GrowthService.delete(req.params.id, req.user.userId);
    res.json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
