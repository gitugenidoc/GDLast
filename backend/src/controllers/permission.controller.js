// backend/src/controllers/permission.controller.js

import { PermissionService } from "../services/permission.service.js";

export const requestAccess = async (req, res, next) => {
  try {
    const { newbornId, parentId, pediatricianId } = req.body;
    const result = await PermissionService.requestAccess(
      newbornId,
      parentId,
      pediatricianId,
      req.user.userId,
    );
    res.status(201).json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const approveAccess = async (req, res, next) => {
  try {
    const result = await PermissionService.approveAccess(
      req.params.id,
      req.user.userId,
      req.body.expiryDays || 365,
    );
    res.json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const denyAccess = async (req, res, next) => {
  try {
    const result = await PermissionService.denyAccess(
      req.params.id,
      req.user.userId,
    );
    res.json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const checkAccess = async (req, res, next) => {
  try {
    const hasAccess = await PermissionService.checkAccess(
      req.params.newbornId,
      req.params.pediatricianId,
    );
    res.json({ status: "success", data: { hasAccess } });
  } catch (error) {
    next(error);
  }
};
