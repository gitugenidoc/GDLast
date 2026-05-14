# GeniDoc Hayat - Deployment Guide

## Frontend Deployment (Vercel)

### 1. Prepare for Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Navigate to frontend directory
cd frontend

# Deploy
vercel
```

### 2. Environment Variables on Vercel

Set these in Vercel Dashboard → Settings → Environment Variables:

```
VITE_API_URL=https://your-backend-url.com/api
```

### 3. Configure Production Build

The `vercel.json` file handles:

- Build command: `npm run build`
- Output directory: `dist`
- Client-side routing rewrites
- Environment variable injection

---

## Backend Deployment Options

### Option 1: Railway (Recommended - PostgreSQL included)

**Setup:**

1. Create account at [railway.app](https://railway.app)
2. Connect GitHub repository
3. Create PostgreSQL plugin
4. Set environment variables:

```
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
PORT=3000
```

5. Deploy - Railway automatically detects Node.js and runs `npm start`

**Costs:** ~$5/month starter plan

---

### Option 2: Render

**Setup:**

1. Create account at [render.com](https://render.com)
2. Create New → Web Service
3. Select GitHub repository
4. Select branch to deploy
5. Build command: `npm install && npx prisma db push`
6. Start command: `npm start`
7. Set environment variables
8. Deploy

**Costs:** ~$7/month starter plan

---

### Option 3: Heroku (Free tier discontinued - paid only)

Use `Procfile` if deploying elsewhere:

```
web: node src/server.js
release: npx prisma db push
```

---

## Local Development Setup

### Backend

```bash
cd backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with local database URL

# Run migrations
npm run db:migrate

# Start dev server (watches for changes)
npm run dev
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Keep VITE_API_URL=http://localhost:3000/api for local dev

# Start dev server (Vite on port 5173)
npm run dev
```

---

## Production Checklist

- [ ] Update `FRONTEND_URL` in backend .env
- [ ] Set strong JWT secrets
- [ ] Configure CORS properly
- [ ] Enable HTTPS everywhere
- [ ] Set up database backups
- [ ] Monitor error logs
- [ ] Setup Sentry for error tracking (optional)

---

## Environment Variables Reference

### Backend (.env)

```
# Database
DATABASE_URL=postgresql://user:password@host:port/dbname

# JWT
JWT_SECRET=long_random_string_min_32_chars
JWT_REFRESH_SECRET=another_random_string_min_32_chars

# Server
PORT=3000
NODE_ENV=production

# CORS
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (.env)

```
VITE_API_URL=https://your-backend-url.com/api
VITE_ENV=production
```

---

## Troubleshooting

**Frontend won't connect to backend:**

- Check VITE_API_URL is correct
- Verify CORS_ORIGIN on backend matches frontend URL
- Check browser console for specific error

**Database migration fails:**

- Run locally first: `npm run db:migrate`
- Check DATABASE_URL is valid
- Ensure database exists and is accessible

**Build fails on deployment:**

- Check Node.js version compatibility (18+)
- Verify all dependencies installed locally
- Check build logs in deployment platform dashboard
