import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Share2 } from "lucide-react";
import PropertyMap from "./PropertyMap";
import { useState } from "react";

interface PropertyLocationModalProps {
  property: {
    id: string;
    title: string;
    location: string;
    latitude: number;
    longitude: number;
    price: string;
  };
  children: React.ReactNode;
}

const PropertyLocationModal = ({
  property,
  children,
}: PropertyLocationModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${property.latitude},${property.longitude}`;
    window.open(url, "_blank");
  };

  const shareLocation = async () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${property.latitude},${property.longitude}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Localisation de ${property.title}`,
          text: `Voir la localisation de cette propriété : ${property.title}`,
          url: url,
        });
      } catch (error) {
        console.log("Erreur lors du partage:", error);
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(url);
        alert("Lien copié dans le presse-papiers!");
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(url);
      alert("Lien copié dans le presse-papiers!");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-blue" />
            Localisation de {property.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Informations de la propriété */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg">{property.title}</h3>
            <p className="text-gray-600 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {property.location}
            </p>
            <p className="font-bold text-brand-blue text-xl">
              {property.price}
            </p>
          </div>

          {/* Carte */}
          <div className="rounded-lg overflow-hidden border">
            <PropertyMap
              latitude={property.latitude}
              longitude={property.longitude}
              title={property.title}
              address={property.location}
              price={property.price}
              height="400px"
              zoom={16}
            />
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={openInGoogleMaps}
              className="flex-1 bg-brand-blue hover:bg-brand-blue/90"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Ouvrir dans Google Maps
            </Button>

            <Button
              onClick={shareLocation}
              variant="outline"
              className="flex-1"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Partager la localisation
            </Button>
          </div>

          {/* Coordonnées */}
          <div className="text-sm text-gray-500 text-center">
            Coordonnées: {property.latitude.toFixed(6)},{" "}
            {property.longitude.toFixed(6)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyLocationModal;
