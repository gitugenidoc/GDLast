// backend/src/controllers/billing.controller.js

import { BillingService } from "../services/billing.service.js";

export const createInvoice = async (req, res, next) => {
  try {
    const result = await BillingService.createInvoice(
      req.body,
      req.user.userId,
    );
    res.status(201).json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const recordPayment = async (req, res, next) => {
  try {
    const { invoiceId, amount, method } = req.body;
    const result = await BillingService.recordPayment(
      invoiceId,
      amount,
      method,
      req.user.userId,
    );
    res.status(201).json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const listInvoices = async (req, res, next) => {
  try {
    const invoices = await BillingService.listInvoices(req.params.facilityId);
    res.json({ status: "success", data: invoices });
  } catch (error) {
    next(error);
  }
};
