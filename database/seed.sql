-- Insert sample agents
INSERT INTO agents (name, email, phone, province, position, experience, specialties, properties_sold, image) VALUES
(
    'Jean-Claude Mukendi',
    'jean.mukendi@youpendimmoselect.com',
    '+243 994 052 587',
    'Goma',
    'Agent Principal',
    '8 ans d''expérience',
    ARRAY['Villas de luxe', 'Appartements standing', 'Terrains'],
    120,
    'https://images.pexels.com/photos/10397001/pexels-photo-10397001.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop'
),
(
    'Marie Kabila Tshombe',
    'marie.kabila@youpendimmoselect.com',
    '+243 997 123 456',
    'Kinshasa',
    'Agent Principal',
    '6 ans d''expérience',
    ARRAY['Propriétés commerciales', 'Résidences', 'Investissements'],
    85,
    'https://images.pexels.com/photos/7679648/pexels-photo-7679648.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop'
),
(
    'Pierre Tshisekedi Mulumba',
    'pierre.tshisekedi@youpendimmoselect.com',
    '+243 998 654 321',
    'Bukavu',
    'Agent Régional',
    '5 ans d''expérience',
    ARRAY['Propriétés lacustres', 'Maisons familiales', 'Tourisme'],
    65,
    'https://images.pexels.com/photos/8715785/pexels-photo-8715785.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop'
),
(
    'Alice Mbuyi Kalala',
    'alice.mbuyi@youpendimmoselect.com',
    '+243 996 789 012',
    'Lubumbashi',
    'Agent Régional',
    '4 ans d''expérience',
    ARRAY['Propriétés minières', 'Résidences industrielles', 'Commerces'],
    45,
    'https://images.pexels.com/photos/12562546/pexels-photo-12562546.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop'
),
(
    'Joseph Lumbu Ngandu',
    'joseph.lumbu@youpendimmoselect.com',
    '+243 995 456 789',
    'Beni',
    'Agent Régional',
    '3 ans d''expérience',
    ARRAY['Propriétés agricoles', 'Écotourisme', 'Développement rural'],
    30,
    'https://images.pexels.com/photos/15522690/pexels-photo-15522690.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop'
),
(
    'Marcel Ilunga Kayembe',
    'marcel.ilunga@youpendimmoselect.com',
    '+243 993 321 654',
    'Butembo',
    'Agent Régional',
    '4 ans d''expérience',
    ARRAY['Propriétés montagnardes', 'Commerce frontalier', 'Résidences'],
    40,
    'https://images.pexels.com/photos/5060987/pexels-photo-5060987.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop'
),
(
    'Clémentine Mwamba Kasonga',
    'clementine.mwamba@youpendimmoselect.com',
    '+243 992 987 321',
    'Kisangani',
    'Agent Régional',
    '5 ans d''expérience',
    ARRAY['Propriétés fluviales', 'Commerce', 'Éducation'],
    55,
    'https://images.pexels.com/photos/32669988/pexels-photo-32669988.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop'
);

-- Insert sample properties
INSERT INTO properties (title, price, location, latitude, longitude, bedrooms, bathrooms, area, parking, images, description, features, property_type, agent_id) VALUES
(
    'Villa Moderne Gombe',
    320000,
    'Gombe, Kinshasa',
    -4.3194,
    15.3074,
    4,
    3,
    280,
    2,
    ARRAY[
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    'Magnifique villa moderne située dans le prestigieux quartier de Gombe. Cette propriété de standing offre un cadre de vie exceptionnel avec des finitions haut de gamme.',
    ARRAY['Piscine privée', 'Jardin paysager', 'Garage double', 'Climatisation centrale', 'Sécurité 24h/24', 'Cuisine équipée', 'Dressing', 'Terrasse'],
    'villa',
    (SELECT id FROM agents WHERE email = 'marie.kabila@youpendimmoselect.com')
),
(
    'Appartement Standing Bandalungwa',
    180000,
    'Bandalungwa, Kinshasa',
    -4.3803,
    15.2736,
    3,
    2,
    150,
    1,
    ARRAY[
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    'Appartement de standing dans une résidence moderne et sécurisée. Parfait pour une famille cherchant le confort et la commodité.',
    ARRAY['Balcon panoramique', 'Ascenseur', 'Climatisation', 'Parking sécurisé', 'Concierge', 'Cuisine américaine', 'Placards intégrés'],
    'apartment',
    (SELECT id FROM agents WHERE email = 'marie.kabila@youpendimmoselect.com')
),
(
    'Maison Familiale Lemba',
    250000,
    'Lemba, Kinshasa',
    -4.4022,
    15.2872,
    5,
    3,
    220,
    2,
    ARRAY[
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    'Grande maison familiale avec de nombreux espaces de vie. Idéale pour une grande famille cherchant espace et tranquillité.',
    ARRAY['Grand jardin', 'Terrasse couverte', 'Garage', 'Cave', 'Buanderie', 'Bureau', 'Cheminée', 'Portail électrique'],
    'house',
    (SELECT id FROM agents WHERE email = 'marie.kabila@youpendimmoselect.com')
),
(
    'Villa de Luxe Ngaliema',
    450000,
    'Ngaliema, Kinshasa',
    -4.3667,
    15.2639,
    6,
    4,
    350,
    3,
    ARRAY[
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    'Villa de prestige dans un quartier résidentiel huppé. Luxe, confort et élégance pour un art de vivre exceptionnel.',
    ARRAY['Piscine à débordement', 'Jardin tropical', 'Home cinéma', 'Wine cave', 'Spa privé', 'Garage triple', 'Bureau', 'Suite parentale', 'Sécurité renforcée'],
    'villa',
    (SELECT id FROM agents WHERE email = 'marie.kabila@youpendimmoselect.com')
),
(
    'Terrain Résidentiel Kasavubu',
    75000,
    'Kasavubu, Kinshasa',
    -4.3583,
    15.3139,
    0,
    0,
    800,
    0,
    ARRAY[
        'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    'Terrain résidentiel bien situé, parfait pour la construction d''une propriété sur mesure. Zone en développement avec tous les services.',
    ARRAY['Titre foncier', 'Électricité disponible', 'Eau courante', 'Évacuation', 'Zone résidentielle', 'Transport accessible'],
    'land',
    (SELECT id FROM agents WHERE email = 'marie.kabila@youpendimmoselect.com')
);
