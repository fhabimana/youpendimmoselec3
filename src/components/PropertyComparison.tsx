import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Scale,
  X,
  Bed,
  Bath,
  Square,
  Car,
  MapPin,
  Check,
  Minus,
} from "lucide-react";

interface Property {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  location: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  areaValue: number;
  parking: number;
  features: string[];
  yearBuilt?: number;
  energyClass?: string;
}

const PropertyComparison = () => {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);

  // Propriétés d'exemple pour la comparaison
  const availableProperties: Property[] = [
    {
      id: "1",
      title: "Villa Moderne Gombe",
      price: "$320.000",
      priceValue: 320000,
      location: "Gombe, Kinshasa",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bedrooms: 4,
      bathrooms: 3,
      area: "280 m²",
      areaValue: 280,
      parking: 2,
      features: [
        "Piscine",
        "Jardin",
        "Climatisation",
        "Sécurité 24h",
        "Garage",
      ],
      yearBuilt: 2020,
      energyClass: "A",
    },
    {
      id: "2",
      title: "Appartement Standing",
      price: "$180.000",
      priceValue: 180000,
      location: "Bandalungwa, Kinshasa",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bedrooms: 3,
      bathrooms: 2,
      area: "150 m²",
      areaValue: 150,
      parking: 1,
      features: ["Balcon", "Ascenseur", "Climatisation", "Sécurité"],
      yearBuilt: 2018,
      energyClass: "B",
    },
    {
      id: "3",
      title: "Maison Familiale",
      price: "$250.000",
      priceValue: 250000,
      location: "Lemba, Kinshasa",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bedrooms: 5,
      bathrooms: 3,
      area: "220 m²",
      areaValue: 220,
      parking: 2,
      features: ["Jardin", "Terrasse", "Garage", "Cave"],
      yearBuilt: 2015,
      energyClass: "C",
    },
  ];

  const togglePropertySelection = (property: Property) => {
    if (selectedProperties.find((p) => p.id === property.id)) {
      setSelectedProperties((prev) => prev.filter((p) => p.id !== property.id));
    } else if (selectedProperties.length < 3) {
      setSelectedProperties((prev) => [...prev, property]);
    }
  };

  const removeProperty = (propertyId: string) => {
    setSelectedProperties((prev) => prev.filter((p) => p.id !== propertyId));
  };

  const allFeatures = Array.from(
    new Set(selectedProperties.flatMap((p) => p.features)),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-brand-blue" />
          Comparaison de Propriétés
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sélection des propriétés */}
        <div className="space-y-4">
          <h3 className="font-medium">
            Sélectionnez jusqu'à 3 propriétés à comparer (
            {selectedProperties.length}/3)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availableProperties.map((property) => {
              const isSelected = selectedProperties.find(
                (p) => p.id === property.id,
              );
              const canSelect = selectedProperties.length < 3 || isSelected;

              return (
                <div
                  key={property.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-all ${
                    isSelected
                      ? "border-brand-blue bg-brand-blue/5"
                      : canSelect
                        ? "border-gray-200 hover:border-brand-blue"
                        : "border-gray-100 opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => canSelect && togglePropertySelection(property)}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={!!isSelected}
                      disabled={!canSelect}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <h4 className="font-medium text-sm truncate">
                        {property.title}
                      </h4>
                      <p className="text-brand-blue font-semibold">
                        {property.price}
                      </p>
                      <p className="text-gray-600 text-xs">
                        {property.location}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tableau de comparaison */}
        {selectedProperties.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">Comparaison détaillée</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Critères</th>
                    {selectedProperties.map((property) => (
                      <th
                        key={property.id}
                        className="text-center p-3 min-w-[200px]"
                      >
                        <div className="space-y-2">
                          <img
                            src={property.image}
                            alt={property.title}
                            className="w-full h-20 object-cover rounded"
                          />
                          <div className="text-sm font-medium">
                            {property.title}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProperty(property.id)}
                            className="p-1 h-6 w-6"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Prix */}
                  <tr className="border-b">
                    <td className="p-3 font-medium">Prix</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        <span className="font-semibold text-brand-blue text-lg">
                          {property.price}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Localisation */}
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-medium">Localisation</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        <div className="flex items-center justify-center gap-1 text-sm">
                          <MapPin className="w-3 h-3" />
                          {property.location}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Chambres */}
                  <tr className="border-b">
                    <td className="p-3 font-medium">Chambres</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        <div className="flex items-center justify-center gap-1">
                          <Bed className="w-4 h-4" />
                          {property.bedrooms}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Salles de bain */}
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-medium">Salles de bain</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        <div className="flex items-center justify-center gap-1">
                          <Bath className="w-4 h-4" />
                          {property.bathrooms}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Surface */}
                  <tr className="border-b">
                    <td className="p-3 font-medium">Surface</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        <div className="flex items-center justify-center gap-1">
                          <Square className="w-4 h-4" />
                          {property.area}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Parking */}
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-medium">Parking</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        <div className="flex items-center justify-center gap-1">
                          <Car className="w-4 h-4" />
                          {property.parking} place
                          {property.parking > 1 ? "s" : ""}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Année de construction */}
                  <tr className="border-b">
                    <td className="p-3 font-medium">Année de construction</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        {property.yearBuilt || "-"}
                      </td>
                    ))}
                  </tr>

                  {/* Classe énergétique */}
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-medium">Classe énergétique</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        {property.energyClass && (
                          <Badge variant="outline">
                            {property.energyClass}
                          </Badge>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Prix au m² */}
                  <tr className="border-b">
                    <td className="p-3 font-medium">Prix au m²</td>
                    {selectedProperties.map((property) => (
                      <td key={property.id} className="text-center p-3">
                        <span className="font-medium">
                          $
                          {Math.round(
                            property.priceValue / property.areaValue,
                          ).toLocaleString()}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Équipements */}
                  {allFeatures.map((feature) => (
                    <tr key={feature} className="border-b bg-gray-50">
                      <td className="p-3 font-medium">{feature}</td>
                      {selectedProperties.map((property) => (
                        <td key={property.id} className="text-center p-3">
                          {property.features.includes(feature) ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <Minus className="w-5 h-5 text-gray-400 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedProperties.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Sélectionnez des propriétés pour commencer la comparaison
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyComparison;
