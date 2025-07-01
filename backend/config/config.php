<?php
/**
 * Configuration principale de l'application
 */

// Configuration de la base de données
define('DB_HOST', $_ENV['DB_HOST'] ?? 'localhost');
define('DB_NAME', $_ENV['DB_NAME'] ?? 'youpendi_immo');
define('DB_USER', $_ENV['DB_USER'] ?? 'root');
define('DB_PASS', $_ENV['DB_PASS'] ?? '');

// Configuration JWT
define('JWT_SECRET', $_ENV['JWT_SECRET'] ?? 'votre_secret_jwt_tres_securise');
define('JWT_EXPIRE', $_ENV['JWT_EXPIRE'] ?? 86400); // 24 heures

// Configuration de l'application
define('APP_NAME', 'YOUPENDI IMMO SELECT');
define('APP_URL', $_ENV['APP_URL'] ?? 'http://localhost');
define('API_VERSION', 'v1');

// Configuration d'upload
define('UPLOAD_DIR', __DIR__ . '/../uploads/');
define('UPLOAD_URL', APP_URL . '/api/uploads/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'gif', 'webp']);

// Configuration email
define('SMTP_HOST', $_ENV['SMTP_HOST'] ?? 'smtp.gmail.com');
define('SMTP_PORT', $_ENV['SMTP_PORT'] ?? 587);
define('SMTP_USER', $_ENV['SMTP_USER'] ?? '');
define('SMTP_PASS', $_ENV['SMTP_PASS'] ?? '');
define('SMTP_FROM', $_ENV['SMTP_FROM'] ?? 'contact@youpendimmoselect.com');
define('SMTP_FROM_NAME', $_ENV['SMTP_FROM_NAME'] ?? 'YOUPENDI IMMO SELECT');

// Configuration de sécurité
define('BCRYPT_COST', 12);
define('MAX_LOGIN_ATTEMPTS', 5);
define('LOGIN_LOCKOUT_TIME', 900); // 15 minutes

// Types de propriétés autorisés
define('PROPERTY_TYPES', ['house', 'apartment', 'villa', 'land', 'commercial']);

// Statuts de propriétés autorisés
define('PROPERTY_STATUSES', ['available', 'sold', 'reserved']);

// Types d'utilisateurs autorisés
define('USER_TYPES', ['owner', 'agent', 'admin']);

// Provinces de la RDC
define('DRC_PROVINCES', [
    'Kinshasa',
    'Goma',
    'Bukavu',
    'Lubumbashi',
    'Beni',
    'Butembo',
    'Kisangani',
    'Mbuji-Mayi',
    'Kananga',
    'Matadi',
    'Mbandaka',
    'Bandundu'
]);

// Timezone
date_default_timezone_set('Africa/Kinshasa');

// Fonction d'autoload
spl_autoload_register(function ($class) {
    $paths = [
        __DIR__ . '/../classes/',
        __DIR__ . '/../controllers/',
        __DIR__ . '/../models/',
        __DIR__ . '/../services/'
    ];
    
    foreach ($paths as $path) {
        $file = $path . $class . '.php';
        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
});

// Créer le dossier d'upload s'il n'existe pas
if (!is_dir(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
    mkdir(UPLOAD_DIR . 'properties/', 0755, true);
    mkdir(UPLOAD_DIR . 'agents/', 0755, true);
    mkdir(UPLOAD_DIR . 'users/', 0755, true);
}
