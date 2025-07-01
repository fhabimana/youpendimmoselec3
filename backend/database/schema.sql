-- Base de données YOUPENDI IMMO SELECT
-- Schema MySQL

CREATE DATABASE IF NOT EXISTS youpendi_immo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE youpendi_immo;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    user_type ENUM('owner', 'agent', 'admin') DEFAULT 'owner',
    is_active BOOLEAN DEFAULT TRUE,
    reset_token VARCHAR(64),
    reset_token_expires DATETIME,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_user_type (user_type),
    INDEX idx_reset_token (reset_token)
);

-- Table des agents
CREATE TABLE IF NOT EXISTS agents (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    province VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    experience VARCHAR(255) NOT NULL,
    specialties JSON,
    properties_sold INT DEFAULT 0,
    image VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_province (province),
    INDEX idx_email (email)
);

-- Table des propriétés
CREATE TABLE IF NOT EXISTS properties (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    location VARCHAR(255) NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    area DECIMAL(10,2) NOT NULL,
    area_unit VARCHAR(10) DEFAULT 'm²',
    parking INT DEFAULT 0,
    images JSON,
    description TEXT,
    features JSON,
    virtual_tour VARCHAR(500),
    status ENUM('available', 'sold', 'reserved') DEFAULT 'available',
    property_type ENUM('house', 'apartment', 'villa', 'land', 'commercial') NOT NULL,
    agent_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_property_type (property_type),
    INDEX idx_location (location),
    INDEX idx_price (price),
    INDEX idx_agent (agent_id),
    INDEX idx_coordinates (latitude, longitude)
);

