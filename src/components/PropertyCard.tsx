import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import PropertyLocationModal from "./PropertyLocationModal";

interface PropertyCardProps {
  id: string;
  image: string;
  price: string;
  title: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  location?: string;
  latitude?: number;
  longitude?: number;
}

const PropertyCard = ({
  id,
  image,
  price,
  title,
  bedrooms,
  bathrooms,
  area,
  location,
  latitude,
  longitude,
}: PropertyCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-brand-green text-white">
          À vendre
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-brand-blue transition-colors">
              {title}
            </h3>
            <span className="font-bold text-xl text-brand-blue">{price}</span>
          </div>

          {location && <p className="text-gray-600 text-sm">{location}</p>}

          <div className="flex items-center space-x-4 text-gray-600 text-sm">
            <div className="flex items-center space-x-1">
              <Bed className="w-4 h-4" />
              <span>{bedrooms} chambres</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath className="w-4 h-4" />
              <span>{bathrooms} salles de bain</span>
            </div>
            <div className="flex items-center space-x-1">
              <Square className="w-4 h-4" />
              <span>{area}</span>
            </div>
          </div>

          {/* Bouton de géolocalisation */}
          {latitude && longitude && location && (
            <div className="pt-3 border-t">
              <PropertyLocationModal
                property={{
                  id,
                  title,
                  location,
                  latitude,
                  longitude,
                  price,
                }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-brand-blue border-brand-blue hover:bg-brand-blue hover:text-white"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Voir la localisation
                </Button>
              </PropertyLocationModal>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
