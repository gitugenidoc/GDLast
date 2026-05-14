// backend/src/services/billing.service.js

import { prisma } from "../prisma/client.js";

export class BillingService {
  static async createInvoice(data, userId) {
    const subscription = await prisma.subscription.findFirst({
      where: { facilityId: data.facilityId, status: "active" },
    });

    if (!subscription) throw new Error("No active subscription");

    const invoice = await prisma.paymentRecord.create({
      data: {
        invoiceNumber: `INV-${Date.now()}`,
        facilityId: data.facilityId,
        amount: data.amount,
        currency: data.currency || "MAD",
        type: "invoice",
        status: "pending",
        description: data.description,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "INVOICE_CREATED",
        resource: "PAYMENT",
        resourceId: invoice.id,
        status: "SUCCESS",
      },
    });

    return invoice;
  }

  static async recordPayment(invoiceId, amount, method, userId) {
    const payment = await prisma.paymentRecord.create({
      data: {
        invoiceNumber: `PAY-${Date.now()}`,
        amount,
        currency: "MAD",
        type: "payment",
        status: "completed",
        description: `Payment for invoice ${invoiceId} via ${method}`,
        metadata: { originalInvoiceId: invoiceId, method },
      },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "PAYMENT_RECORDED",
        resource: "PAYMENT",
        resourceId: payment.id,
        status: "SUCCESS",
      },
    });

    return payment;
  }

  static async listInvoices(facilityId) {
    return await prisma.paymentRecord.findMany({
      where: { facilityId, type: "invoice" },
      orderBy: { createdAt: "desc" },
    });
  }

  static async calculateSubscriptionCost(planId, months) {
    const plan = await prisma.pricingPlan.findUnique({ where: { id: planId } });
    if (!plan) throw new Error("Plan not found");
    return plan.price * months;
  }
}
