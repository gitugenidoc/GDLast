# GeniDoc Hayat - Complete Production Setup Guide

## 🚀 Quick Start - 5 Minutes

### 1. Environment Setup

```bash
# Clone repository
git clone https://github.com/yourusername/genidoc-hayat.git
cd genidoc-hayat

# Install global tools
npm install -g wrangler vercel

# Setup Vercel
vercel link --yes

# Setup Cloudflare
wrangler login
```

### 2. Environment Variables

Create `.env.production`:

```bash
# Database (from Cloudflare)
DATABASE_URL=your_d1_url
DB_BINDING=genidoc_db

# JWT
JWT_SECRET=$(openssl rand -base64 32)

# APIs
SENDGRID_API_KEY=your_key
TWILIO_SID=your_sid
TWILIO_TOKEN=your_token
STRIPE_SECRET_KEY=your_key

# URLs
CORS_ORIGIN=https://app.genidoc-hayat.com

# Feature Flags
ENABLE_FHIR_SYNC=true
ENABLE_SMART_CARDS=true
```

### 3. Deploy

```bash
# Automated deployment
chmod +x scripts/deploy-production.sh
./scripts/deploy-production.sh

# OR manual steps
npm ci
cd frontend && npm run build && cd ..
cd backend && wrangler deploy --env production && cd ..
```

---

## 📋 Step-by-Step Deployment

### Phase 1: Prepare Infrastructure

1. **Vercel Setup**
   - Go to vercel.com
   - Connect GitHub repository
   - Set environment variables
   - Enable Analytics

2. **Cloudflare Setup**
   - Create D1 database
   - Create KV namespace
   - Create Workers project
   - Set up custom domain

3. **Database**
   ```bash
   # Apply schema
   wrangler d1 migrations apply genidoc-db --remote --file=backend/database/schema.sql
   ```

### Phase 2: Configure Secrets

```bash
# Vercel secrets
vercel env add VITE_API_URL
vercel env add VITE_WS_URL
vercel env add VITE_AUTH_DOMAIN

# Cloudflare secrets
wrangler secret put JWT_SECRET
wrangler secret put SENDGRID_API_KEY
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put TWILIO_SID
wrangler secret put TWILIO_TOKEN
```

### Phase 3: Build & Test

```bash
# Install dependencies
npm ci

# Run tests
npm run test

# Build frontend
cd frontend && npm run build && cd ..

# Build backend (if needed)
cd backend && npm run build && cd ..
```

### Phase 4: Deploy

```bash
# Frontend to Vercel
cd frontend
vercel deploy --prod
cd ..

# Backend to Cloudflare
cd backend
wrangler deploy --env production
cd ..

# Run database migrations
wrangler d1 migrations apply genidoc-db --remote
```

### Phase 5: Verify

```bash
# Check health
curl https://app.genidoc-hayat.com/health
curl https://api.genidoc-hayat.com/health

# Check logs
vercel logs
wrangler tail
```

---

## 🔧 Configuration Files

### wrangler.toml

```toml
name = "genidoc-hayat-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[[env.production]]
name = "production"

[[env.production.d1_databases]]
binding = "DB"
database_name = "genidoc-db"
database_id = "your-id"

[[env.production.kv_namespaces]]
binding = "KV_NAMESPACE"
id = "your-kv-id"

[[env.production.routes]]
pattern = "api.genidoc-hayat.com/api/*"
zone_id = "your-zone-id"
```

### vercel.json

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm ci",
  "framework": "vite",
  "env": {
    "VITE_API_URL": "https://api.genidoc-hayat.com",
    "VITE_WS_URL": "wss://api.genidoc-hayat.com/ws"
  }
}
```

---

## 📊 Monitoring & Maintenance

### Vercel Analytics

- Enable Web Vitals tracking
- Monitor Core Web Vitals
- Track error rates
- Set up performance alerts

### Cloudflare Analytics

```javascript
// In worker
context.waitUntil(
  env.ANALYTICS_ENGINE.writeDataPoint({
    indexes: ["endpoint", "method", "status"],
    blobs: [req.url, req.method, res.status],
    doubles: [latency, bytes],
  }),
);
```

### Health Checks

```bash
# Set up monitoring
curl -X POST https://hc-ping.com/your-uuid \
  -d '{"status": "ok", "app": "genidoc-hayat"}'
```

---

## 🔐 Security Checklist

- [ ] Enable HTTPS everywhere
- [ ] Set security headers (CSP, HSTS, X-Frame-Options)
- [ ] Enable DDoS protection (Cloudflare)
- [ ] Rate limiting configured
- [ ] JWT secrets rotated
- [ ] Database backups enabled
- [ ] Audit logging enabled
- [ ] Two-factor authentication enabled
- [ ] IP whitelisting for admin access
- [ ] Regular security scans scheduled

---

## 🚨 Troubleshooting

### Frontend not loading

```bash
# Check build
cd frontend && npm run build

# Clear Vercel cache
vercel rebuild

# Verify environment variables
vercel env ls
```

### API errors

```bash
# Check backend logs
wrangler tail --env production

# Test API directly
curl -H "Authorization: Bearer $TOKEN" \
  https://api.genidoc-hayat.com/api/patients

# Check database
wrangler d1 query genidoc-db "SELECT COUNT(*) FROM users" --remote
```

### Database connection issues

```bash
# Verify D1 binding
wrangler d1 info genidoc-db

# Test query
wrangler d1 query genidoc-db "SELECT 1" --remote

# Check KV binding
wrangler kv:key list --binding KV_NAMESPACE
```

---

## 📈 Performance Optimization

### Frontend

- Enable Gzip compression
- Minify CSS/JS
- Optimize images
- Implement code splitting
- Cache static assets (1 year)

### Backend

- Enable query caching (1 hour)
- Index frequently queried columns
- Implement pagination
- Use connection pooling
- Monitor slow queries

### Database

```sql
-- Add indexes
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_patient_parent ON patients(parent_id);
CREATE INDEX idx_consultation_date ON consultations(consultation_date DESC);
```

---

## 📚 Useful Commands

```bash
# Local development
npm run dev

# Testing
npm run test
npm run test:coverage

# Building
npm run build

# Deployment
./scripts/deploy-production.sh

# Database
wrangler d1 migrations apply genidoc-db --remote
wrangler d1 query genidoc-db "SELECT * FROM users LIMIT 10" --remote

# Logs
wrangler tail --env production
vercel logs --service api

# Rollback
vercel rollback
wrangler versions list  # See previous deployments
```

---

## 🎯 Success Metrics

Track these metrics post-deployment:

- Page load time < 3 seconds
- API response time < 200ms
- Uptime > 99.9%
- Error rate < 0.1%
- User satisfaction > 4.5/5

---

## 📞 Support

- **Documentation**: https://docs.genidoc-hayat.com
- **Status Page**: https://status.genidoc-hayat.com
- **Issues**: GitHub Issues
- **Security**: security@genidoc-hayat.com

---

**Version**: 1.0.0  
**Last Updated**: 2024-01-15  
**Maintainer**: DevOps Team
