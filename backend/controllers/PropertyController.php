<?php
/**
 * Contrôleur des propriétés
 */

class PropertyController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function getAll($params) {
        $page = isset($params['page']) ? max(1, intval($params['page'])) : 1;
        $limit = isset($params['limit']) ? min(50, max(1, intval($params['limit']))) : 20;
        $offset = ($page - 1) * $limit;
        
        $status = isset($params['status']) ? Auth::sanitizeInput($params['status']) : 'available';
        
        if (!in_array($status, PROPERTY_STATUSES)) {
            $status = 'available';
        }
        
        // Compter le total
        $total = $this->db->fetch(
            "SELECT COUNT(*) as count FROM properties WHERE status = ?",
            [$status]
        )['count'];
        
        // Récupérer les propriétés avec les informations des agents
        $properties = $this->db->fetchAll(
            "SELECT p.*, a.name as agent_name, a.phone as agent_phone, a.email as agent_email 
             FROM properties p 
             LEFT JOIN agents a ON p.agent_id = a.id 
             WHERE p.status = ? 
             ORDER BY p.created_at DESC 
             LIMIT ? OFFSET ?",
            [$status, $limit, $offset]
        );
        
        // Traiter les données
        foreach ($properties as &$property) {
            $property['images'] = $property['images'] ? json_decode($property['images'], true) : [];
            $property['features'] = $property['features'] ? json_decode($property['features'], true) : [];
            $property['latitude'] = floatval($property['latitude']);
            $property['longitude'] = floatval($property['longitude']);
            $property['price'] = floatval($property['price']);
            $property['area'] = floatval($property['area']);
        }
        
        $pagination = [
            'page' => $page,
            'limit' => $limit,
            'total' => $total,
            'pages' => ceil($total / $limit)
        ];
        
