import { Button } from "@/components/ui/button";
import { Building, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const OwnerSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ESPACE PROPRIÉTAIRE
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Suivez le suivi de votre maison et gérez votre propriété
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-brand-blue" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Gestion Facilitée</h3>
            <p className="text-gray-600">
              Gérez vos propriétés en toute simplicité depuis votre tableau de
              bord personnalisé.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-brand-green" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Support Expert</h3>
            <p className="text-gray-600">
              Bénéficiez de l'accompagnement de nos experts immobiliers tout au
              long du processus.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-brand-blue" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Suivi en Temps Réel</h3>
            <p className="text-gray-600">
              Suivez l'évolution de vos biens et recevez des rapports détaillés
              sur les performances.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-3 text-lg font-semibold"
          >
            <Link to="/dashboard">Accéder au tableau de bord</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OwnerSection;
