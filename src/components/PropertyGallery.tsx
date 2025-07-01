import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PropertyLocationModal from "./PropertyLocationModal";
import {
  Heart,
  Share2,
  Eye,
  Camera,
  Video,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
} from "lucide-react";

interface PropertyGalleryProps {
  property: {
    id: string;
    title: string;
    price: string;
    location: string;
    latitude?: number;
    longitude?: number;
    bedrooms: number;
    bathrooms: number;
    area: string;
    parking: number;
    images: string[];
    description: string;
    features: string[];
    virtualTour?: string;
  };
}

const PropertyGallery = ({ property }: PropertyGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1,
    );
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <div className="relative">
        {/* Image principale */}
        <div className="relative h-64 overflow-hidden rounded-t-lg">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Navigation des images */}
          {property.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 h-8 w-8"
                onClick={prevImage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 h-8 w-8"
                onClick={nextImage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-brand-green text-white">À vendre</Badge>
            {property.virtualTour && (
              <Badge variant="secondary" className="bg-blue-500 text-white">
                <Video className="w-3 h-3 mr-1" />
                360°
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/90 hover:bg-white p-2 h-8 w-8"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/90 hover:bg-white p-2 h-8 w-8"
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </Button>
          </div>

          {/* Compteur d'images */}
          <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
            <Camera className="w-3 h-3" />
            {currentImageIndex + 1}/{property.images.length}
          </div>
        </div>

        {/* Galerie d'aperçu */}
        {property.images.length > 1 && (
          <div className="flex gap-1 p-2 bg-gray-50">
            {property.images.slice(0, 4).map((image, index) => (
              <button
                key={index}
                className={`relative flex-1 h-12 rounded overflow-hidden ${
                  index === currentImageIndex ? "ring-2 ring-brand-blue" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`Vue ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {index === 3 && property.images.length > 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-medium">
                    +{property.images.length - 4}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Prix et titre */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-brand-blue transition-colors">
                {property.title}
              </h3>
              <p className="text-gray-600 text-sm flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {property.location}
              </p>
            </div>
            <span className="font-bold text-xl text-brand-blue">
              {property.price}
            </span>
          </div>

          {/* Caractéristiques */}
          <div className="flex items-center gap-4 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span>{property.area}</span>
            </div>
            {property.parking > 0 && (
              <div className="flex items-center gap-1">
                <Car className="w-4 h-4" />
                <span>{property.parking}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Voir détails
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold">{property.title}</h2>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {property.location}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {property.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Vue ${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                    ))}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">{property.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Caractéristiques</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-brand-blue rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Bouton de géolocalisation */}
            {property.latitude && property.longitude && (
              <PropertyLocationModal
                property={{
                  id: property.id,
                  title: property.title,
                  location: property.location,
                  latitude: property.latitude,
                  longitude: property.longitude,
                  price: property.price,
                }}
              >
                <Button variant="outline" className="flex-1">
                  <MapPin className="w-4 h-4 mr-2" />
                  Localisation
                </Button>
              </PropertyLocationModal>
            )}

            {property.virtualTour && (
              <Button className="bg-brand-blue hover:bg-brand-blue/90">
                <Video className="w-4 h-4 mr-2" />
                Visite 360°
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyGallery;
