# GeniDoc Hayat - Produit & Planification Agile

## Vision

**"One newborn, one digital record, one card, continuous care from birth."**

Une identité médicale numérique unique pour chaque nouveau-né, consultable par les parents et professionnels de santé autorisés, liée à une carte physique QR/NFC.

---

## 1. PERSONAS

### Persona 1: Parent - Anas Senhaji

- **Profil**: Parent urbain, 35 ans, soins du nouveau-né primaires
- **Douleurs**: Informations dispersées, panique en urgence, manque de suivi centralisé
- **Gains**: Historique complet, accès rapide, transparence médicale
- **Tâches primaires**: Consulter dossier bébé, voir vaccins, suivre croissance, urgence
- **Attentes**: Interface simple, rassurante, mobile-first

### Persona 2: Pédiatre - Dr. Lina Amrani

- **Profil**: Médecin privé, 40 ans, cabinet Casablanca
- **Douleurs**: Perte temps recherche patient, accès fragmenté, suivi incomplet
- **Gains**: Historique complet immédiat, effica​cité, conformité audit
- **Tâches primaires**: Chercher patient, consulter dossier, enregistrer acte, scanner carte
- **Attentes**: Interface rapide, pas de friction, données complètes

### Persona 3: Admin Clinique - Zineb Boukhair

- **Profil**: Manager clinique privée, 45 ans, 15 médecins
- **Douleurs**: Pas de SIH, gestion manuelle, conformité
- **Gains**: Infrastructure numérique complète, gestion centralisée
- **Tâches primaires**: Gérer médecins, activer cartes, voir activité, facturation
- **Attentes**: Tableau de bord, automatisation, reporting

### Persona 4: Super Admin - Infrastructure

- **Profil**: CTO santé ou responsable infrastructure
- **Douleurs**: Intégration complexe, conformité légale, multi-tenant
- **Gains**: Architecture scalable, interopérabilité FHIR, governance
- **Tâches primaires**: Superviser système, gérer intégrations, audit logs
- **Attentes**: API robuste, FHIR-ready, sécurité

---

## 2. USER JOURNEYS

### Journey 1: Parent consulte dossier bébé

```
1. Login avec email/password
2. Dashboard avec bébé et snapshot santé
3. Ouvre Health Orbit (timeline)
4. Voir vaccins à venir
5. Scanne QR pour urgence si besoin
6. Voit permission pédiatre active
7. Voit logs d'accès
```

### Journey 2: Pédiatre crée consultation

```
1. Dashboard pédiatre
2. Scanner QR ou rechercher patient
3. Ouvrir dossier (si permission ou demander)
4. Consultation workspace
5. Remplir motif, symptômes, diagnostic
6. Ajouter vaccin / croissance / prescription
7. Enregistrer dans GeniDoc (parent notifié)
8. Fermer consultation
```

### Journey 3: Clinique sans SIH s'inscrit

```
1. Admin clinique crée compte facility
2. Crée médecins
3. Configure cartes QR/NFC
4. Pédiatre demo avec patient demo
5. Édite configuration FHIR si besoin
6. Activation première carte
7. Onboarding terminé, système opérationnel
```

### Journey 4: Export FHIR pour intégration SIH

```
1. Facility avec SIH existant
2. Configure intégration FHIR
3. Parent log dossier bébé
4. Export FHIR Bundle complet
5. Importé dans SIH existant
6. Sync bidirectionnel activé
```

---

## 3. BACKLOG MVP DÉTAILLÉ

### Sprint 0: Fondations (Semaine 1)

**Objectif**: Setup technique, architecture, design system

**Tâches**:

- [ ] Initialiser monorepo (backend + frontend)
- [ ] Configurer PostgreSQL local
- [ ] Prisma schema initial
- [ ] Tailwind + design tokens
- [ ] Docker compose
- [ ] CI/CD basique
- [ ] Structure React
- [ ] Variables environnement

**Livérables**:

- Monorepo fonctionnel
- Docker local
- Première migration DB
- Design system Tailwind

---

### Sprint 1: Auth & RBAC (Semaine 2)

**Objectif**: Authentication, roles, protected routes

**User Stories**:

- [ ] Parent peut register + login
- [ ] Pédiatre peut register + login
- [ ] Admin peut créer facility
- [ ] Roles: PARENT, PEDIATRICIAN, FACILITY_ADMIN, SUPER_ADMIN
- [ ] Protected routes avec rôles
- [ ] JWT tokens
- [ ] Refresh token flow
- [ ] Logout

**Backend**:

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me
- Auth middleware
- Role middleware

**Frontend**:

