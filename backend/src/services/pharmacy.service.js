// backend/src/services/pharmacy.service.js

import { prisma } from "../prisma/client.js";

export class PharmacyService {
  static async dispensePrescription(prescriptionId, pharmacyData, userId) {
    const prescription = await prisma.prescription.findUnique({
      where: { id: prescriptionId },
    });

    if (!prescription) throw new Error("Prescription not found");

    const dispensed = await prisma.prescription.update({
      where: { id: prescriptionId },
      data: {
        status: "dispensed",
        dispensedDate: new Date(),
        dispensedQuantity: pharmacyData.quantity,
        dispensedBatchNumber: pharmacyData.batchNumber,
        notes: `Dispensed at ${new Date().toISOString()}`,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "PRESCRIPTION_DISPENSED",
        resource: "PRESCRIPTION",
        resourceId: prescriptionId,
        status: "SUCCESS",
      },
    });

    return dispensed;
  }

  static async checkDrugInteractions(drugIds) {
    const interactions = [];
    for (let i = 0; i < drugIds.length; i++) {
      for (let j = i + 1; j < drugIds.length; j++) {
        const hasInteraction = await this._checkInteraction(
          drugIds[i],
          drugIds[j],
        );
        if (hasInteraction) {
          interactions.push({
            drug1: drugIds[i],
            drug2: drugIds[j],
            severity: "medium",
          });
        }
      }
    }
    return interactions;
  }

  static async _checkInteraction(drug1, drug2) {
    // Simple check - would connect to drug database in production
    const commonInteractions = [
      ["aspirin", "ibuprofen"],
      ["metformin", "contrast-dye"],
    ];
    return commonInteractions.some(
      (pair) =>
        (pair[0] === drug1 && pair[1] === drug2) ||
        (pair[0] === drug2 && pair[1] === drug1),
    );
  }

  static async refillPrescription(prescriptionId, userId) {
    const prescription = await prisma.prescription.findUnique({
      where: { id: prescriptionId },
    });

    if (!prescription) throw new Error("Prescription not found");

    const refill = await prisma.prescription.create({
      data: {
        newbornId: prescription.newbornId,
        consultationId: prescription.consultationId,
        medicationName: prescription.medicationName,
        dosage: prescription.dosage,
        frequency: prescription.frequency,
        duration: prescription.duration,
        quantity: prescription.quantity,
        instructions: `Refill of original prescription ${prescriptionId}`,
        status: "active",
        prescribedDate: new Date(),
      },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "PRESCRIPTION_REFILLED",
        resource: "PRESCRIPTION",
        resourceId: refill.id,
        status: "SUCCESS",
      },
    });

    return refill;
  }
}
