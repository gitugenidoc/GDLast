# GeniDoc Hayat - Architecture Technique

## 1. MONOREPO STRUCTURE

```
genidochayat/
├── backend/                          # Node.js + Express API
│   ├── src/
│   │   ├── app.js                   # Express app
│   │   ├── server.js                # Server entry
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── jwt.js
│   │   │   ├── env.js
│   │   │   └── cors.js
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT verification
│   │   │   ├── role.js              # RBAC
│   │   │   ├── permission.js        # Permission checks
│   │   │   ├── facility.js          # Tenant isolation
│   │   │   ├── errorHandler.js
│   │   │   ├── requestLogger.js
│   │   │   └── validation.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── users.controller.js
│   │   │   ├── newborns.controller.js
│   │   │   ├── consultations.controller.js
│   │   │   ├── vaccinations.controller.js
│   │   │   ├── growth.controller.js
│   │   │   ├── documents.controller.js
│   │   │   ├── permissions.controller.js
│   │   │   ├── smartcards.controller.js
│   │   │   ├── facilities.controller.js
│   │   │   ├── billing.controller.js
│   │   │   └── fhir.controller.js
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   ├── user.service.js
│   │   │   ├── newborn.service.js
│   │   │   ├── consultation.service.js
│   │   │   ├── vaccination.service.js
│   │   │   ├── growth.service.js
│   │   │   ├── document.service.js
│   │   │   ├── permission.service.js
│   │   │   ├── smartcard.service.js
│   │   │   ├── facility.service.js
│   │   │   ├── billing.service.js
│   │   │   ├── audit.service.js
│   │   │   ├── notification.service.js
│   │   │   └── fhir.service.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── users.routes.js
│   │   │   ├── newborns.routes.js
│   │   │   ├── consultations.routes.js
│   │   │   ├── vaccinations.routes.js
│   │   │   ├── growth.routes.js
│   │   │   ├── documents.routes.js
│   │   │   ├── permissions.routes.js
│   │   │   ├── smartcards.routes.js
│   │   │   ├── facilities.routes.js
│   │   │   ├── billing.routes.js
│   │   │   ├── fhir.routes.js
│   │   │   └── index.js             # Route aggregator
│   │   ├── validators/
│   │   │   ├── auth.schema.js       # Zod schemas
│   │   │   ├── newborn.schema.js
│   │   │   ├── consultation.schema.js
│   │   │   ├── vaccination.schema.js
│   │   │   └── ...
│   │   ├── utils/
│   │   │   ├── jwt.js
│   │   │   ├── bcrypt.js
│   │   │   ├── response.js          # Standard responses
│   │   │   ├── error.js             # Custom error classes
│   │   │   └── logger.js            # Pino logger
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── seeds/
│   │   │   ├── seed.js              # Main seed
│   │   │   └── data/
│   │   │       ├── users.js
│   │   │       ├── newborns.js
│   │   │       ├── facilities.js
│   │   │       └── ...
│   │   ├── uploads/                 # Documents
│   │   └── tests/
│   │       ├── auth.test.js
│   │       ├── newborns.test.js
│   │       └── ...
│   ├── .env.example
│   ├── package.json
│   └── Dockerfile
│
├── frontend/                         # React + Vite
│   ├── src/
│   │   ├── main.jsx
│   │   ├── app/
│   │   │   ├── App.jsx              # Root component
│   │   │   ├── router.jsx           # React Router config
│   │   │   └── providers.jsx        # Providers (Auth, Query, Theme)
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── fonts/
│   │   ├── components/
│   │   │   ├── ui/                  # shadcn/ui + custom
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   └── ...
│   │   │   ├── layout/
│   │   │   │   ├── ParentLayout.jsx
│   │   │   │   ├── PediatricianLayout.jsx
│   │   │   │   ├── FacilityLayout.jsx
│   │   │   │   ├── AdminLayout.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Topbar.jsx
│   │   │   │   ├── BottomNav.jsx
│   │   │   │   └── MobileNav.jsx
│   │   │   ├── shared/
│   │   │   │   ├── PageHeader.jsx
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   ├── EmptyState.jsx
│   │   │   │   ├── ErrorBoundary.jsx
│   │   │   │   └── NotificationCenter.jsx
│   │   │   └── features/            # Feature-specific components
│   │   │       ├── auth/
│   │   │       │   ├── LoginForm.jsx
│   │   │       │   └── RegisterForm.jsx
│   │   │       ├── parent/
│   │   │       │   ├── BabyProfileCard.jsx
│   │   │       │   ├── HealthSnapshot.jsx
│   │   │       │   ├── TimelineOrbit.jsx
│   │   │       │   ├── VaccinationJourney.jsx
│   │   │       │   ├── GrowthChart.jsx
│   │   │       │   ├── CareCircle.jsx
│   │   │       │   ├── EmergencyCapsule.jsx
│   │   │       │   ├── SmartCardPreview.jsx
│   │   │       │   └── ...
│   │   │       ├── pediatrician/
│   │   │       │   ├── PediatricianDashboard.jsx
│   │   │       │   ├── PatientSearch.jsx
│   │   │       │   ├── ConsultationForm.jsx
│   │   │       │   ├── PrescriptionBuilder.jsx
│   │   │       │   ├── QRScanner.jsx
│   │   │       │   └── ...
│   │   │       ├── facility/
│   │   │       │   ├── FacilityDashboard.jsx
│   │   │       │   ├── UserManagement.jsx
│   │   │       │   ├── CardManagement.jsx
│   │   │       │   └── ...
│   │   │       └── admin/
│   │   │           ├── AdminDashboard.jsx
│   │   │           ├── FacilityManagement.jsx
│   │   │           ├── UserManagement.jsx
│   │   │           └── ...
│   │   ├── features/                # Feature folders (alternative structure)
│   │   │   ├── auth/
│   │   │   │   ├── context/
│   │   │   │   ├── hooks/
│   │   │   │   ├── services/
│   │   │   │   └── types/
│   │   │   ├── parent/
│   │   │   │   ├── pages/
│   │   │   │   ├── components/
│   │   │   │   ├── hooks/
│   │   │   │   ├── services/
│   │   │   │   └── types/
│   │   │   └── ...
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useUser.js
│   │   │   ├── useNewborn.js
│   │   │   ├── usePermissions.js
│   │   │   └── ...
│   │   ├── lib/
│   │   │   ├── api.js               # Axios instance
│   │   │   ├── cn.js                # clsx wrapper
│   │   │   └── utils.js
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   ├── user.service.js
│   │   │   ├── newborn.service.js
│   │   │   ├── consultations.service.js
│   │   │   └── ...
│   │   ├── styles/
│   │   │   ├── globals.css          # Tailwind + custom
│   │   │   └── design-tokens.css    # CSS variables
│   │   ├── utils/
│   │   │   ├── validation.js
│   │   │   ├── formatters.js
│   │   │   ├── validators.js
│   │   │   └── constants.js
│   │   └── tests/
│   │       ├── setup.js
│   │       ├── Login.test.jsx
│   │       ├── ParentDashboard.test.jsx
│   │       └── ...
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js            # Design tokens
│   ├── postcss.config.js
│   ├── .env.example
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf                   # If needed
│
├── docs/
│   ├── ARCHITECTURE.md              # This file
│   ├── API.md                       # API documentation
│   ├── SECURITY.md
│   ├── FHIR_INTEROPERABILITY.md
│   ├── BUSINESS_MODEL.md
│   ├── DEPLOYMENT.md
│   └── DESIGN_SYSTEM.md
│
├── .gitignore
├── docker-compose.yml
├── README.md
├── PRODUCT_PLAN.md
└── package.json                    # Root monorepo package

```