-- Table des demandes de contact
CREATE TABLE IF NOT EXISTS contact_requests (
    id VARCHAR(36) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    property_id VARCHAR(36),
    agent_id VARCHAR(36),
    status ENUM('new', 'contacted', 'closed') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Table des alertes email
CREATE TABLE IF NOT EXISTS email_alerts (
    id VARCHAR(36) PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    property_type VARCHAR(50),
    min_price DECIMAL(12,2),
    max_price DECIMAL(12,2),
    frequency ENUM('daily', 'weekly', 'instant') DEFAULT 'weekly',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_email (user_email),
    INDEX idx_active (is_active)
);

-- Table pour les tentatives de connexion (sécurité)
CREATE TABLE IF NOT EXISTS login_attempts (
    email VARCHAR(255) PRIMARY KEY,
    failed_attempts INT DEFAULT 0,
    last_failed_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertion des agents d'exemple
INSERT INTO agents (id, name, email, phone, province, position, experience, specialties, properties_sold, image) VALUES
('agent-1', 'Jean-Claude Mukendi', 'jean.mukendi@youpendimmoselect.com', '+243 994 052 587', 'Goma', 'Agent Principal', '8 ans d\'expérience', 
 '["Villas de luxe", "Appartements standing", "Terrains"]', 120, 
 'https://images.pexels.com/photos/10397001/pexels-photo-10397001.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop'),

('agent-2', 'Marie Kabila Tshombe', 'marie.kabila@youpendimmoselect.com', '+243 997 123 456', 'Kinshasa', 'Agent Principal', '6 ans d\'expérience',
 '["Propriétés commerciales", "Résidences", "Investissements"]', 85,
 'https://images.pexels.com/photos/7679648/pexels-photo-7679648.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop'),

('agent-3', 'Pierre Tshisekedi Mulumba', 'pierre.tshisekedi@youpendimmoselect.com', '+243 998 654 321', 'Bukavu', 'Agent Régional', '5 ans d\'expérience',
 '["Propriétés lacustres", "Maisons familiales", "Tourisme"]', 65,
 'https://images.pexels.com/photos/8715785/pexels-photo-8715785.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop'),

('agent-4', 'Alice Mbuyi Kalala', 'alice.mbuyi@youpendimmoselect.com', '+243 996 789 012', 'Lubumbashi', 'Agent Régional', '4 ans d\'expérience',
 '["Propriétés minières", "Résidences industrielles", "Commerces"]', 45,
 'https://images.pexels.com/photos/12562546/pexels-photo-12562546.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop'),

('agent-5', 'Joseph Lumbu Ngandu', 'joseph.lumbu@youpendimmoselect.com', '+243 995 456 789', 'Beni', 'Agent Régional', '3 ans d\'expérience',
 '["Propriétés agricoles", "Écotourisme", "Développement rural"]', 30,
 'https://images.pexels.com/photos/15522690/pexels-photo-15522690.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop'),

('agent-6', 'Marcel Ilunga Kayembe', 'marcel.ilunga@youpendimmoselect.com', '+243 993 321 654', 'Butembo', 'Agent Régional', '4 ans d\'expérience',
 '["Propriétés montagnardes", "Commerce frontalier", "Résidences"]', 40,
 'https://images.pexels.com/photos/5060987/pexels-photo-5060987.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop'),

('agent-7', 'Clémentine Mwamba Kasonga', 'clementine.mwamba@youpendimmoselect.com', '+243 992 987 321', 'Kisangani', 'Agent Régional', '5 ans d\'expérience',
 '["Propriétés fluviales", "Commerce", "Éducation"]', 55,
 'https://images.pexels.com/photos/32669988/pexels-photo-32669988.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop');

-- Insertion des propriétés d'exemple
INSERT INTO properties (id, title, price, location, latitude, longitude, bedrooms, bathrooms, area, parking, images, description, features, property_type, agent_id) VALUES
('prop-1', 'Villa Moderne Gombe', 320000.00, 'Gombe, Kinshasa', -4.3194, 15.3074, 4, 3, 280.00, 2,
 '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]',
 'Magnifique villa moderne située dans le prestigieux quartier de Gombe. Cette propriété de standing offre un cadre de vie exceptionnel avec des finitions haut de gamme.',
 '["Piscine privée", "Jardin paysager", "Garage double", "Climatisation centrale", "Sécurité 24h/24", "Cuisine équipée"]',
 'villa', 'agent-2'),

('prop-2', 'Appartement Standing Bandalungwa', 180000.00, 'Bandalungwa, Kinshasa', -4.3803, 15.2736, 3, 2, 150.00, 1,
 '["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]',
 'Appartement de standing dans une résidence moderne et sécurisée. Parfait pour une famille cherchant le confort et la commodité.',
 '["Balcon panoramique", "Ascenseur", "Climatisation", "Parking sécurisé", "Concierge", "Cuisine américaine"]',
 'apartment', 'agent-2'),

('prop-3', 'Maison Familiale Lemba', 250000.00, 'Lemba, Kinshasa', -4.4022, 15.2872, 5, 3, 220.00, 2,
 '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]',
 'Grande maison familiale avec de nombreux espaces de vie. Idéale pour une grande famille cherchant espace et tranquillité.',
 '["Grand jardin", "Terrasse couverte", "Garage", "Cave", "Buanderie", "Bureau", "Cheminée"]',
 'house', 'agent-2'),

('prop-4', 'Villa de Luxe Ngaliema', 450000.00, 'Ngaliema, Kinshasa', -4.3667, 15.2639, 6, 4, 350.00, 3,
 '["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]',
 'Villa de prestige dans un quartier résidentiel huppé. Luxe, confort et élégance pour un art de vivre exceptionnel.',
 '["Piscine à débordement", "Jardin tropical", "Home cinéma", "Wine cave", "Spa privé", "Garage triple", "Sécurité renforcée"]',
 'villa', 'agent-2'),

('prop-5', 'Terrain Résidentiel Kasavubu', 75000.00, 'Kasavubu, Kinshasa', -4.3583, 15.3139, 0, 0, 800.00, 0,
 '["https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"]',
 'Terrain résidentiel bien situé, parfait pour la construction d\'une propriété sur mesure. Zone en développement avec tous les services.',
 '["Titre foncier", "Électricité disponible", "Eau courante", "Évacuation", "Zone résidentielle", "Transport accessible"]',
 'land', 'agent-2');

-- Créer un utilisateur admin par défaut
INSERT INTO users (id, email, password, full_name, user_type) VALUES
('admin-1', 'admin@youpendimmoselect.com', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrateur YOUPENDI', 'admin');
-- Mot de passe par défaut: "password123" (à changer en production)
