@echo off
echo 🚀 Construction de YOUPENDI IMMO SELECT pour production...

REM Installation des dépendances
echo 📦 Installation des dépendances...
npm install

REM Construction du projet
echo 🔨 Construction du projet...
npm run build

REM Copie des fichiers supplémentaires
echo 📋 Copie des fichiers de configuration...
copy netlify.toml dist\
copy DATABASE_SETUP.md dist\
copy .env.example dist\

echo ✅ Construction terminée ! Le dossier 'dist' contient tous les fichiers.
echo 📁 Vérifiez le contenu du dossier dist
dir dist

echo.
echo 🌐 Instructions d'hébergement :
echo 1. Uploadez tout le contenu du dossier 'dist' sur votre serveur
echo 2. Configurez votre serveur web avec les fichiers fournis
echo 3. Configurez Supabase avec le guide DATABASE_SETUP.md
echo 4. Créez le fichier .env avec vos clés Supabase

pause
