#!/bin/bash

echo "🚀 Construction de YOUPENDI IMMO SELECT pour production..."

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm install

# Construction du projet
echo "🔨 Construction du projet..."
npm run build

# Copie des fichiers supplémentaires nécessaires
echo "📋 Copie des fichiers de configuration..."
cp netlify.toml dist/
cp DATABASE_SETUP.md dist/
cp .env.example dist/

# Création d'un fichier .htaccess pour Apache
echo "⚙️ Création des fichiers de configuration serveur..."
cat > dist/.htaccess << 'EOF'
# Configuration pour Apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]

# Cache headers pour les assets
<filesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
  ExpiresActive on
  ExpiresDefault "access plus 1 month"
</filesMatch>

# Compression GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/x-javascript
</IfModule>
EOF

# Création d'un fichier de configuration Nginx
cat > dist/nginx.conf << 'EOF'
# Configuration pour Nginx
server {
    listen 80;
    server_name votre-domaine.com;
    root /var/www/html;
    index index.html;

    # Gestion des routes React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache pour les assets statiques
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }

    # Compression
    gzip on;
    gzip_types text/html text/plain text/xml text/css text/javascript application/javascript application/x-javascript;
}
EOF

echo "✅ Construction terminée ! Le dossier 'dist' contient tous les fichiers."
echo "📁 Contenu du package :"
ls -la dist/

echo ""
echo "🌐 Instructions d'hébergement :"
echo "1. Uploadez tout le contenu du dossier 'dist' sur votre serveur"
echo "2. Configurez votre serveur web (Apache/Nginx) avec les fichiers fournis"
echo "3. Configurez Supabase avec le guide DATABASE_SETUP.md"
echo "4. Créez le fichier .env avec vos clés Supabase"
