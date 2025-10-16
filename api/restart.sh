#!/bin/bash

# Trouver le PID du processus photos-api (pas le script shell)
PID=$(pgrep -f "photos-api$" | head -1)

if [ -n "$PID" ]; then
    echo "Arrêt du processus photos-api (PID: $PID)"
    kill $PID
    sleep 1
fi

# Démarrer l'API
cd /home/sydnec/simonbourlier.fr/api
echo "Démarrage de l'API..."
./photos-api > api.log 2>&1 &

sleep 2
echo "API redémarrée. Vérification..."
curl -s http://localhost:8080/health && echo " ✓ API fonctionne"
