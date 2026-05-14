# Backend Dockerfile - Development & Production

FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
COPY prisma ./prisma

# Install dependencies
RUN npm ci

# Copy source code
COPY src ./src

# Expose port
EXPOSE 3000

# Default command (can be overridden)
CMD ["npm", "start"]
