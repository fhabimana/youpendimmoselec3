<?php
/**
 * Classe pour gérer les réponses API
 */

class Response {
    
    public static function success($data = null, $message = null, $code = 200) {
        http_response_code($code);
        
        $response = [
            'success' => true,
            'code' => $code
        ];
        
        if ($message) {
            $response['message'] = $message;
        }
        
        if ($data !== null) {
            $response['data'] = $data;
        }
        
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    public static function error($message, $code = 400, $details = null) {
        http_response_code($code);
        
        $response = [
            'success' => false,
            'error' => [
                'message' => $message,
                'code' => $code
            ]
        ];
        
        if ($details) {
            $response['error']['details'] = $details;
        }
        
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    public static function paginated($data, $pagination, $message = null) {
        $response = [
            'success' => true,
            'data' => $data,
            'pagination' => $pagination
        ];
        
        if ($message) {
            $response['message'] = $message;
        }
        
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    public static function created($data, $message = 'Ressource créée avec succès') {
        self::success($data, $message, 201);
    }
    
    public static function updated($data, $message = 'Ressource mise à jour avec succès') {
        self::success($data, $message, 200);
    }
    
    public static function deleted($message = 'Ressource supprimée avec succès') {
        self::success(null, $message, 200);
    }
    
    public static function notFound($message = 'Ressource non trouvée') {
        self::error($message, 404);
    }
    
    public static function unauthorized($message = 'Non autorisé') {
        self::error($message, 401);
    }
    
    public static function forbidden($message = 'Accès interdit') {
        self::error($message, 403);
    }
    
    public static function badRequest($message = 'Requête invalide', $details = null) {
        self::error($message, 400, $details);
    }
    
    public static function validation($errors) {
        self::error('Erreurs de validation', 422, $errors);
    }
    
    public static function serverError($message = 'Erreur interne du serveur') {
        self::error($message, 500);
    }
}
