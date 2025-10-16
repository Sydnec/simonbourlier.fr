#!/bin/bash

# Script d'arrêt pour l'API Photos

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Trouver le processus de l'API
PID=$(pgrep -f "photos-api" | head -n 1)

if [ -z "$PID" ]; then
    log_warn "Aucun processus de l'API Photos n'est en cours d'exécution"
    exit 0
fi

log_info "Arrêt de l'API Photos (PID: $PID)..."
kill $PID

# Attendre que le processus se termine
sleep 2

# Vérifier si le processus est toujours actif
if pgrep -f "photos-api" > /dev/null; then
    log_warn "Le processus ne s'est pas arrêté, forçage de l'arrêt..."
    kill -9 $PID
fi

log_info "API Photos arrêtée avec succès"
