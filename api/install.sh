#!/bin/bash

# Script d'installation pour l'API Photos en Go
# Pour Debian/Ubuntu

set -e  # Arrêter en cas d'erreur

echo "==================================="
echo "Installation de l'API Photos en Go"
echo "==================================="
echo ""

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si le script est exécuté en tant que root
if [ "$EUID" -eq 0 ]; then 
    log_error "Ne pas exécuter ce script en tant que root"
    exit 1
fi

# Détection de l'OS
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
else
    log_error "Impossible de détecter le système d'exploitation"
    exit 1
fi

log_info "Système d'exploitation détecté: $OS"

# Mise à jour des paquets
log_info "Mise à jour de la liste des paquets..."
sudo apt-get update

# Installation de wget et curl si nécessaire
log_info "Installation de wget et curl..."
sudo apt-get install -y wget curl

# Vérifier si Go est déjà installé
if command -v go &> /dev/null; then
    GO_VERSION=$(go version | awk '{print $3}')
    log_info "Go est déjà installé: $GO_VERSION"
    read -p "Voulez-vous réinstaller Go? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        SKIP_GO_INSTALL=true
    fi
fi

# Installation de Go
if [ "$SKIP_GO_INSTALL" != true ]; then
    GO_VERSION="1.21.5"
    log_info "Installation de Go $GO_VERSION..."
    
    # Télécharger Go
    cd /tmp
    wget -q https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz
    
    # Supprimer l'ancienne installation si elle existe
    sudo rm -rf /usr/local/go
    
    # Extraire la nouvelle version
    sudo tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz
    
    # Nettoyer
    rm go${GO_VERSION}.linux-amd64.tar.gz
    
    log_info "Go installé avec succès"
fi

# Configurer le PATH pour Go
if ! grep -q "/usr/local/go/bin" ~/.bashrc; then
    log_info "Configuration du PATH pour Go dans ~/.bashrc..."
    echo "" >> ~/.bashrc
    echo "# Go configuration" >> ~/.bashrc
    echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
    echo 'export GOPATH=$HOME/go' >> ~/.bashrc
    echo 'export PATH=$PATH:$GOPATH/bin' >> ~/.bashrc
fi

# Charger les variables d'environnement
export PATH=$PATH:/usr/local/go/bin
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin

# Vérifier l'installation de Go
if ! command -v go &> /dev/null; then
    log_error "Go n'a pas pu être installé correctement"
    exit 1
fi

GO_VERSION_INSTALLED=$(go version)
log_info "Go installé: $GO_VERSION_INSTALLED"

# Se placer dans le répertoire de l'API
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

log_info "Répertoire de l'API: $SCRIPT_DIR"

# Initialiser le module Go si nécessaire
if [ ! -f "go.mod" ]; then
    log_warn "go.mod n'existe pas, création..."
    go mod init simonbourlier.fr/api
fi

# Télécharger les dépendances
log_info "Téléchargement des dépendances Go..."
go mod tidy

# Compiler l'API
log_info "Compilation de l'API..."
go build -o photos-api main.go

if [ $? -eq 0 ]; then
    log_info "Compilation réussie! L'exécutable 'photos-api' a été créé"
else
    log_error "La compilation a échoué"
    exit 1
fi

# Créer le répertoire events s'il n'existe pas
if [ ! -d "events" ]; then
    log_info "Création du répertoire events..."
    mkdir -p events
fi

# Créer un fichier .env d'exemple
if [ ! -f ".env" ]; then
    log_info "Création du fichier .env..."
    cat > .env << EOF
# Configuration de l'API Photos
PORT=8080
ENV=development
ALLOWED_ORIGIN=https://simonbourlier.fr
EOF
    log_info "Fichier .env créé. Modifiez-le selon vos besoins."
fi

# Installation optionnelle de systemd service
read -p "Voulez-vous créer un service systemd pour l'API? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    log_info "Création du service systemd..."
    
    SERVICE_FILE="/tmp/photos-api.service"
    cat > $SERVICE_FILE << EOF
[Unit]
Description=API Photos Simon Bourlier
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$SCRIPT_DIR
ExecStart=$SCRIPT_DIR/photos-api
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

    sudo mv $SERVICE_FILE /etc/systemd/system/photos-api.service
    sudo systemctl daemon-reload
    
    log_info "Service systemd créé: photos-api.service"
    log_info "Pour démarrer le service: sudo systemctl start photos-api"
    log_info "Pour activer au démarrage: sudo systemctl enable photos-api"
fi

echo ""
echo "==================================="
log_info "Installation terminée avec succès!"
echo "==================================="
echo ""
echo "Pour démarrer l'API en mode développement:"
echo "  cd $SCRIPT_DIR"
echo "  ./photos-api"
echo ""
echo "Ou utilisez le Makefile:"
echo "  make run      # Démarrer l'API"
echo "  make build    # Compiler l'API"
echo "  make clean    # Nettoyer les fichiers compilés"
echo ""
echo "L'API écoutera sur http://localhost:8080"
echo ""
