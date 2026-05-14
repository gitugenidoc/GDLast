// backend/src/prisma/seed.js - Database seeding (schema-only, no demo data)

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Initializing database schema...");

  try {
    // Verify connection
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Database connected successfully");

    // Optional: Clear all data if needed (comment out for production)
    // This can be useful for development resets
    const clearDatabase = process.env.CLEAR_DATABASE === "true";

    if (clearDatabase) {
      console.log("🧹 Clearing database...");

      // Delete in reverse dependency order
      await prisma.auditLog.deleteMany();
      await prisma.notification.deleteMany();
      await prisma.accessPermission.deleteMany();
      await prisma.appointment.deleteMany();
      await prisma.prescription.deleteMany();
      await prisma.medicalDocument.deleteMany();
      await prisma.growthRecord.deleteMany();
      await prisma.vaccination.deleteMany();
      await prisma.consultation.deleteMany();
      await prisma.smartCard.deleteMany();
      await prisma.newborn.deleteMany();
      await prisma.subscription.deleteMany();
      await prisma.pricingPlan.deleteMany();
      await prisma.integrationConfig.deleteMany();
      await prisma.facility.deleteMany();
      await prisma.pediatricianProfile.deleteMany();
      await prisma.parentProfile.deleteMany();
      await prisma.user.deleteMany();

      console.log("✅ Database cleared");
    }

    console.log("✅ Database schema ready");
  } catch (error) {
    console.error("❌ Seed error:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