- Login page
- Register page
- ProtectedRoute component
- RoleGuard component
- Redirect based on role

**Tests**:

- Auth register/login
- JWT validation
- Role-based access

---

### Sprint 2: Parent Dashboard (Semaine 3)

**Objectif**: Parent voit le dossier de son bébé

**User Stories**:

- [ ] Parent voit baby profile hero
- [ ] Parent voit snapshot santé (prochain vaccin, RDV, croissance)
- [ ] Parent voit Health Orbit (timeline)
- [ ] Parent voit vaccination journey
- [ ] Parent voit growth tracker
- [ ] Baby profile show

**Backend**:

- GET /api/newborns/:id (mon bébé)
- GET /api/newborns/:id/consultations
- GET /api/newborns/:id/vaccinations
- GET /api/newborns/:id/growth
- POST /api/newborns (create)
- GET /api/users/me/newborns

**Frontend - Pages**:

- /parent/dashboard
- /parent/timeline
- /parent/vaccines
- /parent/growth

**Frontend - Components**:

- BabyProfileCard
- HealthSnapshot
- TimelineOrbit
- VaccinationJourney
- GrowthChart
- ParentLayout

**Database**:

- Newborn seed data
- Consultation seed
- Vaccination seed
- Growth records seed

---

### Sprint 3: Smart Card & QR (Semaine 4)

**Objectif**: Carte digitale, QR code, statuts

**User Stories**:

- [ ] Parent voit carte digitale
- [ ] Parent voit QR code
- [ ] Parent voit statut carte (active/pending)
- [ ] Parent peut scanner QR en urgence
- [ ] Pédiatre peut scanner QR pour accès

**Backend**:

- POST /api/cards/issue
- POST /api/cards/activate
- GET /api/cards/:id
- GET /api/cards/scan/:code
- PATCH /api/cards/:id/status

**Frontend**:

- SmartCardPreview
- QRCodeCard
- Card activation flow
- /parent/card page

**Prisma**:

- SmartCard model
- Enum CardStatus

---

### Sprint 4: Pediatrician Dashboard (Semaine 5)

**Objectif**: Pédiatre peut chercher et consulter bébés

**User Stories**:

- [ ] Pédiatre voit dashboard
- [ ] Pédiatre peut chercher bébé (nom, ID, téléphone)
- [ ] Pédiatre voit patients récents
- [ ] Pédiatre voit bébés suivis
- [ ] Pédiatre voit vaccins en retard
- [ ] Pédiatre peut scanner QR pour accès

**Backend**:

- GET /api/newborns/search (query params)
- GET /api/pediatrician/dashboard
- GET /api/cards/scan/:code
- GET /api/permissions (pending)

**Frontend**:

- /pediatrician/dashboard
- Search component
- Patient list
- Recent patients
- /pediatrician/patients/:id

**Components**:

- PediatricianLayout
- SearchPanel
- PatientCard
- QRScanner (simulation)

---

### Sprint 5: Consultation Workspace (Semaine 6)

**Objectif**: Pédiatre peut créer consultation et ajouter données

**User Stories**:

- [ ] Pédiatre remplit consultation
- [ ] Ajoute vaccin
- [ ] Ajoute croissance
- [ ] Ajoute prescription
- [ ] Parent voit mis à jour
- [ ] Logs créés automatiquement

**Backend**:

- POST /api/newborns/:id/consultations
- PATCH /api/consultations/:id
- POST /api/newborns/:id/vaccinations
- POST /api/newborns/:id/growth
- POST /api/newborns/:id/prescriptions
- Auto-create audit logs

**Frontend**:

- ConsultationForm
- PrescriptionBuilder
- VaccineSelector
- GrowthMeasurement
- /pediatrician/consultation/:newbornId

**Validation**:

- Zod schemas
- Required fields
- Date validation

---

### Sprint 6: Permissions & Access Control (Semaine 7)

**Objectif**: Parent contrôle les accès

**User Stories**:

- [ ] Pédiatre demande accès
- [ ] Parent accepte/refuse
- [ ] Parent voit "Cercle de confiance"
- [ ] Parent peut révoquer accès
- [ ] Mode urgence avec données limitées
- [ ] Logs : qui a consulté quoi et quand

**Backend**:

- POST /api/permissions/request
- POST /api/permissions/:id/approve
- POST /api/permissions/:id/reject
- DELETE /api/permissions/:id
- GET /api/newborns/:id/permissions
- GET /api/newborns/:id/audit-logs (limited for emergency)
- Emergency access mode (limited data)

**Frontend**:

- PermissionRequestCard
- CareCircle component
- Emergency Capsule
- AccessLogTimeline
- /parent/care-circle
- /parent/emergency

