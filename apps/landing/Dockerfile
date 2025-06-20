# Build stage
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/landing/package.json ./apps/landing/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/landing ./apps/landing
COPY packages ./packages

# Build the app
WORKDIR /app/apps/landing
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/apps/landing/dist /usr/share/nginx/html

# Copy nginx configuration if needed (optional)
# COPY apps/landing/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 