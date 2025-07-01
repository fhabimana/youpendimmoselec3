# Configuration de la Base de Données - YOUPENDI IMMO SELECT

## 🎯 Vue d'ensemble

L'application YOUPENDI IMMO SELECT utilise **Supabase** comme backend-as-a-service, offrant :

- Base de données PostgreSQL
- API REST automatique
- Authentification utilisateur
- Stockage de fichiers
- Temps réel

## 🚀 Configuration Rapide

### 1. Créer un compte Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte gratuit
3. Créez un nouveau projet
4. Notez votre **URL du projet** et **clé API publique**

### 2. Configuration des variables d'environnement

1. Copiez le fichier `.env.example` vers `.env`

```bash
cp .env.example .env
```

2. Mettez à jour les variables dans `.env`:

```env
VITE_SUPABASE_URL=https://votre-projet-id.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-anon-supabase
```

### 3. Initialiser la base de données

1. Dans votre tableau de bord Supabase, allez dans **SQL Editor**
2. Exécutez le script `database/init.sql` pour créer les tables
3. Exécutez le script `database/seed.sql` pour insérer les données d'exemple

## 📊 Structure de la Base de Données

### Tables principales

#### `properties`

- Stocke toutes les propriétés immobilières
- Colonnes : titre, prix, localisation, coordonnées GPS, caractéristiques, images, etc.

#### `agents`

- Informations des agents immobiliers
- Colonnes : nom, contact, province, spécialités, image, etc.

#### `users`

- Comptes utilisateurs (propriétaires, agents, administrateurs)
- Intégré avec Supabase Auth

#### `contact_requests`

- Demandes de contact et d'information
- Liées aux propriétés et agents

#### `email_alerts`

- Alertes email personnalisées
- Critères de recherche sauvegardés

## 🔐 Sécurité et Permissions

### Row Level Security (RLS)

- **Propriétés** : Lecture publique, écriture pour les utilisateurs authentifiés
- **Agents** : Lecture publique, gestion par les administrateurs
- **Utilisateurs** : Chaque utilisateur ne peut voir que son propre profil
- **Demandes de contact** : Création publique, lecture pour agents/admins
- **Alertes email** : Accès limité au propriétaire

### Rôles utilisateur

- **owner** : Propriétaires de biens, accès au dashboard
- **agent** : Agents immobiliers, gestion des propriétés
- **admin** : Administrateurs, accès complet

## 📱 Utilisation dans l'Application

### Services disponibles

1. **PropertyService** - Gestion des propriétés

```typescript
import { PropertyService } from "@/services/propertyService";

// Récupérer toutes les propriétés
const properties = await PropertyService.getAllProperties();

// Rechercher avec filtres
const filtered = await PropertyService.searchProperties({
  location: "Kinshasa",
  property_type: "villa",
  min_price: 100000,
});
```

2. **AgentService** - Gestion des agents

```typescript
import { AgentService } from "@/services/agentService";

// Récupérer tous les agents
const agents = await AgentService.getAllAgents();
```

3. **AuthService** - Authentification

```typescript
import { AuthService } from "@/services/authService";

// Connexion
const { data, error } = await AuthService.signIn(email, password);

// Inscription
const result = await AuthService.signUp(email, password, fullName);
```

### Hooks React

1. **useAuth** - État d'authentification

```typescript
import { useAuth } from "@/hooks/useAuth";

const { user, loading, signIn, signOut } = useAuth();
```

2. **useProperties** - Données des propriétés

```typescript
import { useProperties } from "@/hooks/useProperties";

const { properties, loading, searchProperties } = useProperties();
```

3. **useAgents** - Données des agents

```typescript
import { useAgents } from "@/hooks/useAgents";

const { agents, loading } = useAgents();
```

## 🛠️ Commandes utiles

### Installation des dépendances

```bash
npm install @supabase/supabase-js
```

### Démarrage en développement

```bash
npm run dev
```

### Construction pour production

```bash
npm run build
```

## 📋 Checklist de Déploiement

- [ ] Compte Supabase créé
- [ ] Variables d'environnement configurées
- [ ] Scripts SQL exécutés
- [ ] Données d'exemple chargées
- [ ] RLS activé et testé
- [ ] Authentification fonctionnelle
- [ ] API testée

## 🔧 Maintenance

### Sauvegardes

- Supabase effectue des sauvegardes automatiques
- Exportation manuelle possible depuis le dashboard

### Monitoring

- Métriques disponibles dans le dashboard Supabase
- Logs des requêtes et erreurs

### Évolutivité

- Plan gratuit : 50 MB de stockage, 500 MB de bande passante
- Plans payants disponibles pour plus de ressources

## 📞 Support

- Documentation Supabase : [docs.supabase.com](https://docs.supabase.com)
- Support technique : [supabase.com/support](https://supabase.com/support)
- Communauté : [discord.supabase.com](https://discord.supabase.com)
