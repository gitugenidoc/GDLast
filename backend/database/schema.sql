-- GenidoChaYat Production Database Schema
-- D1 Database Migrations

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'PARENT',
  avatar_url TEXT,
  clinic_id TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  last_login DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_clinic (clinic_id)
);

-- Patients Table
CREATE TABLE IF NOT EXISTS patients (
  id TEXT PRIMARY KEY,
  parent_id TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT,
  blood_type TEXT,
  allergies JSON,
  medical_conditions JSON,
  dpi_number TEXT UNIQUE,
  smart_card_id TEXT UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES users(id),
  INDEX idx_parent (parent_id),
  INDEX idx_dpi (dpi_number)
);

-- Medical Records Table
CREATE TABLE IF NOT EXISTS medical_records (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  record_type TEXT NOT NULL,
  data JSON NOT NULL,
  created_by TEXT,
  is_archived BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  INDEX idx_patient (patient_id),
  INDEX idx_type (record_type)
);

-- Consultations Table
CREATE TABLE IF NOT EXISTS consultations (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  practitioner_id TEXT NOT NULL,
  consultation_date DATETIME NOT NULL,
  chief_complaint TEXT,
  diagnosis TEXT,
  treatment_plan TEXT,
  vitals JSON,
  diagnosis_codes JSON,
  notes TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (practitioner_id) REFERENCES users(id),
  INDEX idx_patient (patient_id),
  INDEX idx_date (consultation_date)
);

-- Prescriptions Table
CREATE TABLE IF NOT EXISTS prescriptions (
  id TEXT PRIMARY KEY,
  consultation_id TEXT,
  patient_id TEXT NOT NULL,
  prescriber_id TEXT NOT NULL,
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  duration TEXT,
  quantity INTEGER,
  is_refillable BOOLEAN DEFAULT TRUE,
  refills_remaining INTEGER DEFAULT 0,
  notes TEXT,
  is_dispensed BOOLEAN DEFAULT FALSE,
  dispensed_at DATETIME,
  dispensed_by TEXT,
  pharmacy_id TEXT,
  expiry_date DATE,
  batch_number TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (prescriber_id) REFERENCES users(id),
  FOREIGN KEY (consultation_id) REFERENCES consultations(id),
  INDEX idx_patient (patient_id),
  INDEX idx_status (is_dispensed)
);

-- Vaccinations Table
CREATE TABLE IF NOT EXISTS vaccinations (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  vaccine_name TEXT NOT NULL,
  vaccine_code TEXT,
  dose_number INTEGER,
  administration_date DATETIME NOT NULL,
  route TEXT,
  site TEXT,
  batch_number TEXT,
  expiry_date DATE,
  administered_by TEXT,
  reaction TEXT,
  next_dose_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  INDEX idx_patient (patient_id),
  INDEX idx_date (administration_date)
);

-- Growth Records Table
CREATE TABLE IF NOT EXISTS growth_records (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  recorded_date DATETIME NOT NULL,
  weight_kg DECIMAL(5,2),
  height_cm DECIMAL(5,1),
  head_circumference_cm DECIMAL(5,1),
  bmi DECIMAL(5,2),
  percentile_weight INTEGER,
  percentile_height INTEGER,
  recorded_by TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  INDEX idx_patient (patient_id),
  INDEX idx_date (recorded_date)
);

-- Billing/Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  invoice_number TEXT UNIQUE NOT NULL,
  consultation_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'MAD',
  status TEXT DEFAULT 'PENDING',
  due_date DATE,
  payment_date DATE,
  payment_method TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  INDEX idx_status (status),
  INDEX idx_date (created_at)
);

-- Smart Cards Table
CREATE TABLE IF NOT EXISTS smart_cards (
  id TEXT PRIMARY KEY,
  patient_id TEXT UNIQUE NOT NULL,
  card_number TEXT UNIQUE NOT NULL,
  qr_code TEXT,
  nfc_code TEXT,
  issued_date DATE,
  expiry_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  last_scanned DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  INDEX idx_patient (patient_id)
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  read_at DATETIME,
  link TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user (user_id),
  INDEX idx_read (is_read)
);

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  old_value JSON,
  new_value JSON,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_resource (resource_type, resource_id),
  INDEX idx_user (user_id),
  INDEX idx_date (created_at)
);

-- Permissions Table
CREATE TABLE IF NOT EXISTS permissions (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  resource TEXT NOT NULL,
  action TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(role, resource, action)
);

-- Clinics Table
CREATE TABLE IF NOT EXISTS clinics (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  city TEXT,
  country TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_patient_consultation ON consultations(patient_id, consultation_date DESC);
CREATE INDEX IF NOT EXISTS idx_prescription_patient ON prescriptions(patient_id, is_dispensed);
CREATE INDEX IF NOT EXISTS idx_vaccination_patient ON vaccinations(patient_id, vaccine_name);
CREATE INDEX IF NOT EXISTS idx_growth_timeline ON growth_records(patient_id, recorded_date DESC);
CREATE INDEX IF NOT EXISTS idx_invoice_status ON invoices(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_timeline ON audit_logs(created_at DESC);

-- Initial Permissions Setup
INSERT OR IGNORE INTO permissions (id, role, resource, action) VALUES
  ('perm_1', 'PARENT', 'patients', 'read'),
  ('perm_2', 'PARENT', 'medical_records', 'read'),
  ('perm_3', 'PARENT', 'consultations', 'read'),
  ('perm_4', 'PARENT', 'prescriptions', 'read'),
  ('perm_5', 'PEDIATRICIAN', 'patients', 'read'),
  ('perm_6', 'PEDIATRICIAN', 'patients', 'update'),
  ('perm_7', 'PEDIATRICIAN', 'consultations', 'create'),
  ('perm_8', 'PEDIATRICIAN', 'consultations', 'update'),
  ('perm_9', 'PEDIATRICIAN', 'prescriptions', 'create'),
  ('perm_10', 'CLINIC_ADMIN', 'users', 'create'),
  ('perm_11', 'CLINIC_ADMIN', 'users', 'update'),
  ('perm_12', 'CLINIC_ADMIN', 'clinics', 'update'),
  ('perm_13', 'SYSTEM_ADMIN', 'users', 'delete'),
  ('perm_14', 'SYSTEM_ADMIN', 'audit_logs', 'read');
