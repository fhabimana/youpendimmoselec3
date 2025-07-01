# 🏡 YOUPENDI IMMO SELECT - Backend PHP

API REST complète pour la gestion immobilière de YOUPENDI IMMO SELECT.

## 🚀 Installation Rapide

### 1. **Prérequis**

- PHP 7.4+ (recommandé PHP 8.0+)
- MySQL 5.7+ ou MariaDB 10.3+
- Apache ou Nginx
- Extension PHP: PDO, JSON, GD, OpenSSL

### 2. **Installation**

```bash
# Cloner ou télécharger le backend
cd votre-dossier-web/api

# Copier la configuration
cp .env.example .env

# Éditer la configuration
nano .env
```

### 3. **Configuration de la base de données**

```sql
-- Créer la base de données
mysql -u root -p

-- Importer le schema
mysql -u root -p < database/schema.sql
```

### 4. **Configuration Apache**

Le fichier `.htaccess` est déjà configuré pour Apache.

### 5. **Configuration Nginx**

```nginx
server {
    listen 80;
    server_name api.votre-domaine.com;
    root /var/www/html/api;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

## 📋 Variables d'Environnement

Configurez votre fichier `.env`:

```env
# Base de données
DB_HOST=localhost
DB_NAME=youpendi_immo
DB_USER=votre_utilisateur
DB_PASS=votre_mot_de_passe

# JWT (générez une clé sécurisée)
JWT_SECRET=votre_secret_jwt_tres_securise

# Application
APP_URL=https://votre-domaine.com
```

## 🛠️ Endpoints API

### **Authentification**

```http
POST /auth/login
POST /auth/register
POST /auth/logout
GET  /auth/me
POST /auth/forgot-password
POST /auth/reset-password
```

### **Propriétés**

```http
GET    /properties              # Liste des propriétés
GET    /properties/search       # Recherche avec filtres
GET    /properties/{id}         # Détails d'une propriété
POST   /properties              # Créer une propriété (auth requis)
PUT    /properties/{id}         # Modifier une propriété (auth requis)
DELETE /properties/{id}         # Supprimer une propriété (auth requis)
```

### **Agents**

```http
GET    /agents                  # Liste des agents
GET    /agents/{id}             # Détails d'un agent
GET    /agents/province/{name}  # Agents par province
POST   /agents                  # Créer un agent (admin requis)
PUT    /agents/{id}             # Modifier un agent (admin requis)
DELETE /agents/{id}             # Supprimer un agent (admin requis)
```

### **Utilisateurs**

```http
GET    /users                   # Liste des utilisateurs (admin requis)
GET    /users/{id}              # Détails d'un utilisateur
PUT    /users/{id}              # Modifier un utilisateur
DELETE /users/{id}              # Supprimer un utilisateur (admin requis)
```

### **Contact & Alertes**

```http
POST   /contact                 # Créer une demande de contact
GET    /contact                 # Liste des demandes (auth requis)
PUT    /contact/{id}/status     # Modifier le statut (auth requis)
POST   /email-alerts            # Créer une alerte email
GET    /email-alerts            # Liste des alertes (auth requis)
DELETE /email-alerts/{id}       # Supprimer une alerte (auth requis)
```

### **Upload**

```http
POST   /upload/image            # Upload d'une image
POST   /upload/images           # Upload multiple d'images
```

## 📝 Exemples d'utilisation

### **Connexion**

```javascript
fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "user@example.com",
    password: "password123",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      localStorage.setItem("token", data.data.token);
    }
  });
```

### **Recherche de propriétés**

```javascript
fetch(
  "/api/properties/search?location=Kinshasa&property_type=villa&min_price=100000",
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.data); // Liste des propriétés
  });
```

### **Requête authentifiée**

```javascript
fetch("/api/properties", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
  body: JSON.stringify({
    title: "Villa Moderne",
    price: 250000,
    location: "Gombe, Kinshasa",
    // ... autres données
  }),
});
```

## 🔐 Sécurité

- **JWT** pour l'authentification
- **BCRYPT** pour le hachage des mots de passe
- **Protection CSRF** via tokens
- **Validation** de toutes les entrées
- **Limitation** des tentatives de connexion
- **Headers de sécurité** configurés

## 📊 Structure des Données

### **Utilisateur**

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "Jean Dupont",
  "user_type": "owner|agent|admin",
  "phone": "+243123456789",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### **Propriété**

```json
{
  "id": "uuid",
  "title": "Villa Moderne Gombe",
  "price": 320000,
  "currency": "USD",
  "location": "Gombe, Kinshasa",
  "latitude": -4.3194,
  "longitude": 15.3074,
  "bedrooms": 4,
  "bathrooms": 3,
  "area": 280,
  "area_unit": "m²",
  "parking": 2,
  "images": ["url1", "url2"],
  "features": ["Piscine", "Jardin"],
  "property_type": "villa",
  "status": "available",
  "agent_id": "uuid"
}
```

## 🐛 Dépannage

### **Erreur de connexion à la base**

1. Vérifiez les paramètres dans `.env`
2. Assurez-vous que MySQL est démarré
3. Vérifiez les permissions de l'utilisateur

### **Headers CORS**

Les headers CORS sont configurés dans `.htaccess` et `index.php`.

### **Upload de fichiers**

Les limites sont configurées dans `.htaccess`:

- `upload_max_filesize = 10M`
- `post_max_size = 10M`

## 📞 Support

- **Email**: admin@youpendimmoselect.com
- **Documentation**: Voir les commentaires dans le code
- **Logs**: Vérifiez les logs PHP et Apache/Nginx

---

**Backend développé pour YOUPENDI IMMO SELECT** 🏡
