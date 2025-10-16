# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copy go mod files
COPY go.mod ./
COPY go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o events-api .

# Runtime stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates exiftool

WORKDIR /root/

# Copy the binary from builder
COPY --from=builder /app/events-api .

# Copy events directory (will be mounted in production)
COPY --from=builder /app/events ./events
COPY --from=builder /app/events-config.json ./events-config.json

# Expose port
EXPOSE 8084

# Set environment to production
ENV ENV=production
ENV PORT=8084

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD wget -qO- http://localhost:8084/health || exit 1

# Run the application
CMD ["./events-api"]
