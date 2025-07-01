import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const SearchForm = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Mot-clé</label>
          <Input
            placeholder="Tapez un mot-clé..."
            className="border-gray-200 focus:border-brand-blue"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Ville</label>
          <Input
            placeholder="Sélectionnez une ville..."
            className="border-gray-200 focus:border-brand-blue"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Type</label>
          <Select>
            <SelectTrigger className="border-gray-200 focus:border-brand-blue">
              <SelectValue placeholder="Type de bien..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous types</SelectItem>
              <SelectItem value="maison">Maisons</SelectItem>
              <SelectItem value="terrain">Terrains</SelectItem>
              <SelectItem value="appartement">Appartements</SelectItem>
              <SelectItem value="villa">Villas</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Prix min</label>
          <Input
            placeholder="Prix minimum..."
            className="border-gray-200 focus:border-brand-blue"
          />
        </div>

        <div className="flex items-end">
          <Button
            className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold py-3"
            size="lg"
          >
            <Search className="w-4 h-4 mr-2" />
            Rechercher
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
