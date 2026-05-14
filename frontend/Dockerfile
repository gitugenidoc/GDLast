# Frontend Dockerfile - Development & Production

FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src ./src
COPY public ./public
COPY index.html vite.config.js tailwind.config.js postcss.config.js ./

# Expose port
EXPOSE 5173

# Default command (can be overridden)
CMD ["npm", "run", "dev", "--", "--host"]
