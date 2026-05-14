// backend/src/services/patient-service.ts
// Production-grade Patient Service with caching, validation, and error handling

import { Database } from "@cloudflare/d1";
import { Cache } from "./cache-service";
import { AuditService } from "./audit-service";
import { NotificationService } from "./notification-service";

interface Patient {
  id: string;
  parent_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender?: string;
  blood_type?: string;
  allergies?: string[];
  medical_conditions?: string[];
  dpi_number?: string;
  smart_card_id?: string;
  created_at: string;
  updated_at: string;
}

export class PatientService {
  private db: Database;
  private cache: Cache;
  private auditService: AuditService;
  private notificationService: NotificationService;

  constructor(
    db: Database,
    cache: Cache,
    auditService: AuditService,
    notificationService: NotificationService,
  ) {
    this.db = db;
    this.cache = cache;
    this.auditService = auditService;
    this.notificationService = notificationService;
  }

  async createPatient(
    data: Omit<Patient, "id" | "created_at" | "updated_at">,
    userId: string,
  ): Promise<Patient> {
    try {
      const patientId = this.generateId("PAT");
      const now = new Date().toISOString();

      const patient: Patient = {
        id: patientId,
        ...data,
        created_at: now,
        updated_at: now,
      };

      await this.db
        .prepare(
          "INSERT INTO patients (id, parent_id, first_name, last_name, date_of_birth, gender, blood_type, allergies, medical_conditions, dpi_number, smart_card_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(
          patient.id,
          patient.parent_id,
          patient.first_name,
          patient.last_name,
          patient.date_of_birth,
          patient.gender,
          patient.blood_type,
          JSON.stringify(patient.allergies || []),
          JSON.stringify(patient.medical_conditions || []),
          patient.dpi_number,
          patient.smart_card_id,
        )
        .run();

      // Audit log
      await this.auditService.log({
        userId,
        action: "CREATE_PATIENT",
        resourceType: "Patient",
        resourceId: patientId,
        newValue: patient,
      });

      // Send notification
      await this.notificationService.send(data.parent_id, {
        title: "Patient créé",
        message: `Le patient ${patient.first_name} ${patient.last_name} a été créé avec succès.`,
        type: "SUCCESS",
      });

      // Invalidate cache
      this.cache.invalidate(`patients:${data.parent_id}`);

      return patient;
    } catch (error) {
      throw new Error(`Failed to create patient: ${error.message}`);
    }
  }

  async getPatient(id: string, userId: string): Promise<Patient | null> {
    try {
      // Check cache first
      const cached = await this.cache.get(`patient:${id}`);
      if (cached) return JSON.parse(cached);

      const result = await this.db
        .prepare("SELECT * FROM patients WHERE id = ?")
        .bind(id)
        .first<Patient>();

      if (result) {
        await this.cache.set(`patient:${id}`, JSON.stringify(result), 3600); // 1 hour
      }

      return result || null;
    } catch (error) {
      throw new Error(`Failed to get patient: ${error.message}`);
    }
  }

  async listPatients(parentId: string): Promise<Patient[]> {
    try {
      const cached = await this.cache.get(`patients:${parentId}`);
      if (cached) return JSON.parse(cached);

      const results = await this.db
        .prepare(
          "SELECT * FROM patients WHERE parent_id = ? ORDER BY created_at DESC",
        )
        .bind(parentId)
        .all<Patient>();

      if (results.results) {
        await this.cache.set(
          `patients:${parentId}`,
          JSON.stringify(results.results),
          3600,
        );
      }

      return results.results || [];
    } catch (error) {
      throw new Error(`Failed to list patients: ${error.message}`);
    }
  }

  async updatePatient(
    id: string,
    data: Partial<Patient>,
    userId: string,
  ): Promise<Patient> {
    try {
      const existing = await this.getPatient(id, userId);
      if (!existing) throw new Error("Patient not found");

      const updated: Patient = {
        ...existing,
        ...data,
        id: existing.id,
        parent_id: existing.parent_id,
        created_at: existing.created_at,
        updated_at: new Date().toISOString(),
      };

      await this.db
        .prepare(
          "UPDATE patients SET first_name = ?, last_name = ?, gender = ?, blood_type = ?, allergies = ?, medical_conditions = ?, updated_at = ? WHERE id = ?",
        )
        .bind(
          updated.first_name,
          updated.last_name,
          updated.gender,
          updated.blood_type,
          JSON.stringify(updated.allergies || []),
          JSON.stringify(updated.medical_conditions || []),
          updated.updated_at,
          id,
        )
        .run();

      // Audit log
      await this.auditService.log({
        userId,
        action: "UPDATE_PATIENT",
        resourceType: "Patient",
        resourceId: id,
        oldValue: existing,
        newValue: updated,
      });

      // Clear caches
      this.cache.invalidate(`patient:${id}`);
      this.cache.invalidate(`patients:${existing.parent_id}`);

      return updated;
    } catch (error) {
      throw new Error(`Failed to update patient: ${error.message}`);
    }
  }

  async deletePatient(id: string, userId: string): Promise<void> {
    try {
      const patient = await this.getPatient(id, userId);
      if (!patient) throw new Error("Patient not found");

      await this.db
        .prepare("UPDATE patients SET is_active = 0 WHERE id = ?")
        .bind(id)
        .run();

      // Audit log
      await this.auditService.log({
        userId,
        action: "DELETE_PATIENT",
        resourceType: "Patient",
        resourceId: id,
        oldValue: patient,
      });

      // Clear caches
      this.cache.invalidate(`patient:${id}`);
      this.cache.invalidate(`patients:${patient.parent_id}`);
    } catch (error) {
      throw new Error(`Failed to delete patient: ${error.message}`);
    }
  }

  async searchPatients(query: string, limit: number = 20): Promise<Patient[]> {
    try {
      const results = await this.db
        .prepare(
          "SELECT * FROM patients WHERE first_name LIKE ? OR last_name LIKE ? OR dpi_number LIKE ? LIMIT ?",
        )
        .bind(`%${query}%`, `%${query}%`, `%${query}%`, limit)
        .all<Patient>();

      return results.results || [];
    } catch (error) {
      throw new Error(`Failed to search patients: ${error.message}`);
    }
  }

  private generateId(prefix: string): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    return `${prefix}-${timestamp}-${random}`.toUpperCase();
  }
}

export default PatientService;
