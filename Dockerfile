# ---------- Base builder stage ----------
FROM node:current-alpine3.22 AS builder

# Set work directory inside image
WORKDIR /app 

# Install dependencies (only package*.json first for better caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source code (host to image)
COPY . .

# ---------- Production runtime stage ----------
FROM node:current-alpine3.22 AS runner

# Set work directory inside image
WORKDIR /app

# Copy only production node_modules and built files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

# Set NODE_ENV for performance
ENV NODE_ENV=production

# Expose port (Express default 3000)
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