---

## 2. DATABASE SCHEMA (Prisma)

```prisma
// Enums
enum UserRole {
  PARENT
  PEDIATRICIAN
  CLINIC_ADMIN
  HOSPITAL_ADMIN
  FACILITY_ADMIN
  SUPER_ADMIN
}

enum CardStatus {
  PENDING
  ACTIVE
  BLOCKED
  EXPIRED
}

enum PermissionStatus {
  PENDING
  APPROVED
  REJECTED
  REVOKED
}

enum DocumentType {
  BIRTH_RECORD
  PRESCRIPTION
  LAB_RESULT
  MEDICAL_REPORT
  VACCINATION_PROOF
  IMAGING_REPORT
  OTHER
}

enum FacilityType {
  CLINIC
  HOSPITAL
  MATERNITY
  PRIVATE_PRACTICE
  PUBLIC
}

enum AuditAction {
  LOGIN
  CONSULTATION_CREATED
  VACCINATION_ADDED
  DOCUMENT_UPLOADED
  PERMISSION_REQUESTED
  PERMISSION_APPROVED
  CARD_SCANNED
  EMERGENCY_ACCESS
  FACILITY_CREATED
}

enum SubscriptionStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  CANCELLED
}

enum PricingPlanType {
  CARD_FEE
  PARENT_ACCESS
  PEDIATRICIAN_SaaS
  FACILITY_SaaS
  ENTERPRISE_INTEGRATION
}

// Models

model User {
  id                String   @id @default(cuid())
  email             String   @unique
  password          String   // bcrypt hash
  firstName         String
  lastName          String
  phone             String?
  role              UserRole

  // Relationships
  parentProfile     ParentProfile?
  pediatricianProfile PediatricianProfile?
  facilityAdmin     Facility? @relation("AdminUsers")

  // Audit
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  deletedAt         DateTime?

  @@index([email])
  @@index([role])
}

model ParentProfile {
  id                String   @id @default(cuid())
  userId            String   @unique
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  newborns          Newborn[]
  permissions       AccessPermission[]
  notifications     Notification[]
  subscriptions     Subscription[]

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model PediatricianProfile {
  id                String   @id @default(cuid())
  userId            String   @unique
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  licenseNumber     String?
  specialization    String?
  city              String?
  facility          Facility?

  consultations     Consultation[]
  permissions       AccessPermission[]
  subscriptions     Subscription[]

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model Facility {
  id                String   @id @default(cuid())
  name              String
  type              FacilityType
  city              String
  address           String?
  phone             String?
  email             String?

  // Multi-tenant
  sihStatus         String? @default("none")     // none, integrated, legacy
  genidocActive     Boolean @default(true)

  // Relationships
  adminId           String?
  admin             User?   @relation("AdminUsers", fields: [adminId], references: [id])
  pediatricians     PediatricianProfile[]
  smartCards        SmartCard[]
  subscriptions     Subscription[]
  integrations      IntegrationConfig[]

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([city])
}

model Newborn {
  id                String   @id @default(cuid())
  genidocId         String   @unique // HDY-24-000123
  firstName         String
  lastName          String?
  dateOfBirth       DateTime
  city              String?
  gender            String? // M, F
  bloodType         String?

  // Parent
  parentId          String
  parent            ParentProfile @relation(fields: [parentId], references: [id], onDelete: Cascade)

  // Medical data
  consultations     Consultation[]
  vaccinations      Vaccination[]
  growthRecords     GrowthRecord[]
  documents         MedicalDocument[]
  prescriptions     Prescription[]
  appointments      Appointment[]
  permissions       AccessPermission[] @relation("NewbornPermissions")
  smartCard         SmartCard?

  // Audit
  auditLogs         AuditLog[]

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([parentId])
  @@index([genidocId])
}

model SmartCard {
  id                String   @id @default(cuid())
  cardNumber        String   @unique
  qrCode            String   @unique
  nfcCode           String?  @unique

  newbornId         String   @unique
  newborn           Newborn  @relation(fields: [newbornId], references: [id], onDelete: Cascade)

  status            CardStatus @default(PENDING)
  issuedAt          DateTime
  activatedAt       DateTime?

  facilityId        String?
  facility          Facility? @relation(fields: [facilityId], references: [id])

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([newbornId])
  @@index([status])
}

model Consultation {
  id                String   @id @default(cuid())
  newbornId         String
  newborn           Newborn  @relation(fields: [newbornId], references: [id], onDelete: Cascade)

  pediatricianId    String
  pediatrician      PediatricianProfile @relation(fields: [pediatricianId], references: [id])

  reason            String
  symptoms          String?
  diagnosis         String?
  notes             String?
  recommendations   String?

  consultedAt       DateTime

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([newbornId])
  @@index([pediatricianId])
}

model Vaccination {
  id                String   @id @default(cuid())
  newbornId         String
  newborn           Newborn  @relation(fields: [newbornId], references: [id], onDelete: Cascade)

  vaccineName       String
  vaccineCode       String?  // LOINC future
  status            String   @default("scheduled") // scheduled, administered, delayed

  scheduledDate     DateTime?
  administeredDate  DateTime?
  nextDueDate       DateTime?

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([newbornId])
}

model GrowthRecord {
  id                String   @id @default(cuid())
  newbornId         String
  newborn           Newborn  @relation(fields: [newbornId], references: [id], onDelete: Cascade)

  weight            Float    // kg
  height            Float    // cm
  headCircumference Float?   // cm

  measuredAt        DateTime

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([newbornId])
}

model Prescription {
  id                String   @id @default(cuid())
  newbornId         String
  newborn           Newborn  @relation(fields: [newbornId], references: [id], onDelete: Cascade)

  medicationName    String
  dosage            String?
  frequency         String?
  duration          String?
  notes             String?

  prescribedAt      DateTime

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([newbornId])
}

model MedicalDocument {
  id                String   @id @default(cuid())
  newbornId         String
  newborn           Newborn  @relation(fields: [newbornId], references: [id], onDelete: Cascade)

  fileName          String
  fileUrl           String
  fileType          DocumentType
  fileSize          Int

  uploadedBy        String? // User ID or system
  uploadedAt        DateTime

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([newbornId])
}

model Appointment {
  id                String   @id @default(cuid())
  newbornId         String
  newborn           Newborn  @relation(fields: [newbornId], references: [id], onDelete: Cascade)

  scheduledAt       DateTime
  reason            String?
  status            String   @default("scheduled") // scheduled, completed, cancelled

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([newbornId])
  @@index([scheduledAt])
}

model AccessPermission {
  id                String   @id @default(cuid())

  newbornId         String
  newborn           Newborn  @relation("NewbornPermissions", fields: [newbornId], references: [id], onDelete: Cascade)

  parentId          String
  parent            ParentProfile @relation(fields: [parentId], references: [id], onDelete: Cascade)

  pediatricianId    String
  pediatrician      PediatricianProfile @relation(fields: [pediatricianId], references: [id], onDelete: Cascade)

  status            PermissionStatus @default(PENDING)
  requestedAt       DateTime
  respondedAt       DateTime?
  expiresAt         DateTime?

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@unique([newbornId, parentId, pediatricianId])
  @@index([status])
}

model AuditLog {
  id                String   @id @default(cuid())

  action            AuditAction
  userId            String?
  newbornId         String?
  newborn           Newborn? @relation(fields: [newbornId], references: [id])

  ipAddress         String?
  userAgent         String?
  details           String?  // JSON

  createdAt         DateTime @default(now())

  @@index([userId])
  @@index([newbornId])
  @@index([action])
  @@index([createdAt])
}

model Notification {
  id                String   @id @default(cuid())

  parentId          String
  parent            ParentProfile @relation(fields: [parentId], references: [id], onDelete: Cascade)

  title             String
  message           String
  type              String   // permission_request, new_consultation, etc.

  isRead            Boolean  @default(false)
  readAt            DateTime?

  createdAt         DateTime @default(now())

  @@index([parentId])
  @@index([isRead])
}

model PricingPlan {
  id                String   @id @default(cuid())
  name              String
  type              PricingPlanType

  price             Float    // MAD
  currency          String   @default("MAD")
  billingPeriod     String? @default("one-time") // one-time, monthly, yearly

  description       String?
  features          String? // JSON array

  active            Boolean  @default(true)

  subscriptions     Subscription[]

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model Subscription {
  id                String   @id @default(cuid())

  planId            String
  plan              PricingPlan @relation(fields: [planId], references: [id])

  parentId          String?
  parent            ParentProfile? @relation(fields: [parentId], references: [id])

  pediatricianId    String?
  pediatrician      PediatricianProfile? @relation(fields: [pediatricianId], references: [id])

  facilityId        String?
  facility          Facility? @relation(fields: [facilityId], references: [id])

  status            SubscriptionStatus @default(ACTIVE)
  startDate         DateTime
  endDate           DateTime?

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([status])
}

model PaymentRecord {
  id                String   @id @default(cuid())
  subscriptionId    String

  amount            Float
  currency          String   @default("MAD")
  status            String   @default("pending") // pending, completed, failed

  transactionId     String?

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model IntegrationConfig {
  id                String   @id @default(cuid())

  facilityId        String
  facility          Facility @relation(fields: [facilityId], references: [id], onDelete: Cascade)

  type              String   // hl7v2, fhir, smart_on_fhir
  endpoint          String?
  apiKey            String?  // Encrypted
  active            Boolean  @default(false)

  lastSyncAt        DateTime?

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@index([facilityId])
}

model ApiKey {
  id                String   @id @default(cuid())
  key               String   @unique
  name              String

  facilityId        String

  active            Boolean  @default(true)
  lastUsedAt        DateTime?

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model FHIRMapping {
  id                String   @id @default(cuid())

  internalModel     String   // User, Newborn, Consultation, etc.
  fhirResource      String   // Patient, Bundle, Encounter, etc.

  mappingRules      String   // JSON

  active            Boolean  @default(true)

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model WebhookEndpoint {
  id                String   @id @default(cuid())

  facilityId        String

  url               String
  events            String   // JSON array
  active            Boolean  @default(true)

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```

