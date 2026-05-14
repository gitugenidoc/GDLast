// backend/src/controllers/newborn.controller.js - Newborn API endpoints

import { NewbornService } from "../services/newborn.service.js";
import { z } from "zod";

const createNewbornSchema = z.object({
  genidocId: z.string().optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dateOfBirth: z.string().datetime().or(z.date()),
  gender: z.enum(["M", "F"]),
  bloodType: z.string().optional(),
  city: z.string().optional(),
  facilityId: z.string().optional(),
});

export const createNewborn = async (req, res, next) => {
  try {
    const validated = createNewbornSchema.parse(req.body);
    const result = await NewbornService.create(validated, req.user.userId);

    res.status(201).json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const getNewborn = async (req, res, next) => {
  try {
    const newborn = await NewbornService.getById(
      req.params.id,
      req.user.userId,
    );
    res.json({ status: "success", data: newborn });
  } catch (error) {
    next(error);
  }
};

export const listNewborns = async (req, res, next) => {
  try {
    const newborns = await NewbornService.listByParent(req.user.userId);
    res.json({ status: "success", data: newborns });
  } catch (error) {
    next(error);
  }
};

export const updateNewborn = async (req, res, next) => {
  try {
    const validated = createNewbornSchema.partial().parse(req.body);
    const result = await NewbornService.update(
      req.params.id,
      validated,
      req.user.userId,
    );
    res.json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const deleteNewborn = async (req, res, next) => {
  try {
    await NewbornService.delete(req.params.id, req.user.userId);
    res.json({ status: "success", message: "Newborn deleted" });
  } catch (error) {
    next(error);
  }
};
