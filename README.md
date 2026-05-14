# GeniDoc Hayat - Digital Health Record for Newborns

> **One newborn, one digital record, one card, continuous care from birth.**

A production-ready SaaS healthcare platform providing digital identity and medical records for newborns, with physical QR/NFC smart cards, designed for parents, pediatricians, and healthcare facilities.

## 🎯 Product Vision

GeniDoc Hayat solves healthcare fragmentation for newborns by creating a centralized digital record accessible to parents and authorized healthcare providers. Every newborn gets:

- **Unique Digital Identity** - GeniDoc ID + QR/NFC smart card
- **Complete Medical Record** - From birth to continuous care
- **Parent Access** - Simple, trustworthy interface
- **Provider Integration** - For pediatricians and hospitals
- **Healthcare Interoperability** - FHIR-ready architecture

## 📊 Business Model

| Stream                      | Price     | Customer                      |
| --------------------------- | --------- | ----------------------------- |
| **Card Fee**                | 200 MAD   | One-time per newborn          |
| **Parent Access**           | 10 MAD    | Unlimited access              |
| **Pediatrician SaaS**       | TBD/month | Per doctor or clinic          |
| **Facility Infrastructure** | TBD/month | Clinics without SIH           |
| **Enterprise Integration**  | TBD       | Integration with existing SIH |

## 🏗️ Tech Stack

### Frontend

- **React 18** - JSX components
- **Vite** - Fast bundler
- **TailwindCSS** - Design system
- **shadcn/ui** - Component library
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Recharts** - Medical data visualization
- **React Hook Form + Zod** - Form validation

### Backend

- **Node.js + Express** - REST API
- **Prisma ORM** - Database abstraction
- **PostgreSQL** - Primary database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security
- **Zod** - Validation

### DevOps

- **Docker + Docker Compose** - Containerization
- **PostgreSQL** - Database
- **GitHub Actions** - CI/CD (future)

## 📁 Project Structure

```
genidochayat/
├── backend/                # Node.js + Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── prisma/
│   │   └── ...
│   ├── package.json
│   └── Dockerfile
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── Dockerfile
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DESIGN_SYSTEM.md
│   ├── SECURITY.md
│   └── ...
├── docker-compose.yml
├── PRODUCT_PLAN.md
└── README.md (this file)
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 16

### Option 1: Docker (Recommended)

```bash
# Clone and setup
git clone <repo>
cd genidochayat

# Start all services
docker compose up --build

# Backend: http://localhost:3000
# Frontend: http://localhost:5173
# PostgreSQL: localhost:5432
```

### Option 2: Local Development

#### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Update DATABASE_URL in .env
npx prisma db push
npx prisma db seed
npm run dev
# API available at http://localhost:3000
```

#### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
# App available at http://localhost:5173
```

## 📝 Demo Accounts

After seeding, use these accounts:

**Parent**

- Email: `parent@genidoc.test`
- Password: `Password123!`
- Role: PARENT

**Pediatrician**

- Email: `doctor@genidoc.test`
- Password: `Password123!`
- Role: PEDIATRICIAN

**Facility Admin**

- Email: `admin@genidoc.test`
- Password: `Password123!`
- Role: FACILITY_ADMIN

**Super Admin**

- Email: `super@genidoc.test`
- Password: `Password123!`
- Role: SUPER_ADMIN

## 🗂️ Key Features

### For Parents

- Dashboard with baby health snapshot
- Health Timeline Orbit (medical events)
- Vaccination journey tracker
- Growth charts (weight, height, head circumference)
- Medical documents vault
- Care circle (authorized providers)
- Emergency capsule (critical data)
- QR code access

### For Pediatricians

- Dashboard with daily consultations
- Patient search (by name, ID, phone)
- QR/NFC card scanning
- Consultation workspace
- Add vaccinations, growth measurements, prescriptions
- Permission management
- Access logs

### For Facilities

- Multi-user management
- Patient registry
- Card activation & tracking
- Statistics & analytics
- Billing & subscriptions
- SIH integration (if applicable)

### For Super Admin

- Global oversight
- Facility management
- Pricing plans
- User management
- FHIR configuration
- Audit logs

## 🔐 Security

- **JWT Authentication** with refresh tokens
- **RBAC** - Role-based access control
- **Permission-based** access to medical data
- **Encrypted** sensitive data
- **Audit logs** for all access
- **CORS** protected
- **Rate limiting** on API
- **Helmet** security headers
- **Bcryptjs** password hashing

## 📊 Database Schema

Key entities:

- **User** - Account with role
- **ParentProfile** - Parent data
- **PediatricianProfile** - Doctor data
- **Newborn** - Baby medical record
- **SmartCard** - QR/NFC card
- **Consultation** - Medical encounter
- **Vaccination** - Immunization record
- **GrowthRecord** - Weight, height, head circumference
- **MedicalDocument** - Uploaded files
- **AccessPermission** - Parent-doctor access
- **AuditLog** - Complete access history
- **Subscription** - Billing status
- **Facility** - Clinic/Hospital

See [ARCHITECTURE.md](./ARCHITECTURE.md) for full schema.

## 🌍 FHIR Interoperability

GeniDoc Hayat is **interoperability-first**. Architecture supports:

- **FHIR JSON Export** - Complete medical records
- **HL7 v2 Adapter** - For legacy systems
- **SMART on FHIR** - Future SSO integration
- **Terminology Mapping** - ICD-10, SNOMED CT, LOINC, ATC
- **Patient Identity Matching**
- **Consent Management**

See [FHIR_INTEROPERABILITY.md](./docs/FHIR_INTEROPERABILITY.md) for details.

## 📚 Documentation

- [PRODUCT_PLAN.md](./PRODUCT_PLAN.md) - Product vision, personas, user journeys, agile backlog
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical architecture, schema, API routes
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - UI/UX guidelines, colors, components
- [docs/API.md](./docs/API.md) - Detailed API documentation
- [docs/SECURITY.md](./docs/SECURITY.md) - Security measures
- [docs/FHIR_INTEROPERABILITY.md](./docs/FHIR_INTEROPERABILITY.md) - FHIR mapping & integration

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test

# Watch mode
npm run test:watch
```