---

## 3. API ROUTES STRUCTURE

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/users/me
PATCH  /api/users/me

POST   /api/newborns
GET    /api/newborns
GET    /api/newborns/:id
PATCH  /api/newborns/:id
DELETE /api/newborns/:id
GET    /api/newborns/search?q=term

GET    /api/newborns/:id/consultations
POST   /api/newborns/:id/consultations
PATCH  /api/consultations/:id
DELETE /api/consultations/:id

GET    /api/newborns/:id/vaccinations
POST   /api/newborns/:id/vaccinations
PATCH  /api/vaccinations/:id
DELETE /api/vaccinations/:id

GET    /api/newborns/:id/growth
POST   /api/newborns/:id/growth
PATCH  /api/growth/:id
DELETE /api/growth/:id

GET    /api/newborns/:id/documents
POST   /api/newborns/:id/documents (multipart)
GET    /api/documents/:id/download
DELETE /api/documents/:id

GET    /api/permissions
POST   /api/permissions/request
POST   /api/permissions/:id/approve
POST   /api/permissions/:id/reject
DELETE /api/permissions/:id

POST   /api/cards/issue
POST   /api/cards/activate
GET    /api/cards/:id
GET    /api/cards/scan/:code
PATCH  /api/cards/:id/status

GET    /api/appointments
POST   /api/appointments
PATCH  /api/appointments/:id
DELETE /api/appointments/:id