**Security**:

- Toujours vérifier permission avant exposer donnée
- Mode urgence: minimum vital data
- Audit tout accès

---

### Sprint 7: Documents & Notifications (Semaine 8)

**Objectif**: Upload docs, système notifications

**User Stories**:

- [ ] Pédiatre upload document
- [ ] Parent voit documents
- [ ] Types : BIRTH_RECORD, PRESCRIPTION, LAB_RESULT, etc.
- [ ] Parent reçoit notification accès
- [ ] Parent reçoit notification nouvelle donnée
- [ ] Mark notification as read

**Backend**:

- POST /api/newborns/:id/documents
- GET /api/newborns/:id/documents
- DELETE /api/documents/:id
- GET /api/notifications
- PATCH /api/notifications/:id/read
- File upload / Multer

**Frontend**:

- DocumentCard
- MedicalVault
- NotificationCenter
- /parent/documents

**Storage**:

- Upload local storage
- Multer config
- Size limits

---

### Sprint 8: Facility Admin & Multi-Tenant (Semaine 9)

**Objectif**: Facility admin gère structure

**User Stories**:

- [ ] Admin facility crée médecins
- [ ] Admin voit cartes activées
- [ ] Admin voit patients
- [ ] Admin voit statistiques
- [ ] Admin gère utilisateurs
- [ ] Isolation données par facility

**Backend**:

- POST /api/facilities
- GET /api/facilities/:id
- PATCH /api/facilities/:id
- GET /api/facilities/:id/users
- GET /api/facilities/:id/cards
- GET /api/facilities/:id/stats
- Facility middleware (isolation tenant)

**Frontend**:

- /facility/dashboard
- /facility/users
- /facility/patients
- /facility/cards
- FacilityCard component
- FacilityLayout

**Security**:

- Vérifier facility_id sur tous les accès
- User ne voit que sa facility

---

### Sprint 9: Billing & Pricing (Semaine 10)

**Objectif**: Modèle business intégré

**User Stories**:

- [ ] Plans tarifaires configurables
- [ ] Card fee : 200 MAD
- [ ] Parent access : 10 MAD
- [ ] SaaS plans possibles
- [ ] Subscription status
- [ ] Invoices liste
- [ ] Pas de paiement réel (structure pour future intégration)

**Backend**:

- GET /api/pricing/plans
- POST /api/billing/subscribe
- GET /api/billing/subscription
- GET /api/billing/invoices
- Models: PricingPlan, Subscription, PaymentRecord

**Frontend**:

- PricingPlanCard
- SubscriptionStatusCard
- /parent/billing
- /pediatrician/billing
- /facility/billing

**Database**:

- PricingPlan seed (200 MAD card)
- Subscription model
- PaymentRecord model
- Entitlements logic

---

### Sprint 10: FHIR Interoperability (Semaine 11)

**Objectif**: Export FHIR, architecture interopérabilité

**User Stories**:

- [ ] Export dossier bébé en FHIR Bundle JSON
- [ ] Resources: Patient, RelatedPerson, Practitioner, Encounter, Observation, Immunization, etc.
- [ ] Future HL7 v2 adapter architecture
- [ ] Future SMART on FHIR ready
- [ ] Webhooks foundation
- [ ] Future terminology mapping

**Backend Modules**:

- /src/modules/fhir/
  - fhirMapper.service.js
  - fhirExport.service.js
  - fhirImport.service.js (skeleton)
  - fhir.routes.js
  - fhir.controller.js

**API Endpoints**:

- GET /api/fhir/newborns/:id/export
- GET /api/fhir/newborns/:id/patient
- GET /api/fhir/newborns/:id/bundle
- POST /api/fhir/import/bundle (skeleton)

**FHIR Resources** (mappés):

- Patient ← Newborn + Parent
- RelatedPerson ← Parent
- Practitioner ← Pediatrician
- Organization ← Facility
- Encounter ← Consultation
- Observation ← Growth, vitals
- Immunization ← Vaccination
- MedicationRequest ← Prescription
- AllergyIntolerance ← Allergies
- DocumentReference ← Medical docs
- DiagnosticReport ← Labs
- AuditEvent ← Access logs
- Consent ← Permissions
- Provenance ← Change tracking

**Frontend**:

- FHIRExportCard
- /admin/fhir (view FHIR config)
- Export modal

**Documentation**:

- FHIR_INTEROPERABILITY.md
- Mapping guide

---

### Sprint 11: Audit & Security Hardening (Semaine 12)

**Objectif**: Logs, sécurité, polish

**User Stories**:

