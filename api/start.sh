#!/bin/bash

# Script de démarrage pour l'API Photos

set -e

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Se placer dans le répertoire du script
cd "$(dirname "${BASH_SOURCE[0]}")"

# Vérifier si l'exécutable existe
if [ ! -f "photos-api" ]; then
    log_error "L'exécutable 'photos-api' n'existe pas"
    log_info "Exécutez d'abord: ./install.sh"
    exit 1
fi

# Charger les variables d'environnement depuis .env si le fichier existe
if [ -f ".env" ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Définir le port par défaut si non défini
PORT=${PORT:-8080}

log_info "Démarrage de l'API Photos sur le port $PORT..."
log_info "Mode: ${ENV:-development}"

# Démarrer l'API
./photos-api
