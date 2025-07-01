import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Mail,
  Plus,
  X,
  MapPin,
  DollarSign,
  Home,
  Settings,
} from "lucide-react";

interface AlertCriteria {
  id: string;
  name: string;
  location: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  features: string[];
  frequency: "immediate" | "daily" | "weekly";
  isActive: boolean;
}

const EmailAlerts = () => {
  const [email, setEmail] = useState("");
  const [alerts, setAlerts] = useState<AlertCriteria[]>([
    {
      id: "1",
      name: "Villa Gombe",
      location: "Gombe",
      propertyType: "Villa",
      minPrice: 200000,
      maxPrice: 400000,
      minBedrooms: 3,
      features: ["Piscine", "Jardin"],
      frequency: "immediate",
      isActive: true,
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newAlert, setNewAlert] = useState<Partial<AlertCriteria>>({
    name: "",
    location: "",
    propertyType: "",
    minPrice: 50000,
    maxPrice: 500000,
    minBedrooms: 1,
    features: [],
    frequency: "daily",
    isActive: true,
  });

  const availableFeatures = [
    "Piscine",
    "Jardin",
    "Garage",
    "Climatisation",
    "Sécurité 24h",
    "Ascenseur",
    "Balcon",
    "Terrasse",
    "Cave",
    "Parking",
  ];

  const addAlert = () => {
    if (newAlert.name && newAlert.location) {
      const alert: AlertCriteria = {
        id: Date.now().toString(),
        name: newAlert.name!,
        location: newAlert.location!,
        propertyType: newAlert.propertyType || "Tous",
        minPrice: newAlert.minPrice || 50000,
        maxPrice: newAlert.maxPrice || 500000,
        minBedrooms: newAlert.minBedrooms || 1,
        features: newAlert.features || [],
        frequency: newAlert.frequency || "daily",
        isActive: true,
      };
      setAlerts((prev) => [...prev, alert]);
      setNewAlert({
        name: "",
        location: "",
        propertyType: "",
        minPrice: 50000,
        maxPrice: 500000,
        minBedrooms: 1,
        features: [],
        frequency: "daily",
        isActive: true,
      });
      setShowForm(false);
    }
  };

  const toggleAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert,
      ),
    );
  };

  const deleteAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
  };

  const toggleFeature = (feature: string) => {
    setNewAlert((prev) => ({
      ...prev,
      features: prev.features?.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...(prev.features || []), feature],
    }));
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case "immediate":
        return "Immédiat";
      case "daily":
        return "Quotidien";
      case "weekly":
        return "Hebdomadaire";
      default:
        return frequency;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-brand-blue" />
          Alertes Email
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Configuration Email */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Adresse email pour les alertes
          </Label>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configurer
            </Button>
          </div>
        </div>

        {/* Alertes existantes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Mes Alertes ({alerts.length})</h3>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-brand-blue hover:bg-brand-blue/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Alerte
            </Button>
          </div>

          {alerts.map((alert) => (
            <Card key={alert.id} className="border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{alert.name}</h4>
                      <Badge variant={alert.isActive ? "default" : "secondary"}>
                        {alert.isActive ? "Actif" : "Inactif"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {alert.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Home className="w-3 h-3" />
                        {alert.propertyType}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />$
                        {alert.minPrice.toLocaleString()} - $
                        {alert.maxPrice.toLocaleString()}
                      </div>
                      <div>{alert.minBedrooms}+ chambres</div>
                    </div>

                    {alert.features.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {alert.features.map((feature) => (
                          <Badge
                            key={feature}
                            variant="outline"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-gray-500">
                      Fréquence: {getFrequencyLabel(alert.frequency)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={alert.isActive}
                      onCheckedChange={() => toggleAlert(alert.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteAlert(alert.id)}
                      className="p-2 h-8 w-8 text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {alerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucune alerte configurée. Créez votre première alerte pour être
              notifié des nouvelles propriétés.
            </div>
          )}
        </div>

        {/* Formulaire de nouvelle alerte */}
        {showForm && (
          <Card className="border-brand-blue">
            <CardHeader>
              <CardTitle className="text-lg">Nouvelle Alerte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom de l'alerte</Label>
                  <Input
                    placeholder="Ex: Villa Gombe"
                    value={newAlert.name}
                    onChange={(e) =>
                      setNewAlert((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Localisation</Label>
                  <Select
                    onValueChange={(value) =>
                      setNewAlert((prev) => ({ ...prev, location: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un quartier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gombe">Gombe</SelectItem>
                      <SelectItem value="bandalungwa">Bandalungwa</SelectItem>
                      <SelectItem value="lemba">Lemba</SelectItem>
                      <SelectItem value="kintambo">Kintambo</SelectItem>
                      <SelectItem value="ngaliema">Ngaliema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Type de propriété</Label>
                  <Select
                    onValueChange={(value) =>
                      setNewAlert((prev) => ({ ...prev, propertyType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tous">Tous</SelectItem>
                      <SelectItem value="maison">Maisons</SelectItem>
                      <SelectItem value="terrain">Terrains</SelectItem>
                      <SelectItem value="appartement">Appartements</SelectItem>
                      <SelectItem value="villa">Villas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Fréquence des alertes</Label>
                  <Select
                    value={newAlert.frequency}
                    onValueChange={(value: "immediate" | "daily" | "weekly") =>
                      setNewAlert((prev) => ({ ...prev, frequency: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immédiat</SelectItem>
                      <SelectItem value="daily">Quotidien</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Prix minimum ($)</Label>
                  <Input
                    type="number"
                    value={newAlert.minPrice}
                    onChange={(e) =>
                      setNewAlert((prev) => ({
                        ...prev,
                        minPrice: Number(e.target.value),
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Prix maximum ($)</Label>
                  <Input
                    type="number"
                    value={newAlert.maxPrice}
                    onChange={(e) =>
                      setNewAlert((prev) => ({
                        ...prev,
                        maxPrice: Number(e.target.value),
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Chambres minimum</Label>
                  <Select
                    value={newAlert.minBedrooms?.toString()}
                    onValueChange={(value) =>
                      setNewAlert((prev) => ({
                        ...prev,
                        minBedrooms: Number(value),
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Équipements souhaités</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableFeatures.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={`new-${feature}`}
                        checked={newAlert.features?.includes(feature)}
                        onCheckedChange={() => toggleFeature(feature)}
                      />
                      <Label
                        htmlFor={`new-${feature}`}
                        className="text-sm cursor-pointer"
                      >
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={addAlert}
                  className="bg-brand-blue hover:bg-brand-blue/90"
                >
                  Créer l'Alerte
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailAlerts;
