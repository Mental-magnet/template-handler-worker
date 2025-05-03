# Build stage
FROM node:23-alpine3.21 AS builder

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src ./src
COPY docs ./docs
COPY certs ./certs
COPY tsconfig.json .
COPY nest-cli.json .
COPY .sentryclirc.json .

# Build application
RUN npm run build

# Production stage
FROM node:23-alpine3.21

# Copy package files
COPY package*.json ./

# Copy Sentry files
COPY .sentryclirc.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /dist ./dist
# Now our directory should be only "dist" and "node_modules"

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser


# Start the application
CMD ["npm", "run", "start:prod"]