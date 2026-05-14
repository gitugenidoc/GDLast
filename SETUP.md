# GeniDoc Hayat - Setup Guide

## Quick Start

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- PostgreSQL 16 ([Download](https://www.postgresql.org/download/))
- Docker & Docker Compose (optional, for containerized setup)

### Option 1: Docker Compose (Recommended for Development)

```bash
# Clone repository
git clone <repository-url>
cd genidochayat

# Start all services (PostgreSQL, Backend, Frontend)
docker compose up --build

# Wait for services to start:
# - Backend: http://localhost:3000
# - Frontend: http://localhost:5173
# - PostgreSQL: localhost:5432

# View logs
docker compose logs -f
```

To stop:

```bash
docker compose down
```

---

### Option 2: Local Development Setup

#### Step 1: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure database URL in .env
# Example: DATABASE_URL="postgresql://user:password@localhost:5432/genidoc_hayat"

# Setup PostgreSQL
# Create database:
createdb -U postgres genidoc_hayat
# Or use your PostgreSQL client

# Generate Prisma client
npx prisma generate

# Run migrations (creates tables)
npx prisma db push

# Seed database with demo data
npm run db:seed

# Start backend
npm run dev

# Backend running at http://localhost:3000
```

#### Step 2: Frontend Setup

In a **new terminal**:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start frontend dev server
npm run dev

# Frontend running at http://localhost:5173
```

---

## Demo Accounts

After seeding, use these accounts:

| Role           | Email                 | Password       |
| -------------- | --------------------- | -------------- |
| Parent         | `parent@genidoc.test` | `Password123!` |
| Pediatrician   | `doctor@genidoc.test` | `Password123!` |
| Facility Admin | `admin@genidoc.test`  | `Password123!` |
| Super Admin    | `super@genidoc.test`  | `Password123!` |

---

## Database Management

### View Data with Prisma Studio

```bash
cd backend
npx prisma studio
# Opens http://localhost:5555 with database UI
```

### Reset Database

```bash
cd backend
npx prisma migrate reset
# Clears database and runs migrations again
```

### Create Migration

```bash
cd backend
npx prisma migrate dev --name "description"
```

---

## Development Tips

### Backend - Available Scripts

```bash
npm run dev          # Start dev server with hot reload
npm start            # Start production server
npm run db:push      # Push schema to database
npm run db:migrate   # Create migration
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
npm test             # Run tests
npm run lint         # Lint code
```

### Frontend - Available Scripts

```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run tests
npm run lint         # Lint code
```

---

## Troubleshooting

### Issue: Database connection failed

**Solution:**

```bash
# Check PostgreSQL is running
# macOS (Homebrew):
brew services list

# Windows:
# Check Services → PostgreSQL-x64-16

# Linux (systemctl):
sudo systemctl status postgresql

# Connection string format:
postgresql://USERNAME:PASSWORD@localhost:5432/genidoc_hayat
```

### Issue: Port already in use

**Backend (3000):**

```bash
# Find and kill process using port 3000
# macOS/Linux:
lsof -i :3000
kill -9 <PID>

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Frontend (5173):**

```bash
# macOS/Linux:
lsof -i :5173
kill -9 <PID>

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Issue: Dependencies not installing

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Prisma client issues

```bash
# Regenerate client
npx prisma generate

# Check if migrations are applied
npx prisma migrate status
```

---

## Environment Variables

### Backend (.env)

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/genidoc_hayat
JWT_SECRET=your_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_here
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api
VITE_ENV=development
```

---

## Project Structure

```
genidochayat/
├── backend/
│   ├── src/
│   │   ├── app.js           # Express app
│   │   ├── server.js        # Server entry point
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── client.js
│   │   │   └── seed.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── ...
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   ├── app/
│   │   │   ├── App.jsx
│   │   │   └── router.jsx
│   │   ├── pages/
│   │   ├── components/
│   │   ├── styles/
│   │   └── ...
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
│
├── docs/
├── docker-compose.yml
├── package.json (monorepo root)
└── README.md
```

---

## API Testing

### Using cURL

```bash
# Health check
curl http://localhost:3000/health

# API status
curl http://localhost:3000/api

# Login (get token)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"parent@genidoc.test","password":"Password123!"}'
```

### Using Postman

1. Import endpoints from API documentation
2. Set base URL: `http://localhost:3000/api`
3. Use demo accounts for testing

---

## Git Workflow

```bash
# Clone repository
git clone <repository-url>
cd genidochayat

# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: description of change"

# Push to remote
git push origin feature/your-feature

# Create pull request
# (GitHub/GitLab interface)
```

---

## Deployment

### Production Build

```bash
# Build both frontend and backend
npm run build

# Or individually:
npm run build -w backend
npm run build -w frontend
```

### Docker Deployment

```bash
# Build images
docker compose -f docker-compose.yml build

# Push to registry (adjust registry URL)
docker tag genidoc-backend:latest registry.example.com/genidoc-backend:latest
docker tag genidoc-frontend:latest registry.example.com/genidoc-frontend:latest

docker push registry.example.com/genidoc-backend:latest
docker push registry.example.com/genidoc-frontend:latest

# Deploy to production platform
# (Kubernetes, Docker Swarm, Cloud Run, etc.)
```

---

## Support

For issues, questions, or contributions:

1. Check [ARCHITECTURE.md](../ARCHITECTURE.md) for technical details
2. Review [API.md](../docs/API.md) for API documentation
3. Open an issue on GitHub

---

## Next Steps

1. ✅ Setup backend and frontend locally
2. ✅ Seed database with demo data
3. → Start Sprint 1: Authentication implementation
4. → Build out features sprint by sprint

See [PRODUCT_PLAN.md](../PRODUCT_PLAN.md) for detailed sprint breakdown.
