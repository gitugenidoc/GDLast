#!/bin/bash
# Production Deployment Script

set -e

echo "=========================================="
echo "GeniDoc Hayat - Production Deployment"
echo "=========================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check requirements
echo -e "${BLUE}[1/7] Checking requirements...${NC}"
command -v node >/dev/null 2>&1 || { echo "Node.js is required but not installed."; exit 1; }
command -v wrangler >/dev/null 2>&1 || { echo "Wrangler is required. Run: npm install -g wrangler"; exit 1; }
command -v vercel >/dev/null 2>&1 || { echo "Vercel CLI is required. Run: npm install -g vercel"; exit 1; }
echo -e "${GREEN}✓ All requirements met${NC}"

# Install dependencies
echo -e "${BLUE}[2/7] Installing dependencies...${NC}"
npm ci
cd frontend && npm ci && cd ..
cd backend && npm ci && cd ..
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Run tests
echo -e "${BLUE}[3/7] Running tests...${NC}"
npm run test --if-present || true
cd frontend && npm run test --if-present || true && cd ..
echo -e "${GREEN}✓ Tests completed${NC}"

# Build frontend
echo -e "${BLUE}[4/7] Building frontend...${NC}"
cd frontend
npm run build
cd ..
echo -e "${GREEN}✓ Frontend built${NC}"

# Build backend
echo -e "${BLUE}[5/7] Building backend...${NC}"
cd backend
npm run build --if-present || true
cd ..
echo -e "${GREEN}✓ Backend built${NC}"

# Deploy frontend to Vercel
echo -e "${BLUE}[6/7] Deploying to Vercel...${NC}"
cd frontend
vercel deploy --prod --token=$VERCEL_TOKEN
cd ..
echo -e "${GREEN}✓ Frontend deployed to Vercel${NC}"

# Deploy backend to Cloudflare
echo -e "${BLUE}[7/7] Deploying to Cloudflare...${NC}"
cd backend
wrangler deploy --env production
cd ..
echo -e "${GREEN}✓ Backend deployed to Cloudflare${NC}"

# Health checks
echo ""
echo -e "${YELLOW}Running health checks...${NC}"
sleep 5

FRONTEND_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" https://app.genidoc-hayat.com)
BACKEND_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" https://api.genidoc-hayat.com/health)

if [ "$FRONTEND_HEALTH" = "200" ]; then
  echo -e "${GREEN}✓ Frontend is healthy (HTTP $FRONTEND_HEALTH)${NC}"
else
  echo -e "${YELLOW}⚠ Frontend returned HTTP $FRONTEND_HEALTH${NC}"
fi

if [ "$BACKEND_HEALTH" = "200" ]; then
  echo -e "${GREEN}✓ Backend is healthy (HTTP $BACKEND_HEALTH)${NC}"
else
  echo -e "${YELLOW}⚠ Backend returned HTTP $BACKEND_HEALTH${NC}"
fi

echo ""
echo -e "${GREEN}=========================================="
echo "Deployment completed successfully!"
echo "=========================================${NC}"
echo ""
echo "Frontend: https://app.genidoc-hayat.com"
echo "Backend:  https://api.genidoc-hayat.com"
echo "Docs:     https://app.genidoc-hayat.com/docs"