GET    /api/newborns/:id/audit-logs

GET    /api/notifications
PATCH  /api/notifications/:id/read

GET    /api/facilities
POST   /api/facilities
GET    /api/facilities/:id
PATCH  /api/facilities/:id
GET    /api/facilities/:id/users
GET    /api/facilities/:id/cards
GET    /api/facilities/:id/stats

GET    /api/pricing/plans
POST   /api/billing/subscribe
GET    /api/billing/subscription
PATCH  /api/billing/subscription
GET    /api/billing/invoices

GET    /api/fhir/newborns/:id/export
GET    /api/fhir/newborns/:id/patient
GET    /api/fhir/newborns/:id/bundle
POST   /api/fhir/import/bundle
```

---

## 4. SECURITY ARCHITECTURE

### JWT Authentication Flow

```
1. Register → hash password, create user, return JWT
2. Login → verify email + password, return access + refresh tokens
3. Protected routes → verify JWT, decode role
4. Refresh → use refresh token to get new access token
```

### RBAC Matrix

```
PARENT:
- Peut consulter son newborn
- Peut voir permissions
- Peut approver/rejeter accès pédiatre
- Peut voir notifications
- Peut payer accès

PEDIATRICIAN:
- Peut chercher newborn
- Peut demander accès
- Peut consulter si permission
- Peut créer consultation
- Peut ajouter vaccin, croissance, prescription