        Response::paginated($properties, $pagination);
    }
    
    public function search($params) {
        $page = isset($params['page']) ? max(1, intval($params['page'])) : 1;
        $limit = isset($params['limit']) ? min(50, max(1, intval($params['limit']))) : 20;
        $offset = ($page - 1) * $limit;
        
        $whereConditions = ["p.status = 'available'"];
        $whereParams = [];
        
        // Filtres de recherche
        if (isset($params['location']) && !empty($params['location'])) {
            $whereConditions[] = "p.location LIKE ?";
            $whereParams[] = '%' . Auth::sanitizeInput($params['location']) . '%';
        }
        
        if (isset($params['property_type']) && in_array($params['property_type'], PROPERTY_TYPES)) {
            $whereConditions[] = "p.property_type = ?";
            $whereParams[] = $params['property_type'];
        }
        
        if (isset($params['min_price']) && is_numeric($params['min_price'])) {
            $whereConditions[] = "p.price >= ?";
            $whereParams[] = floatval($params['min_price']);
        }
        
        if (isset($params['max_price']) && is_numeric($params['max_price'])) {
            $whereConditions[] = "p.price <= ?";
            $whereParams[] = floatval($params['max_price']);
        }
        
        if (isset($params['bedrooms']) && is_numeric($params['bedrooms'])) {
            $whereConditions[] = "p.bedrooms >= ?";
            $whereParams[] = intval($params['bedrooms']);
        }
        
        if (isset($params['bathrooms']) && is_numeric($params['bathrooms'])) {
            $whereConditions[] = "p.bathrooms >= ?";
            $whereParams[] = intval($params['bathrooms']);
        }
        
        $whereClause = implode(' AND ', $whereConditions);
        
        // Compter le total
        $total = $this->db->fetch(
            "SELECT COUNT(*) as count FROM properties p WHERE $whereClause",
            $whereParams
        )['count'];
        
        // Récupérer les propriétés
        $properties = $this->db->fetchAll(
            "SELECT p.*, a.name as agent_name, a.phone as agent_phone, a.email as agent_email 
             FROM properties p 
             LEFT JOIN agents a ON p.agent_id = a.id 
             WHERE $whereClause 
             ORDER BY p.created_at DESC 
             LIMIT ? OFFSET ?",
            array_merge($whereParams, [$limit, $offset])
        );
        
        // Traiter les données
        foreach ($properties as &$property) {
            $property['images'] = $property['images'] ? json_decode($property['images'], true) : [];
            $property['features'] = $property['features'] ? json_decode($property['features'], true) : [];
            $property['latitude'] = floatval($property['latitude']);
            $property['longitude'] = floatval($property['longitude']);
            $property['price'] = floatval($property['price']);
            $property['area'] = floatval($property['area']);
        }
        
        $pagination = [
            'page' => $page,
            'limit' => $limit,
            'total' => $total,
            'pages' => ceil($total / $limit)
        ];
        
        Response::paginated($properties, $pagination);
    }
    
    public function getById($params) {
        if (!isset($params['id'])) {
            Response::badRequest('ID de propriété requis');
            return;
        }
        
        $property = $this->db->fetch(
            "SELECT p.*, a.name as agent_name, a.phone as agent_phone, a.email as agent_email, a.province as agent_province 
             FROM properties p 
             LEFT JOIN agents a ON p.agent_id = a.id 
             WHERE p.id = ?",
            [$params['id']]
        );
        
        if (!$property) {
            Response::notFound('Propriété non trouvée');
            return;
        }
        
        // Traiter les données
        $property['images'] = $property['images'] ? json_decode($property['images'], true) : [];
        $property['features'] = $property['features'] ? json_decode($property['features'], true) : [];
        $property['latitude'] = floatval($property['latitude']);
        $property['longitude'] = floatval($property['longitude']);
        $property['price'] = floatval($property['price']);
        $property['area'] = floatval($property['area']);
        
        Response::success($property);
    }
    
    public function create($params) {
        $user = Auth::requireRole(['agent', 'admin']);
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        $required = ['title', 'price', 'location', 'latitude', 'longitude', 'bedrooms', 'bathrooms', 'area', 'property_type'];
        foreach ($required as $field) {
            if (!isset($input[$field]) || ($input[$field] === '' && $input[$field] !== 0)) {
                Response::badRequest("Le champ '$field' est requis");
                return;
            }
        }
        
        // Validation des données
        if (!in_array($input['property_type'], PROPERTY_TYPES)) {
            Response::badRequest('Type de propriété invalide');
            return;
        }
        
        if (!is_numeric($input['price']) || $input['price'] < 0) {
            Response::badRequest('Prix invalide');
            return;
        }
        
        if (!is_numeric($input['latitude']) || !is_numeric($input['longitude'])) {
            Response::badRequest('Coordonnées GPS invalides');
            return;
        }
        
        $propertyId = Auth::generateUUID();
        $agentId = ($user['user_type'] === 'agent') ? $user['user_id'] : ($input['agent_id'] ?? null);
        
        $data = [
            'id' => $propertyId,
            'title' => Auth::sanitizeInput($input['title']),
            'price' => floatval($input['price']),
            'currency' => isset($input['currency']) ? Auth::sanitizeInput($input['currency']) : 'USD',
            'location' => Auth::sanitizeInput($input['location']),
            'latitude' => floatval($input['latitude']),
            'longitude' => floatval($input['longitude']),
            'bedrooms' => intval($input['bedrooms']),
            'bathrooms' => intval($input['bathrooms']),
            'area' => floatval($input['area']),
            'area_unit' => isset($input['area_unit']) ? Auth::sanitizeInput($input['area_unit']) : 'm²',
            'parking' => isset($input['parking']) ? intval($input['parking']) : 0,
            'description' => isset($input['description']) ? Auth::sanitizeInput($input['description']) : null,
            'property_type' => $input['property_type'],
            'agent_id' => $agentId,
            'images' => isset($input['images']) ? json_encode($input['images']) : '[]',
            'features' => isset($input['features']) ? json_encode($input['features']) : '[]',
            'virtual_tour' => isset($input['virtual_tour']) ? Auth::sanitizeInput($input['virtual_tour']) : null
        ];
        
        try {
            $this->db->query(
                "INSERT INTO properties (id, title, price, currency, location, latitude, longitude, bedrooms, bathrooms, area, area_unit, parking, description, property_type, agent_id, images, features, virtual_tour, created_at) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())",
                array_values($data)
            );
            
            $property = $this->db->fetch(
                "SELECT * FROM properties WHERE id = ?",
                [$propertyId]
            );
            
            // Traiter les données de retour
            $property['images'] = json_decode($property['images'], true);
            $property['features'] = json_decode($property['features'], true);
            
            Response::created($property, 'Propriété créée avec succès');
            
        } catch (Exception $e) {
            Response::serverError('Erreur lors de la création de la propriété');
        }
    }
    
    public function update($params) {
        $user = Auth::requireRole(['agent', 'admin']);
        
        if (!isset($params['id'])) {
            Response::badRequest('ID de propriété requis');
            return;
        }
        
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Vérifier que la propriété existe
        $existingProperty = $this->db->fetch(
            "SELECT * FROM properties WHERE id = ?",
            [$params['id']]
        );
        
        if (!$existingProperty) {
            Response::notFound('Propriété non trouvée');
            return;
        }
        
        // Vérifier les permissions
        if ($user['user_type'] === 'agent' && $existingProperty['agent_id'] !== $user['user_id']) {
            Response::forbidden('Vous ne pouvez modifier que vos propres propriétés');
            return;
        }
        
        $updateFields = [];
        $updateParams = [];
        
        // Champs modifiables
        $allowedFields = ['title', 'price', 'currency', 'location', 'latitude', 'longitude', 'bedrooms', 'bathrooms', 'area', 'area_unit', 'parking', 'description', 'property_type', 'status', 'images', 'features', 'virtual_tour'];
        
        foreach ($allowedFields as $field) {
            if (isset($input[$field])) {
                if ($field === 'property_type' && !in_array($input[$field], PROPERTY_TYPES)) {
                    Response::badRequest('Type de propriété invalide');
                    return;
                }
                
                if ($field === 'status' && !in_array($input[$field], PROPERTY_STATUSES)) {
                    Response::badRequest('Statut invalide');
                    return;
                }
                
                if (in_array($field, ['images', 'features'])) {
                    $updateFields[] = "$field = ?";
                    $updateParams[] = json_encode($input[$field]);
                } else {
                    $updateFields[] = "$field = ?";
                    $updateParams[] = Auth::sanitizeInput($input[$field]);
                }
            }
        }
        
        if (empty($updateFields)) {
            Response::badRequest('Aucune donnée à mettre à jour');
            return;
        }
        
        $updateFields[] = "updated_at = NOW()";
        $updateParams[] = $params['id'];
        
        try {
            $this->db->query(
                "UPDATE properties SET " . implode(', ', $updateFields) . " WHERE id = ?",
                $updateParams
            );
            
            $property = $this->db->fetch(
                "SELECT * FROM properties WHERE id = ?",
                [$params['id']]
            );
            
            // Traiter les données de retour
            $property['images'] = json_decode($property['images'], true);
            $property['features'] = json_decode($property['features'], true);
            
            Response::updated($property, 'Propriété mise à jour avec succès');
            
        } catch (Exception $e) {
            Response::serverError('Erreur lors de la mise à jour de la propriété');
        }
    }
    
    public function delete($params) {
        $user = Auth::requireRole(['agent', 'admin']);
        
        if (!isset($params['id'])) {
            Response::badRequest('ID de propriété requis');
            return;
        }
        
        $property = $this->db->fetch(
            "SELECT * FROM properties WHERE id = ?",
            [$params['id']]
        );
        
        if (!$property) {
            Response::notFound('Propriété non trouvée');
            return;
        }
        
        // Vérifier les permissions
        if ($user['user_type'] === 'agent' && $property['agent_id'] !== $user['user_id']) {
            Response::forbidden('Vous ne pouvez supprimer que vos propres propriétés');
            return;
        }
        
        try {
            $this->db->query(
                "DELETE FROM properties WHERE id = ?",
                [$params['id']]
            );
            
            Response::deleted('Propriété supprimée avec succès');
            
        } catch (Exception $e) {
            Response::serverError('Erreur lors de la suppression de la propriété');
        }
    }
    
    public function uploadSingleImage($params) {
        Auth::requireRole(['agent', 'admin']);
        
        if (!isset($_FILES['image'])) {
            Response::badRequest('Aucun fichier uploadé');
            return;
        }
        
        $uploadResult = $this->handleImageUpload($_FILES['image'], 'properties');
        
        if ($uploadResult['success']) {
            Response::success(['url' => $uploadResult['url']], 'Image uploadée avec succès');
        } else {
            Response::badRequest($uploadResult['error']);
        }
    }
    
    public function uploadMultipleImages($params) {
        Auth::requireRole(['agent', 'admin']);
        
        if (!isset($_FILES['images'])) {
            Response::badRequest('Aucun fichier uploadé');
            return;
        }
        
        $urls = [];
        $errors = [];
        
        $files = $_FILES['images'];
        $fileCount = count($files['name']);
        
        for ($i = 0; $i < $fileCount; $i++) {
            $file = [
                'name' => $files['name'][$i],
                'type' => $files['type'][$i],
                'tmp_name' => $files['tmp_name'][$i],
                'error' => $files['error'][$i],
                'size' => $files['size'][$i]
            ];
            
            $uploadResult = $this->handleImageUpload($file, 'properties');
            
            if ($uploadResult['success']) {
                $urls[] = $uploadResult['url'];
            } else {
                $errors[] = $uploadResult['error'];
            }
        }
        
        if (!empty($urls)) {
            Response::success([
                'urls' => $urls,
                'errors' => $errors
            ], count($urls) . ' image(s) uploadée(s) avec succès');
        } else {
            Response::badRequest('Aucune image n\'a pu être uploadée', $errors);
        }
    }
    
    private function handleImageUpload($file, $folder) {
        if ($file['error'] !== UPLOAD_ERR_OK) {
            return ['success' => false, 'error' => 'Erreur lors de l\'upload'];
        }
        
        if ($file['size'] > MAX_FILE_SIZE) {
            return ['success' => false, 'error' => 'Fichier trop volumineux'];
        }
        
        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($extension, ALLOWED_EXTENSIONS)) {
            return ['success' => false, 'error' => 'Type de fichier non autorisé'];
        }
        
        $filename = uniqid() . '.' . $extension;
        $uploadPath = UPLOAD_DIR . $folder . '/' . $filename;
        
        if (!is_dir(UPLOAD_DIR . $folder)) {
            mkdir(UPLOAD_DIR . $folder, 0755, true);
        }
        
        if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
            return [
                'success' => true,
                'url' => UPLOAD_URL . $folder . '/' . $filename
            ];
        } else {
            return ['success' => false, 'error' => 'Erreur lors de la sauvegarde'];
        }
    }
}
