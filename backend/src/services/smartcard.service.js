// backend/src/services/smartcard.service.js

import { prisma } from "../prisma/client.js";

export class SmartCardService {
  static async generateCard(newbornId, facilityId, userId) {
    const qrCode = `HDY-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const cardNumber = `CARD-${Date.now()}`;
    const nfcCode = `NFC-${cardNumber}`;

    const card = await prisma.smartCard.create({
      data: {
        cardNumber,
        qrCode,
        nfcCode,
        newbornId,
        facilityId,
        status: "ACTIVE",
        issuedAt: new Date(),
        activatedAt: new Date(),
      },
      include: { newborn: true },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "SMARTCARD_GENERATED",
        resource: "SMARTCARD",
        resourceId: card.id,
        status: "SUCCESS",
      },
    });

    return card;
  }

  static async getCardByQR(qrCode) {
    return await prisma.smartCard.findUnique({
      where: { qrCode },
      include: {
        newborn: {
          include: {
            parent: { include: { user: true } },
            consultations: true,
            vaccinations: true,
          },
        },
      },
    });
  }

  static async getCardByNFC(nfcCode) {
    return await prisma.smartCard.findUnique({
      where: { nfcCode },
      include: {
        newborn: {
          include: {
            parent: { include: { user: true } },
            consultations: true,
            vaccinations: true,
          },
        },
      },
    });
  }

  static async deactivateCard(cardId, userId) {
    const card = await prisma.smartCard.update({
      where: { id: cardId },
      data: { status: "INACTIVE" },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "SMARTCARD_DEACTIVATED",
        resource: "SMARTCARD",
        resourceId: cardId,
        status: "SUCCESS",
      },
    });

    return card;
  }
}
