<?php
/**
 * Routeur simple pour l'API REST
 */

class Router {
    private $routes = [];

    public function add($method, $path, $handler) {
        $this->routes[] = [
            'method' => strtoupper($method),
            'path' => $path,
            'handler' => $handler
        ];
    }

    public function dispatch($method, $path) {
        $method = strtoupper($method);
        
        foreach ($this->routes as $route) {
            if ($route['method'] === $method && $this->matchPath($route['path'], $path)) {
                $params = $this->extractParams($route['path'], $path);
                $this->callHandler($route['handler'], $params);
                return;
            }
        }
        
        Response::error('Route non trouvée', 404);
    }

    private function matchPath($routePath, $requestPath) {
        // Convertir les paramètres {id} en expressions régulières
        $pattern = preg_replace('/\{([^}]+)\}/', '([^/]+)', $routePath);
        $pattern = '#^' . $pattern . '$#';
        
        return preg_match($pattern, $requestPath);
    }

    private function extractParams($routePath, $requestPath) {
        $params = [];
        
        // Extraire les noms des paramètres
        preg_match_all('/\{([^}]+)\}/', $routePath, $paramNames);
        
        // Extraire les valeurs des paramètres
        $pattern = preg_replace('/\{([^}]+)\}/', '([^/]+)', $routePath);
        $pattern = '#^' . $pattern . '$#';
        
        if (preg_match($pattern, $requestPath, $matches)) {
            array_shift($matches); // Supprimer le match complet
            
            for ($i = 0; $i < count($paramNames[1]); $i++) {
                if (isset($matches[$i])) {
                    $params[$paramNames[1][$i]] = $matches[$i];
                }
            }
        }
        
        return $params;
    }

    private function callHandler($handler, $params) {
        list($controller, $method) = explode('::', $handler);
        
        if (!class_exists($controller)) {
            Response::error('Contrôleur non trouvé: ' . $controller, 500);
            return;
        }
        
        $instance = new $controller();
        
        if (!method_exists($instance, $method)) {
            Response::error('Méthode non trouvée: ' . $method, 500);
            return;
        }
        
        // Ajouter les paramètres GET
        $allParams = array_merge($params, $_GET);
        
        call_user_func([$instance, $method], $allParams);
    }
}
