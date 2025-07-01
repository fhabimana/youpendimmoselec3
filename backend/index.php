<?php
/**
 * YOUPENDI IMMO SELECT - Backend API
 * Point d'entrée principal de l'API
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Gestion des requêtes OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config/database.php';
require_once 'config/config.php';
require_once 'classes/Router.php';
require_once 'classes/Auth.php';
require_once 'classes/Response.php';

// Controllers
require_once 'controllers/PropertyController.php';
require_once 'controllers/AgentController.php';
require_once 'controllers/AuthController.php';
require_once 'controllers/ContactController.php';
require_once 'controllers/UserController.php';

try {
    $router = new Router();

    // Routes d'authentification
    $router->add('POST', '/auth/login', 'AuthController::login');
    $router->add('POST', '/auth/register', 'AuthController::register');
    $router->add('POST', '/auth/logout', 'AuthController::logout');
    $router->add('GET', '/auth/me', 'AuthController::me');
    $router->add('POST', '/auth/forgot-password', 'AuthController::forgotPassword');
    $router->add('POST', '/auth/reset-password', 'AuthController::resetPassword');

    // Routes des propriétés
    $router->add('GET', '/properties', 'PropertyController::getAll');
    $router->add('GET', '/properties/search', 'PropertyController::search');
    $router->add('GET', '/properties/{id}', 'PropertyController::getById');
    $router->add('POST', '/properties', 'PropertyController::create');
    $router->add('PUT', '/properties/{id}', 'PropertyController::update');
    $router->add('DELETE', '/properties/{id}', 'PropertyController::delete');
    $router->add('POST', '/properties/{id}/images', 'PropertyController::uploadImages');

    // Routes des agents
    $router->add('GET', '/agents', 'AgentController::getAll');
    $router->add('GET', '/agents/{id}', 'AgentController::getById');
    $router->add('GET', '/agents/province/{province}', 'AgentController::getByProvince');
    $router->add('POST', '/agents', 'AgentController::create');
    $router->add('PUT', '/agents/{id}', 'AgentController::update');
    $router->add('DELETE', '/agents/{id}', 'AgentController::delete');

    // Routes des utilisateurs
    $router->add('GET', '/users', 'UserController::getAll');
    $router->add('GET', '/users/{id}', 'UserController::getById');
    $router->add('PUT', '/users/{id}', 'UserController::update');
    $router->add('DELETE', '/users/{id}', 'UserController::delete');

    // Routes de contact
    $router->add('POST', '/contact', 'ContactController::createRequest');
    $router->add('GET', '/contact', 'ContactController::getAllRequests');
    $router->add('PUT', '/contact/{id}/status', 'ContactController::updateStatus');
    $router->add('POST', '/email-alerts', 'ContactController::createEmailAlert');
    $router->add('GET', '/email-alerts', 'ContactController::getEmailAlerts');
    $router->add('DELETE', '/email-alerts/{id}', 'ContactController::deleteEmailAlert');

    // Routes d'upload
    $router->add('POST', '/upload/image', 'PropertyController::uploadSingleImage');
    $router->add('POST', '/upload/images', 'PropertyController::uploadMultipleImages');

    // Traitement de la requête
    $method = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $path = str_replace('/api', '', $path); // Supprimer le préfixe /api si présent

    $router->dispatch($method, $path);

} catch (Exception $e) {
    Response::error('Erreur serveur: ' . $e->getMessage(), 500);
}
