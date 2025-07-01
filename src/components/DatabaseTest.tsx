import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PropertyService } from "@/services/propertyService";
import { AgentService } from "@/services/agentService";
import { useAuth } from "@/hooks/useAuth";
import { Database, Users, Home, CheckCircle, XCircle } from "lucide-react";

const DatabaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<
    "testing" | "connected" | "error"
  >("testing");
  const [propertiesCount, setPropertiesCount] = useState<number>(0);
  const [agentsCount, setAgentsCount] = useState<number>(0);
  const { user } = useAuth();

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setConnectionStatus("testing");

      // Test des propriétés
      const properties = await PropertyService.getAllProperties();
      setPropertiesCount(properties.length);

      // Test des agents
      const agents = await AgentService.getAllAgents();
      setAgentsCount(agents.length);

      setConnectionStatus("connected");
    } catch (error) {
      console.error("Erreur de connexion à la base de données:", error);
      setConnectionStatus("error");
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "success";
      case "error":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case "connected":
        return "Connecté";
      case "error":
        return "Erreur";
      default:
        return "Test en cours...";
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          État de la Base de Données
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Statut de connexion */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Connexion Supabase:</span>
          <Badge
            variant={getStatusColor() as any}
            className="flex items-center gap-1"
          >
            {connectionStatus === "connected" ? (
              <CheckCircle className="w-3 h-3" />
            ) : connectionStatus === "error" ? (
              <XCircle className="w-3 h-3" />
            ) : (
              <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin" />
            )}
            {getStatusText()}
          </Badge>
        </div>

        {/* Authentification */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Utilisateur:</span>
          <Badge
            variant={user ? "default" : "outline"}
            className="flex items-center gap-1"
          >
            <Users className="w-3 h-3" />
            {user ? "Connecté" : "Non connecté"}
          </Badge>
        </div>

        {/* Données chargées */}
        {connectionStatus === "connected" && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Propriétés:</span>
              <Badge variant="outline" className="flex items-center gap-1">
                <Home className="w-3 h-3" />
                {propertiesCount}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Agents:</span>
              <Badge variant="outline" className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {agentsCount}
              </Badge>
            </div>
          </>
        )}

        {/* Bouton de test */}
        <Button
          onClick={testConnection}
          disabled={connectionStatus === "testing"}
          className="w-full"
          variant="outline"
        >
          {connectionStatus === "testing" ? "Test en cours..." : "Retester"}
        </Button>

        {/* Message d'erreur */}
        {connectionStatus === "error" && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
            ❌ Erreur de connexion. Vérifiez la configuration Supabase dans le
            fichier .env
          </div>
        )}

        {/* Message de succès */}
        {connectionStatus === "connected" && (
          <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
            ✅ Base de données connectée et fonctionnelle !
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DatabaseTest;
