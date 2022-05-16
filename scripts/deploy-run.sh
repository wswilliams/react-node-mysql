#!/bin/bash

APP_NAME=Avaliação
APP_VERSION=1.0
APP_FRONTEND=react-node-mysql-app-client
API_WEB_GATEWAY=react-node-mysql-api-server

echo
echo "BUILDING $APP_NAME FRONTEND"
echo "================================================"
echo

help() {
    echo "Usage:"
}

if [ "$1" = "--help" ]; then
    help

    exit 0
fi

# Build Project

# Deploy project pm2
    echo
    echo "DEPLOYMENT BACKEND WITH PM2 MODE"
    echo "====================================="
    echo

    # Start backend project

    pm2 delete $API_WEB_GATEWAY

    cd api-server/

    npm install

    echo "STARTING BACKEND"

    pm2 start index.js --name $API_WEB_GATEWAY

    cd ..

    echo APP_FRONTEND: $APP_FRONTEND

# Deploy project pm2
    echo
    echo "DEPLOYMENT FRONTEND WITH PM2 MODE"
    echo "====================================="
    echo
    
    cd app-client/

    # Install Dependencies
    npm install

    # Clear previous build
    rm -rf build/

    # Buil frontend project   
    npm run-script build

    # Start frontend project

    pm2 delete $APP_FRONTEND

    cd server/

    npm install

    echo "STARTING FRONTEND"

    pm2 start server.js --name $APP_FRONTEND

    # Restart backEnd Api-back-end
    pm2 restart $API_WEB_GATEWAY
