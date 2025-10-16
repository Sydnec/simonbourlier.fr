.PHONY: run build clean dev prod

# Développement
dev:
	@echo "Starting API in development mode..."
	go run main.go

# Production
prod:
	@echo "Starting API in production mode..."
	ENV=production go run main.go

# Build
build:
	@echo "Building API..."
	go build -o events-api main.go

# Run built binary (dev)
run: build
	@echo "Running built API in development mode..."
	./events-api

# Run built binary (prod)
run-prod: build
	@echo "Running built API in production mode..."
	ENV=production ./events-api

# Clean
clean:
	@echo "Cleaning up..."
	rm -f events-api

# Test
test:
	@echo "Running tests..."
	go test ./...
