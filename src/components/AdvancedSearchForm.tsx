import { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, MapPin, Home, DollarSign } from "lucide-react";

const AdvancedSearchForm = () => {
  const [priceRange, setPriceRange] = useState([50000, 500000]);
  const [surfaceRange, setSurfaceRange] = useState([50, 500]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5 text-brand-blue" />
          Recherche Avancée
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Localisation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Quartier
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un quartier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gombe">Gombe</SelectItem>
                <SelectItem value="bandalungwa">Bandalungwa</SelectItem>
                <SelectItem value="lemba">Lemba</SelectItem>
                <SelectItem value="kintambo">Kintambo</SelectItem>
                <SelectItem value="ngaliema">Ngaliema</SelectItem>
                <SelectItem value="kasavubu">Kasavubu</SelectItem>
                <SelectItem value="barumbu">Barumbu</SelectItem>
                <SelectItem value="lingwala">Lingwala</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Ville</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une ville" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kinshasa">Kinshasa</SelectItem>
                <SelectItem value="lubumbashi">Lubumbashi</SelectItem>
                <SelectItem value="mbuji-mayi">Mbuji-Mayi</SelectItem>
                <SelectItem value="kananga">Kananga</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Type de propriété */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Type de Propriété
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: "maison", label: "Maisons" },
              { id: "terrain", label: "Terrains" },
              { id: "appartement", label: "Appartements" },
              { id: "villa", label: "Villas" },
              { id: "commercial", label: "Commercial" },
              { id: "bureau", label: "Bureaux" },
              { id: "studio", label: "Studios" },
              { id: "duplex", label: "Duplex" },
            ].map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox id={type.id} />
                <Label
                  htmlFor={type.id}
                  className="text-sm font-normal cursor-pointer"
                >
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Prix */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Fourchette de Prix ($)
          </Label>
          <div className="px-3">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000000}
              min={10000}
              step={10000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Surface */}
        <div className="space-y-4">
          <Label>Surface (m²)</Label>
          <div className="px-3">
            <Slider
              value={surfaceRange}
              onValueChange={setSurfaceRange}
              max={1000}
              min={20}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>{surfaceRange[0]} m²</span>
              <span>{surfaceRange[1]} m²</span>
            </div>
          </div>
        </div>

        {/* Caractéristiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Chambres</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Nombre" />
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

          <div className="space-y-2">
            <Label>Salles de bain</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Nombre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Parking</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Places" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Aucun</SelectItem>
                <SelectItem value="1">1 place</SelectItem>
                <SelectItem value="2">2 places</SelectItem>
                <SelectItem value="3">3+ places</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Options supplémentaires */}
        <div className="space-y-3">
          <Label>Options supplémentaires</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "Piscine",
              "Jardin",
              "Garage",
              "Climatisation",
              "Sécurité 24h",
              "Ascenseur",
              "Balcon",
              "Terrasse",
              "Cave",
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox id={option} />
                <Label
                  htmlFor={option}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton de recherche */}
        <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white py-3">
          <Search className="w-4 h-4 mr-2" />
          Rechercher les Propriétés
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdvancedSearchForm;
