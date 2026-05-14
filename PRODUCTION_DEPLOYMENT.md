# Production Deployment Setup - GeniDoc Hayat

## Phase 1: Vercel Frontend Deployment

### Prerequisites

```bash
npm install -g vercel
```

### Vercel Configuration

1. **Connect Repository**

   ```bash
   vercel link
   ```

2. **Environment Variables** (Set in Vercel Dashboard)

   ```
   VITE_API_URL=https://api.genidoc-hayat.com
   VITE_WS_URL=wss://api.genidoc-hayat.com/ws
   VITE_AUTH_DOMAIN=auth.genidoc-hayat.com
   ```

3. **Build Settings**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`

### Deployment Command

```bash
vercel deploy --prod
```

---

## Phase 2: Cloudflare Backend Deployment

### Prerequisites

```bash
npm install -g wrangler
wrangler login
```

### Wrangler Configuration (wrangler.toml)

Already configured with:

- D1 Database binding
- KV Storage binding
- Environment management

### Deploy Command

```bash
wrangler deploy --env production
```

---

## Phase 3: Database Setup

### D1 Database Migration

```bash
# Create migration
wrangler d1 migrations create genidoc-db setup

# Apply migrations
wrangler d1 migrations apply genidoc-db --remote

# Seed data
wrangler d1 execute genidoc-db --remote --file=backend/prisma/seed.sql
```

### Tables to Create

- users
- patients
- consultations
- prescriptions
- medical_records
- permissions
- audit_logs
- notifications
- billings
- smart_cards

---

## Phase 4: Environment Configuration

### Production Secrets (Cloudflare)

```bash
wrangler secret put DATABASE_URL
wrangler secret put JWT_SECRET
wrangler secret put STRIPE_KEY
wrangler secret put SENDGRID_KEY
wrangler secret put TWILIO_KEY
```

---

## Phase 5: CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Build frontend
        run: cd frontend && npm run build

      - name: Deploy to Vercel
        run: vercel deploy --prod --token ${{ secrets.VERCEL_TOKEN }}

      - name: Deploy to Cloudflare
        run: |
          cd backend
          wrangler deploy --env production
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

---

## Monitoring & Observability

### Vercel Analytics

- Enable in Vercel Dashboard
- Monitor Web Vitals
- Track error rates

### Cloudflare Analytics Engine

```javascript
// In worker
context.waitUntil(
  env.ANALYTICS_ENGINE_DATASET.writeDataPoint({
    indexes: ["api_requests"],
    blobs: [endpoint, method, status],
    doubles: [latency, response_size],
  }),
);
```

### Health Checks

```bash
GET https://api.genidoc-hayat.com/health
GET https://app.genidoc-hayat.com/health
```

---

## Scaling & Performance

1. **CDN Configuration** (Cloudflare)
   - Cache TTL: 3600s (API), 86400s (static)
   - Minify CSS/JS
   - Brotli compression

2. **Database Optimization**
   - Add indexes on frequently queried columns
   - Implement query caching (Redis alternative: KV)
   - Monitor slow queries

3. **API Rate Limiting**
   ```toml
   [[routes]]
   pattern = "api.genidoc-hayat.com/api/*"
   zone_id = "your_zone_id"
   rate_limit = 1000  # per minute
   ```

---

## Security Checklist

- [ ] Enable HTTPS/TLS only
- [ ] Set CORS headers properly
- [ ] Implement Rate Limiting
- [ ] Add CSRF protection
- [ ] Enable CSP headers
- [ ] Implement JWT expiration
- [ ] Hash passwords with bcrypt
- [ ] Add request validation
- [ ] Implement audit logging
- [ ] Regular security scanning

---

## Rollback Procedure

```bash
# Vercel
vercel rollback

# Cloudflare
wrangler deploy --env production  # (re-deploy previous version)
```

---

## Post-Deployment Checklist

- [ ] Verify all APIs responding
- [ ] Check database connectivity
- [ ] Validate authentication flow
- [ ] Test file uploads
- [ ] Monitor error logs
- [ ] Performance baseline
- [ ] User UAT sign-off