## 🎨 Design

- **Premium healthtech** aesthetic
- Inspired by Apple Health, Stripe, Linear
- Medical blue + turquoise color scheme
- Glassmorphism + soft shadows
- Responsive & accessible (WCAG AA)
- Framer Motion micro-interactions

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for full guidelines.

## 📱 Pages & Features

### Parent Routes

- `/auth/login` - Login
- `/auth/register` - Register
- `/parent/dashboard` - Main dashboard
- `/parent/timeline` - Health Orbit
- `/parent/vaccines` - Vaccination journey
- `/parent/growth` - Growth tracker
- `/parent/documents` - Medical documents
- `/parent/care-circle` - Authorized providers
- `/parent/emergency` - Emergency capsule
- `/parent/card` - Smart card view
- `/parent/billing` - Subscription

### Pediatrician Routes

- `/pediatrician/dashboard` - Daily overview
- `/pediatrician/patients` - Patient search
- `/pediatrician/patients/:id` - Patient detail
- `/pediatrician/consultation/:id` - Consultation form
- `/pediatrician/vaccines` - Vaccine tracking
- `/pediatrician/card-activation` - Card management
- `/pediatrician/qr-scan` - QR scanner
- `/pediatrician/billing` - Subscription

### Facility Routes

- `/facility/dashboard` - Facility overview
- `/facility/users` - User management
- `/facility/patients` - Patient registry
- `/facility/cards` - Card tracking
- `/facility/billing` - Billing

### Admin Routes

- `/admin/dashboard` - System overview
- `/admin/facilities` - Facility management
- `/admin/users` - User management
- `/admin/cards` - Card management
- `/admin/pricing` - Pricing plans
- `/admin/integrations` - SIH integrations
- `/admin/fhir` - FHIR configuration

## 🔄 API Endpoints

### Auth

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

### Newborns

```
GET    /api/newborns
POST   /api/newborns
GET    /api/newborns/:id
PATCH  /api/newborns/:id
GET    /api/newborns/search
```

### Medical Data

```
POST   /api/newborns/:id/consultations
POST   /api/newborns/:id/vaccinations
POST   /api/newborns/:id/growth
POST   /api/newborns/:id/documents
GET    /api/newborns/:id/appointments
```

### Permissions

```
POST   /api/permissions/request
POST   /api/permissions/:id/approve
DELETE /api/permissions/:id
```

### Smart Cards

```
POST   /api/cards/issue
POST   /api/cards/activate
GET    /api/cards/scan/:code
```

### FHIR

```
GET    /api/fhir/newborns/:id/export
GET    /api/fhir/newborns/:id/bundle
POST   /api/fhir/import/bundle
```

See [docs/API.md](./docs/API.md) for complete API reference.

## 📈 Agile Roadmap

**Sprint 0** (Week 1) - Foundations  
**Sprint 1** (Week 2) - Auth & RBAC  
**Sprint 2** (Week 3) - Parent Dashboard  
**Sprint 3** (Week 4) - Smart Card & QR  
**Sprint 4** (Week 5) - Pediatrician Dashboard  
**Sprint 5** (Week 6) - Consultation Workspace  
**Sprint 6** (Week 7) - Permissions & Access  
**Sprint 7** (Week 8) - Documents & Notifications  
**Sprint 8** (Week 9) - Facility Admin & Multi-tenant  
**Sprint 9** (Week 10) - Billing & Pricing  
**Sprint 10** (Week 11) - FHIR Interoperability  
**Sprint 11** (Week 12) - Audit & Security  
**Sprint 12** (Week 13) - Tests, Polish, Deploy

See [PRODUCT_PLAN.md](./PRODUCT_PLAN.md) for detailed sprint breakdown.

## 🚢 Deployment

### Development

```bash
docker compose up --build
```

### Production

- Docker images → Container registry
- Backend → Node.js hosting (Vercel, Render, etc.)
- Frontend → Static CDN (Vercel, Netlify, etc.)
- Database → Managed PostgreSQL (Supabase, Railway, etc.)
- SSL/TLS encryption
- Environment variables configured
- Monitoring & logging

## 📞 Support & Contact

For questions or support, contact the team at:

- Email: team@genidoc.tech
- Website: www.genidoc.tech

## 📄 License

Proprietary - GeniDoc Hayat, 2025

---

**Ready to launch. Let's build the future of newborn healthcare.** 🚀
