import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Play,
  Pause,
} from "lucide-react";

const VirtualTour = () => {
  const [selectedTour, setSelectedTour] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const virtualTours = [
    {
      id: 1,
      title: "Villa Moderne Ngaliema",
      location: "Ngaliema, Kinshasa",
      price: "$250,000",
      thumbnail:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
      tourUrl: "https://example.com/tour360-1",
      type: "Villa",
      rooms: 4,
      description:
        "Découvrez cette magnifique villa avec vue panoramique sur le fleuve Congo",
    },
    {
      id: 2,
      title: "Appartement Luxe Gombe",
      location: "Gombe, Kinshasa",
      price: "$180,000",
      thumbnail:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      tourUrl: "https://example.com/tour360-2",
      type: "Appartement",
      rooms: 3,
      description:
        "Appartement haut de gamme au cœur du quartier d'affaires de Kinshasa",
    },
    {
      id: 3,
      title: "Maison Familiale Lemba",
      location: "Lemba, Kinshasa",
      price: "$120,000",
      thumbnail:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
      tourUrl: "https://example.com/tour360-3",
      type: "Maison",
      rooms: 5,
      description:
        "Spacieuse maison familiale dans un quartier résidentiel calme",
    },
  ];

  const handleTourSelect = (index: number) => {
    setSelectedTour(index);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const selectedProperty = virtualTours[selectedTour];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Visites Virtuelles 360°</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explorez nos propriétés depuis chez vous grâce à nos visites
          virtuelles immersives en 360°. Une expérience unique pour découvrir
          chaque détail de votre futur bien.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des visites disponibles */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Visites Disponibles</h3>
          {virtualTours.map((tour, index) => (
            <Card
              key={tour.id}
              className={`cursor-pointer transition-all duration-200 ${
                selectedTour === index
                  ? "ring-2 ring-brand-blue bg-blue-50"
                  : "hover:shadow-md"
              }`}
              onClick={() => handleTourSelect(index)}
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <img
                    src={tour.thumbnail}
                    alt={tour.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{tour.title}</h4>
                    <p className="text-xs text-gray-600 mb-1">
                      {tour.location}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {tour.type}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {tour.rooms} pièces
                      </span>
                    </div>
                    <p className="text-sm font-bold text-brand-blue mt-1">
                      {tour.price}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Visualiseur de visite virtuelle */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-brand-blue" />
                  {selectedProperty.title}
                </CardTitle>
                <Badge className="bg-brand-green text-white">Visite 360°</Badge>
              </div>
              <p className="text-gray-600">{selectedProperty.description}</p>
            </CardHeader>
            <CardContent>
              {/* Zone de visualisation 360° */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
                <div
                  className="w-full h-96 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${selectedProperty.thumbnail})`,
                  }}
                >
                  {/* Overlay avec contrôles */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <Eye className="w-10 h-10" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Visite Virtuelle 360°
                      </h3>
                      <p className="text-sm opacity-90 mb-4">
                        Cliquez pour démarrer l'exploration immersive
                      </p>
                      <Button
                        className="bg-brand-blue hover:bg-brand-blue/90"
                        onClick={togglePlay}
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4 mr-2" />
                        ) : (
                          <Play className="w-4 h-4 mr-2" />
                        )}
                        {isPlaying ? "Pause" : "Démarrer la Visite"}
                      </Button>
                    </div>
                  </div>

                  {/* Indicateurs de points d'intérêt */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white text-gray-800">
                      Salon Principal
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-white text-gray-800">Vue Jardin</Badge>
                  </div>
                </div>
              </div>

              {/* Contrôles de navigation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <RotateCw className="w-4 h-4 mr-1" />
                    Rotation
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomIn className="w-4 h-4 mr-1" />
                    Zoom +
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomOut className="w-4 h-4 mr-1" />
                    Zoom -
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Maximize className="w-4 h-4 mr-1" />
                    Plein Écran
                  </Button>
                  <Button
                    className="bg-brand-green hover:bg-brand-green/90"
                    size="sm"
                  >
                    Planifier Visite Réelle
                  </Button>
                </div>
              </div>

              {/* Informations supplémentaires */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Prix:</span>
                    <div className="font-semibold">
                      {selectedProperty.price}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <div className="font-semibold">{selectedProperty.type}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Localisation:</span>
                    <div className="font-semibold">
                      {selectedProperty.location}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Pièces:</span>
                    <div className="font-semibold">
                      {selectedProperty.rooms} pièces
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section d'aide */}
      <Card className="bg-blue-50">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">
              Comment Utiliser les Visites 360°
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Sélectionnez</h4>
                  <p className="text-gray-600">
                    Choisissez la propriété que vous souhaitez visiter
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Explorez</h4>
                  <p className="text-gray-600">
                    Utilisez votre souris pour naviguer en 360°
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Contactez</h4>
                  <p className="text-gray-600">
                    Planifiez une visite réelle si le bien vous intéresse
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VirtualTour;
