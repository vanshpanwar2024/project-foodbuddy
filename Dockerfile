# Use a Node.js base image for build and runtime
FROM node:20-alpine AS deps
WORKDIR /app

# Install production dependencies only for the runtime image later
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Build stage installs full dependencies and compiles the app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . ./
RUN npm run build

# Runtime stage with only production files and dependencies
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./

EXPOSE 3000
CMD ["npm", "run", "start"]