- [ ] Tous les logs d'accès enregistrés
- [ ] Super admin voit logs globaux
- [ ] Helmet config complète
- [ ] Rate limiting
- [ ] Validation Zod stricte partout
- [ ] Erreurs propres sans stack traces
- [ ] Password requirements
- [ ] Session timeouts

**Backend Security**:

- Helmet middleware
- Rate limiting (express-rate-limit)
- CORS configuré
- Zod validation strict
- Sanitization inputs
- Error handler custom
- Audit middleware
- Logger Pino

**Frontend**:

- AuditLogList component
- /admin/audit-logs (super admin only)

**Tests**:

- Audit log creation
- Permission enforcement
- Security headers

---

### Sprint 12: Tests, Polish & Deployment (Semaine 13)

**Objectif**: Tests, UI polish, prêt production

**User Stories**:

- [ ] Backend tests (50+ casos)
- [ ] Frontend tests (30+ casos)
- [ ] Integration tests
- [ ] UI Polish & mobile responsive
- [ ] Docker production
- [ ] Documentation complète
- [ ] README setup
- [ ] Demo data seeds complets

**Tests Backend** (Vitest + Supertest):

- Auth register/login/logout
- RBAC enforcement
- Permission checks
- CRUD endpoints
- Facility isolation
- FHIR export
- Audit logs
- Error handling

**Tests Frontend** (React Testing Library + Vitest):

- Login/Register flow
- ProtectedRoute
- RoleGuard
- Parent dashboard render
- Pediatrician dashboard render
- Permission request flow
- Document upload
- Card activation

**Documentation**:

- README.md (setup complet)
- ARCHITECTURE.md
- API.md (tous endpoints)
- SECURITY.md
- FHIR_INTEROPERABILITY.md
- BUSINESS_MODEL.md
- DEPLOYMENT.md
- AGILE_BACKLOG.md (this)

**Docker**:

- docker-compose.yml
- backend/Dockerfile
- frontend/Dockerfile (Vite)
- .env.example

---

## 4. ESTIMATIONS

| Sprint    | Semaine     | Points   | Focus                        |
| --------- | ----------- | -------- | ---------------------------- |
| Sprint 0  | 1           | 40       | Setup, architecture          |
| Sprint 1  | 2           | 35       | Auth, RBAC                   |
| Sprint 2  | 3           | 40       | Parent dashboard             |
| Sprint 3  | 4           | 25       | Smart card, QR               |
| Sprint 4  | 5           | 30       | Pediatrician dashboard       |
| Sprint 5  | 6           | 45       | Consultation workspace       |
| Sprint 6  | 7           | 40       | Permissions, access control  |
| Sprint 7  | 8           | 35       | Documents, notifications     |
| Sprint 8  | 9           | 45       | Facility admin, multi-tenant |
| Sprint 9  | 10          | 30       | Billing, pricing             |
| Sprint 10 | 11          | 50       | FHIR interoperability        |
| Sprint 11 | 12          | 40       | Audit, security hardening    |
| Sprint 12 | 13          | 50       | Tests, polish, deployment    |
| **Total** | **~3 mois** | **~475** | **Production-ready MVP**     |

---

## 5. SUCCESS CRITERIA

Au final, je peux:

✅ Me connecter parent/pédiatre/admin
✅ Voir dashboard baby complet
✅ Parent voit Health Orbit timeline
✅ Pédiatre cherche et consulte patient
✅ Crée consultation + vaccin + croissance
✅ Parent voit permission et logs d'accès
✅ Mode urgence fonctionne
✅ Documents peuvent être uploadés
✅ Notifications en temps réel
✅ Facility admin gère structure
✅ Pricing visible
✅ Export FHIR Bundle complet
✅ Logs d'audit exhaustifs
✅ UI premium et responsive
✅ Docker run complet
✅ Tests passent

---

## 6. TECH STACK

**Frontend**: React 18, Vite, JSX, TailwindCSS, shadcn/ui, Lucide, Framer Motion, Recharts, React Hook Form, Zod, React Router
**Backend**: Node.js, Express, Prisma ORM, PostgreSQL, JWT, bcrypt, Helmet, Zod, Pino
**Testing**: Vitest, React Testing Library, Supertest
**DevOps**: Docker, docker-compose, GitHub Actions
**Design**: Tailwind design tokens, Figma patterns

---

## 7. NEXT STEPS

1. ✅ Créer ce document produit
2. → Créer ARCHITECTURE.md + schema Prisma
3. → Créer DESIGN_SYSTEM.md + Tailwind config
4. → Setup monorepo + Sprint 0
5. → Sprint 1: Auth
6. → Continuer sprints...