FACILITY_ADMIN:
- Peut gérer médecins de sa facility
- Peut voir cartes de sa facility
- Peut voir patients de sa facility
- Peut voir stats facility
- Peut gérer utilisateurs facility

SUPER_ADMIN:
- Peut tout faire
- Peut créer facilities
- Peut gérer pricing plans
- Peut voir logs globaux
- Peut gérer intégrations
```

### Permission-Based Access Control

```
Before accessing newborn data:
1. Check user auth
2. Check user role
3. Check permission (if not owner/facility)
4. Log access (AuditLog)
5. Emergency mode → limited data
```

### Data Protection

```
- Passwords → bcrypt with salt 10
- Sensitive data → encrypted if needed
- API keys → encrypted in DB
- Files → virus scan, size limits, type whitelist
- Database → SSL connection
- Logs → minimal sensitive data
```

---

## 5. DEPLOYMENT ARCHITECTURE

### Development

```
docker-compose up --build
- PostgreSQL :5432
- Backend :3000
- Frontend :5173
```

### Production

```
- Docker images pushed to registry
- Backend deployed to Node.js runtime
- Frontend deployed to static CDN
- PostgreSQL managed database
- Redis for caching/sessions
- SSL/TLS
- WAF for API
- DDoS protection
- Monitoring + Logging
```

---

## 6. SCALABILITY CONSIDERATIONS

### Multi-Tenant Isolation

- All queries filtered by facility_id
- User can only see own facility data
- Facility admin can only see own facility
- Super admin can see all

### Caching Strategy

- Redis for auth tokens
- Redis for user session
- Cache newborn profile (parent dashboard)
- Cache permissions
- Cache facilities

### Database Optimization

- Indexes on frequently queried fields
- Batch operations where possible
- Pagination for lists
- Soft deletes with indexes

### API Rate Limiting

- 100 req/min per user
- 1000 req/min per IP
- Burst protection
- Sliding window

---

## 7. FHIR INTEROPERABILITY

### Mapping Strategy

```
Newborn (Internal) → Patient (FHIR)
Parent → RelatedPerson (FHIR)
Pediatrician → Practitioner (FHIR)
Facility → Organization (FHIR)
Consultation → Encounter (FHIR)
Vaccination → Immunization (FHIR)
Growth records → Observation (FHIR)
Document → DocumentReference (FHIR)
Permission → Consent (FHIR)
Access log → AuditEvent (FHIR)
```

### Export Bundle

```
GET /api/fhir/newborns/:id/export
Returns FHIR Bundle with:
- Patient (newborn)
- RelatedPersons (parents)
- All Encounters (consultations)
- All Immunizations (vaccinations)
- All Observations (growth, vitals)
- All MedicationRequests (prescriptions)
- All DocumentReferences
- Consent records
- AuditEvents for compliance
```

### Future Integration Points

- HL7 v2 adapter for legacy systems
- SMART on FHIR for SSO
- Webhooks for real-time sync
- Terminology mapping (ICD-10, SNOMED CT, LOINC, ATC)
- IHE MHD for document sharing
- DICOM/DICOMweb for imaging

---

## 8. NEXT IMPLEMENTATION STEPS

1. Setup monorepo structure
2. Initialize packages
3. Configure Prisma + PostgreSQL
4. Create design system
5. Sprint 0 foundations
6. Sprint 1 Auth
7. Continue sprints...
