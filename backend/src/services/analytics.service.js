// backend/src/services/analytics.service.js

import { prisma } from "../prisma/client.js";

export class AnalyticsService {
  static async getFacilityDashboard(facilityId) {
    const [totalNewborns, totalConsultations, totalVaccinations, revenue] =
      await Promise.all([
        prisma.newborn.count({ where: { facilityId } }),
        prisma.consultation.count({
          where: { newborn: { facilityId } },
        }),
        prisma.vaccination.count({
          where: { newborn: { facilityId } },
        }),
        prisma.paymentRecord.aggregate({
          where: { facilityId, type: "payment" },
          _sum: { amount: true },
        }),
      ]);

    return {
      totalNewborns,
      totalConsultations,
      totalVaccinations,
      revenue: revenue._sum.amount || 0,
      timestamp: new Date(),
    };
  }

  static async getNewbornMetrics(newbornId) {
    const [consultations, vaccinations, growthRecords] = await Promise.all([
      prisma.consultation.count({ where: { newbornId } }),
      prisma.vaccination.count({ where: { newbornId } }),
      prisma.growthRecord.count({ where: { newbornId } }),
    ]);

    const lastGrowth = await prisma.growthRecord.findFirst({
      where: { newbornId },
      orderBy: { measuredAt: "desc" },
    });

    return {
      consultations,
      vaccinations,
      growthRecords,
      lastMeasurement: lastGrowth,
    };
  }

  static async getPediatricianStats(pediatricianId) {
    const [totalConsultations, totalPatients] = await Promise.all([
      prisma.consultation.count({ where: { pediatricianId } }),
      prisma.consultation.findMany({
        where: { pediatricianId },
        distinct: ["newbornId"],
        select: { newbornId: true },
      }),
    ]);

    return {
      totalConsultations,
      totalPatients: totalPatients.length,
      timestamp: new Date(),
    };
  }

  static async getVaccinationCoverage(facilityId) {
    const allNewborns = await prisma.newborn.count({ where: { facilityId } });
    const vaccinatedNewborns = await prisma.newborn.findMany({
      where: {
        facilityId,
        vaccinations: { some: { status: "administered" } },
      },
      distinct: ["id"],
    });

    return {
      total: allNewborns,
      vaccinated: vaccinatedNewborns.length,
      coverage:
        allNewborns > 0 ? (vaccinatedNewborns.length / allNewborns) * 100 : 0,
    };
  }
}
