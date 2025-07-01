import { useState } from "react";
import Header from "@/components/Header";
import AdvancedSearchForm from "@/components/AdvancedSearchForm";
import PropertyGallery from "@/components/PropertyGallery";
import FinanceCalculator from "@/components/FinanceCalculator";
import PropertyComparison from "@/components/PropertyComparison";
import EmailAlerts from "@/components/EmailAlerts";
import WhatsAppPopup from "@/components/WhatsAppPopup";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Calculator,
  Scale,
  Bell,
  Grid,
  List,
  Filter,
  SortAsc,
} from "lucide-react";

const Buy = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);

  // Données d'exemple des propriétés
  const properties = [
    {
      id: "1",
      title: "Villa Moderne Gombe",
      price: "$320.000",
      location: "Gombe, Kinshasa",
      latitude: -4.3194,
      longitude: 15.3074,
      bedrooms: 4,
      bathrooms: 3,
      area: "280 m²",
      parking: 2,
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      description:
        "Magnifique villa moderne située dans le prestigieux quartier de Gombe. Cette propriété de standing offre un cadre de vie exceptionnel avec des finitions haut de gamme.",
      features: [
        "Piscine privée",
        "Jardin paysager",
        "Garage double",
        "Climatisation centrale",
        "Sécurité 24h/24",
        "Cuisine équipée",
        "Dressing",
        "Terrasse",
      ],
      virtualTour: "https://example.com/tour360-1",
    },
    {
      id: "2",
      title: "Appartement Standing Bandalungwa",
      price: "$180.000",
      location: "Bandalungwa, Kinshasa",
      latitude: -4.3803,
      longitude: 15.2736,
      bedrooms: 3,
      bathrooms: 2,
      area: "150 m²",
      parking: 1,
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      description:
        "Appartement de standing dans une résidence moderne et sécurisée. Parfait pour une famille cherchant le confort et la commodité.",
      features: [
        "Balcon panoramique",
        "Ascenseur",
        "Climatisation",
        "Parking sécurisé",
        "Concierge",
        "Cuisine américaine",
        "Placards intégrés",
      ],
      virtualTour: "https://example.com/tour360-2",
    },
    {
      id: "3",
      title: "Maison Familiale Lemba",
      price: "$250.000",
      location: "Lemba, Kinshasa",
      latitude: -4.4022,
      longitude: 15.2872,
      bedrooms: 5,
      bathrooms: 3,
      area: "220 m²",
      parking: 2,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      description:
        "Grande maison familiale avec de nombreux espaces de vie. Idéale pour une grande famille cherchant espace et tranquillité.",
      features: [
        "Grand jardin",
        "Terrasse couverte",
        "Garage",
        "Cave",
        "Buanderie",
        "Bureau",
        "Cheminée",
        "Portail électrique",
      ],
    },
    {
      id: "4",
      title: "Duplex Moderne Kintambo",
      price: "$280.000",
      location: "Kintambo, Kinshasa",
      latitude: -4.3456,
      longitude: 15.2889,
      bedrooms: 4,
      bathrooms: 3,
      area: "200 m²",
      parking: 1,
      images: [
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      description:
        "Duplex contemporain avec des espaces ouverts et lumineux. Design moderne et finitions de qualité.",
      features: [
        "Double hauteur",
        "Mezzanine",
        "Baies vitrées",
        "Terrasse privée",
        "Climatisation",
        "Parking",
        "Cuisine ouverte",
      ],
      virtualTour: "https://example.com/tour360-4",
    },
    {
      id: "5",
      title: "Villa de Luxe Ngaliema",
      price: "$450.000",
      location: "Ngaliema, Kinshasa",
      latitude: -4.3667,
      longitude: 15.2639,
      bedrooms: 6,
      bathrooms: 4,
      area: "350 m²",
      parking: 3,
      images: [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      description:
        "Villa de prestige dans un quartier résidentiel huppé. Luxe, confort et élégance pour un art de vivre exceptionnel.",
      features: [
        "Piscine à débordement",
        "Jardin tropical",
        "Home cinéma",
        "Wine cave",
        "Spa privé",
        "Garage triple",
        "Bureau",
        "Suite parentale",
        "Sécurité renforcée",
      ],
      virtualTour: "https://example.com/tour360-5",
    },
    {
      id: "6",
      title: "Appartement Neuf Kasavubu",
      price: "$120.000",
      location: "Kasavubu, Kinshasa",
      latitude: -4.3583,
      longitude: 15.3139,
      bedrooms: 2,
      bathrooms: 1,
      area: "80 m²",
      parking: 1,
      images: [
        "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      description:
        "Appartement neuf dans une résidence moderne. Parfait pour un premier investissement ou un jeune couple.",
      features: [
        "Livraison immédiate",
        "Cuisine équipée",
        "Balcon",
        "Parking inclus",
        "Résidence sécurisée",
        "Proche transports",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-brand-blue text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Acheter une Propriété</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Découvrez notre sélection de propriétés premium à Kinshasa avec
              nos outils avancés de recherche et de financement
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="search" className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <TabsList className="grid w-full lg:w-auto grid-cols-2 lg:grid-cols-5">
              <TabsTrigger value="search" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Recherche
              </TabsTrigger>
              <TabsTrigger
                value="calculator"
                className="flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Financement
              </TabsTrigger>
              <TabsTrigger
                value="comparison"
                className="flex items-center gap-2"
              >
                <Scale className="w-4 h-4" />
                Comparaison
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Alertes
              </TabsTrigger>
              <TabsTrigger
                value="properties"
                className="flex items-center gap-2"
              >
                <Grid className="w-4 h-4" />
                Catalogue
              </TabsTrigger>
            </TabsList>

            {/* Controls pour la vue catalogue */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
              <div className="flex rounded-lg border">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Onglet Recherche Avancée */}
          <TabsContent value="search" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <AdvancedSearchForm />
              </div>
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                      Résultats de recherche
                    </h2>
                    <Badge variant="secondary">
                      {properties.length} propriétés
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {properties.slice(0, 4).map((property) => (
                      <PropertyGallery key={property.id} property={property} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Onglet Calculateur de Financement */}
          <TabsContent value="calculator">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Calculateur de Financement
                </h2>
                <p className="text-gray-600">
                  Simulez votre crédit immobilier et estimez vos mensualités
                </p>
              </div>
              <FinanceCalculator />
            </div>
          </TabsContent>

          {/* Onglet Comparaison */}
          <TabsContent value="comparison">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Comparaison de Propriétés
                </h2>
                <p className="text-gray-600">
                  Comparez jusqu'à 3 propriétés côte à côte pour faire le
                  meilleur choix
                </p>
              </div>
              <PropertyComparison />
            </div>
          </TabsContent>

          {/* Onglet Alertes Email */}
          <TabsContent value="alerts">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Alertes Email</h2>
                <p className="text-gray-600">
                  Soyez alerté en priorité des nouvelles propriétés
                  correspondant à vos critères
                </p>
              </div>
              <EmailAlerts />
            </div>
          </TabsContent>

          {/* Onglet Catalogue Complet */}
          <TabsContent value="properties">
            <div className="space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold">Toutes les Propriétés</h2>
                  <p className="text-gray-600">
                    {properties.length} propriétés disponibles
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <SortAsc className="w-4 h-4 mr-2" />
                    Trier par prix
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Plus de filtres
                  </Button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Filtres sidebar */}
                {showFilters && (
                  <div className="lg:w-80">
                    <AdvancedSearchForm />
                  </div>
                )}

                {/* Grille des propriétés */}
                <div className="flex-1">
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                        : "space-y-4"
                    }
                  >
                    {properties.map((property) => (
                      <PropertyGallery key={property.id} property={property} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" disabled>
                        Précédent
                      </Button>
                      <Button variant="default">1</Button>
                      <Button variant="outline">2</Button>
                      <Button variant="outline">3</Button>
                      <Button variant="outline">Suivant</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <WhatsAppPopup />
      <Footer />
    </div>
  );
};

export default Buy;
