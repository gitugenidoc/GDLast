// backend/src/controllers/analytics.controller.js

import { AnalyticsService } from "../services/analytics.service.js";

export const getFacilityDashboard = async (req, res, next) => {
  try {
    const result = await AnalyticsService.getFacilityDashboard(
      req.params.facilityId,
    );
    res.json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const getNewbornMetrics = async (req, res, next) => {
  try {
    const result = await AnalyticsService.getNewbornMetrics(
      req.params.newbornId,
    );
    res.json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const getPediatricianStats = async (req, res, next) => {
  try {
    const result = await AnalyticsService.getPediatricianStats(
      req.params.pediatricianId,
    );
    res.json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const getVaccinationCoverage = async (req, res, next) => {
  try {
    const result = await AnalyticsService.getVaccinationCoverage(
      req.params.facilityId,
    );
    res.json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};
