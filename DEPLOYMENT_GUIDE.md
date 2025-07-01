# 🚀 Guide de Déploiement - YOUPENDI IMMO SELECT

## 📦 Création du Package Complet

### Étapes pour Linux/Mac :

```bash
chmod +x build.sh
./build.sh
```

### Étapes pour Windows :

```bash
.\build.bat
```

Ou manuellement :

```bash
npm install
npm run build
```

## 📁 Structure du Package Final

Après construction, le dossier `dist/` contiendra :

```
dist/
├── index.html                 # Page principale
├── assets/                    # CSS, JS, images optimisés
│   ├── index-[hash].js        # JavaScript optimisé
│   ├── index-[hash].css       # CSS optimisé
│   └── ...
├── .htaccess                  # Configuration Apache
├── nginx.conf                 # Configuration Nginx
├── netlify.toml              # Configuration Netlify
├── DATABASE_SETUP.md         # Guide base de données
├── .env.example              # Variables d'environnement
└── ...autres assets
```

## 🌐 Options d'Hébergement

### 1. **Hébergement Classique (cPanel/FTP)**

1. **Créer le package** :

   ```bash
   npm run build
   ```

2. **Uploader le contenu** :

   - Connectez-vous à votre cPanel ou FTP
   - Uploadez **tout le contenu** du dossier `dist/` dans `public_html/`
   - **Important** : Ne pas uploader le dossier `dist` lui-même, mais son contenu

3. **Configuration** :
   - Le fichier `.htaccess` est inclus pour Apache
   - Configurez vos variables d'environnement via cPanel

### 2. **Netlify (Recommandé)**

1. **Méthode simple** :

   ```bash
   npm run build
   # Glissez-déposez le dossier dist/ sur netlify.com
   ```

2. **Méthode Git** :

   - Connectez votre repository GitHub
   - Configuration automatique avec `netlify.toml`

3. **Variables d'environnement** :
   - Dans Netlify Dashboard → Site Settings → Environment Variables
   - Ajoutez vos clés Supabase

### 3. **Vercel**

1. **Déploiement** :

   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Configuration** :
   - Variables d'environnement dans Vercel Dashboard
   - Configuration automatique pour React

### 4. **VPS/Serveur Dédié**

#### Apache :

1. **Upload des fichiers** :

   ```bash
   scp -r dist/* user@votre-serveur:/var/www/html/
   ```

2. **Configuration Apache** :

   ```apache
   # Utilisez le fichier .htaccess fourni
   # Ou ajoutez dans votre vhost :

   <VirtualHost *:80>
       ServerName votre-domaine.com
       DocumentRoot /var/www/html

       <Directory /var/www/html>
           Options -Indexes
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

#### Nginx :

1. **Upload des fichiers** :

   ```bash
   scp -r dist/* user@votre-serveur:/var/www/html/
   ```

2. **Configuration Nginx** :
   ```bash
   # Utilisez le fichier nginx.conf fourni
   sudo cp dist/nginx.conf /etc/nginx/sites-available/votre-site
   sudo ln -s /etc/nginx/sites-available/votre-site /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```

## ⚙️ Configuration Post-Déploiement

### 1. **Variables d'Environnement**

Créez un fichier `.env` dans votre projet avec :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-anon
VITE_APP_NAME=YOUPENDI IMMO SELECT
VITE_APP_URL=https://votre-domaine.com
```

### 2. **Base de Données Supabase**

1. Suivez le guide `DATABASE_SETUP.md`
2. Exécutez les scripts SQL
3. Configurez les politiques de sécurité

### 3. **SSL/HTTPS**

- **Netlify/Vercel** : SSL automatique
- **cPanel** : Activez SSL dans le panneau
- **VPS** : Utilisez Let's Encrypt

```bash
# Pour Let's Encrypt
sudo certbot --nginx -d votre-domaine.com
```

## 📋 Checklist de Déploiement

- [ ] Code construit avec `npm run build`
- [ ] Fichiers uploadés sur le serveur
- [ ] Configuration serveur web
- [ ] Variables d'environnement configurées
- [ ] Base de données Supabase configurée
- [ ] SSL/HTTPS activé
- [ ] Tests fonctionnels effectués

## 🛠️ Dépannage

### Problème : Page blanche

```bash
# Vérifiez les chemins dans le build
# Assurez-vous que base: "/" dans vite.config.ts
```

### Problème : Routes 404

```bash
# Vérifiez la configuration .htaccess ou nginx.conf
# Les routes React Router doivent rediriger vers index.html
```

### Problème : Variables d'environnement

```bash
# Les variables doivent commencer par VITE_
# Redémarrez le serveur après modification
```

## 📞 Support

- Documentation Vite : [vitejs.dev](https://vitejs.dev)
- Documentation Supabase : [docs.supabase.com](https://docs.supabase.com)
- Support hébergement : Consultez votre provider

## 🎯 Optimisations Production

Le build inclut déjà :

- ✅ Minification CSS/JS
- ✅ Optimisation des images
- ✅ Tree shaking
- ✅ Code splitting
- ✅ Compression GZIP
- ✅ Cache headers
- ✅ PWA ready (si ajouté)

Votre site est prêt pour la production ! 🚀
