# ==========================================
# Dockerfile for Railway Backend Service
# ==========================================

FROM node:20-alpine AS builder

WORKDIR /app

# Install openssl for Prisma
RUN apk add --no-cache openssl libc6-compat

# Install pnpm
RUN npm install -g pnpm@9

# Copy package manifests
COPY package.json ./
COPY prisma ./prisma/

# Install dependencies
RUN pnpm install --frozen-lockfile=false

# Generate Prisma Client
RUN pnpm prisma generate

# Copy source code and config
COPY tsconfig.json ./
COPY src ./src/
COPY scripts ./scripts/

# Build TypeScript to dist
RUN pnpm build

# ==========================================
# Production Runner Stage
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl libc6-compat
RUN npm install -g pnpm@9

ENV NODE_ENV=production
ENV PORT=4001
ENV HOST=0.0.0.0

# Copy node_modules & built files from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts ./scripts

EXPOSE 4001

# Run migrations and start server
CMD ["sh", "-c", "pnpm prisma db push && node dist/index.js"]
