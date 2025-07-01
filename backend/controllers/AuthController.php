<?php
/**
 * Contrôleur d'authentification
 */

class AuthController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function login($params) {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || !isset($input['email']) || !isset($input['password'])) {
            Response::badRequest('Email et mot de passe requis');
            return;
        }
        
        $email = Auth::sanitizeInput($input['email']);
        $password = $input['password'];
        
        if (!Auth::validateEmail($email)) {
            Response::badRequest('Format d\'email invalide');
            return;
        }
        
        // Vérifier les tentatives de connexion
        $this->checkLoginAttempts($email);
        
        // Rechercher l'utilisateur
        $user = $this->db->fetch(
            "SELECT * FROM users WHERE email = ? AND is_active = 1",
            [$email]
        );
        
        if (!$user || !Auth::verifyPassword($password, $user['password'])) {
            $this->recordFailedAttempt($email);
            Response::error('Email ou mot de passe incorrect', 401);
            return;
        }
        
        // Réinitialiser les tentatives échouées
        $this->resetFailedAttempts($email);
        
        // Générer le token JWT
        $payload = [
            'user_id' => $user['id'],
            'email' => $user['email'],
            'user_type' => $user['user_type'],
            'full_name' => $user['full_name']
        ];
        
        $token = Auth::generateJWT($payload);
        
        // Mettre à jour la dernière connexion
        $this->db->query(
            "UPDATE users SET last_login = NOW() WHERE id = ?",
            [$user['id']]
        );
        
        // Supprimer le mot de passe de la réponse
        unset($user['password']);
        
        Response::success([
            'user' => $user,
            'token' => $token,
            'expires_in' => JWT_EXPIRE
        ], 'Connexion réussie');
    }
    
    public function register($params) {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $required = ['email', 'password', 'full_name', 'user_type'];
        foreach ($required as $field) {
            if (!isset($input[$field]) || empty($input[$field])) {
                Response::badRequest("Le champ '$field' est requis");
                return;
            }
        }
        
        $email = Auth::sanitizeInput($input['email']);
        $password = $input['password'];
        $fullName = Auth::sanitizeInput($input['full_name']);
        $userType = Auth::sanitizeInput($input['user_type']);
        $phone = isset($input['phone']) ? Auth::sanitizeInput($input['phone']) : null;
        
        // Validations
        if (!Auth::validateEmail($email)) {
            Response::badRequest('Format d\'email invalide');
            return;
        }
        
        if (!Auth::validatePassword($password)) {
            Response::badRequest('Le mot de passe doit contenir au moins 8 caractères avec majuscule, minuscule et chiffre');
            return;
        }
        
        if (!in_array($userType, USER_TYPES)) {
            Response::badRequest('Type d\'utilisateur invalide');
            return;
        }
        
        // Vérifier si l'email existe déjà
        $existingUser = $this->db->fetch(
            "SELECT id FROM users WHERE email = ?",
            [$email]
        );
        
        if ($existingUser) {
            Response::badRequest('Cet email est déjà utilisé');
            return;
        }
        
        // Créer l'utilisateur
        $userId = Auth::generateUUID();
        $hashedPassword = Auth::hashPassword($password);
        
        try {
            $this->db->query(
                "INSERT INTO users (id, email, password, full_name, user_type, phone, created_at) 
                 VALUES (?, ?, ?, ?, ?, ?, NOW())",
                [$userId, $email, $hashedPassword, $fullName, $userType, $phone]
            );
            
            $user = $this->db->fetch(
                "SELECT id, email, full_name, user_type, phone, created_at FROM users WHERE id = ?",
                [$userId]
            );
            
            Response::created($user, 'Compte créé avec succès');
            
        } catch (Exception $e) {
            Response::serverError('Erreur lors de la création du compte');
        }
    }
    
    public function logout($params) {
        $user = Auth::requireAuth();
        
        // Dans une vraie application, on pourrait blacklister le token
        // Pour le moment, on confirme juste la déconnexion
        
        Response::success(null, 'Déconnexion réussie');
    }
    
    public function me($params) {
        $user = Auth::requireAuth();
        
        $userData = $this->db->fetch(
            "SELECT id, email, full_name, user_type, phone, created_at, last_login 
             FROM users WHERE id = ?",
            [$user['user_id']]
        );
        
        if (!$userData) {
            Response::notFound('Utilisateur non trouvé');
            return;
        }
        
        Response::success($userData);
    }
    
    public function forgotPassword($params) {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['email'])) {
            Response::badRequest('Email requis');
            return;
        }
        
        $email = Auth::sanitizeInput($input['email']);
        
        if (!Auth::validateEmail($email)) {
            Response::badRequest('Format d\'email invalide');
            return;
        }
        
        $user = $this->db->fetch(
            "SELECT id, full_name FROM users WHERE email = ? AND is_active = 1",
            [$email]
        );
        
        if (!$user) {
            // Pour des raisons de sécurité, on ne révèle pas si l'email existe
            Response::success(null, 'Si cet email existe, un lien de réinitialisation a été envoyé');
            return;
        }
        
        // Générer un token de réinitialisation
        $resetToken = Auth::generateResetToken();
        $expiresAt = date('Y-m-d H:i:s', time() + 3600); // 1 heure
        
        $this->db->query(
            "UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?",
            [$resetToken, $expiresAt, $user['id']]
        );
        
        // TODO: Envoyer l'email de réinitialisation
        $this->sendResetEmail($email, $user['full_name'], $resetToken);
        
        Response::success(null, 'Un lien de réinitialisation a été envoyé à votre email');
    }
    
    public function resetPassword($params) {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['token']) || !isset($input['password'])) {
            Response::badRequest('Token et nouveau mot de passe requis');
            return;
        }
        
        $token = $input['token'];
        $password = $input['password'];
        
        if (!Auth::validatePassword($password)) {
            Response::badRequest('Le mot de passe doit contenir au moins 8 caractères avec majuscule, minuscule et chiffre');
            return;
        }
        
        $user = $this->db->fetch(
            "SELECT id FROM users WHERE reset_token = ? AND reset_token_expires > NOW() AND is_active = 1",
            [$token]
        );
        
        if (!$user) {
            Response::badRequest('Token invalide ou expiré');
            return;
        }
        
        $hashedPassword = Auth::hashPassword($password);
        
        $this->db->query(
            "UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?",
            [$hashedPassword, $user['id']]
        );
        
        Response::success(null, 'Mot de passe réinitialisé avec succès');
    }
    
    private function checkLoginAttempts($email) {
        $attempts = $this->db->fetch(
            "SELECT failed_attempts, last_failed_attempt FROM login_attempts WHERE email = ?",
            [$email]
        );
        
        if ($attempts && $attempts['failed_attempts'] >= MAX_LOGIN_ATTEMPTS) {
            $lockoutEnd = strtotime($attempts['last_failed_attempt']) + LOGIN_LOCKOUT_TIME;
            if (time() < $lockoutEnd) {
                $remainingTime = ceil(($lockoutEnd - time()) / 60);
                Response::error("Trop de tentatives échouées. Réessayez dans $remainingTime minutes", 429);
                return;
            }
        }
    }
    
    private function recordFailedAttempt($email) {
        $this->db->query(
            "INSERT INTO login_attempts (email, failed_attempts, last_failed_attempt) 
             VALUES (?, 1, NOW()) 
             ON DUPLICATE KEY UPDATE 
             failed_attempts = failed_attempts + 1, 
             last_failed_attempt = NOW()",
            [$email]
        );
    }
    
    private function resetFailedAttempts($email) {
        $this->db->query(
            "DELETE FROM login_attempts WHERE email = ?",
            [$email]
        );
    }
    
    private function sendResetEmail($email, $name, $token) {
        // TODO: Implémenter l'envoi d'email
        // Utiliser PHPMailer ou une API comme SendGrid
        $resetLink = APP_URL . "/reset-password?token=" . $token;
        
        // Log pour le développement
        error_log("Reset password link for $email: $resetLink");
    }
}
