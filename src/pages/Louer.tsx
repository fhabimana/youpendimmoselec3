import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdvancedSearchForm from "@/components/AdvancedSearchForm";
import PropertyGallery from "@/components/PropertyGallery";
import FinanceCalculator from "@/components/FinanceCalculator";
import VirtualTour from "@/components/VirtualTour";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Calculator,
  Eye,
  MapPin,
  Home,
  TrendingUp,
  Shield,
  Award,
  Users,
} from "lucide-react";

const Louer = () => {
  const [selectedCategory, setSelectedCategory] = useState("tous");

  const rentalCategories = [
    { id: "tous", label: "Tous", count: 120 },
    { id: "appartement", label: "Appartements", count: 45 },
    { id: "maison", label: "Maisons", count: 30 },
    { id: "villa", label: "Villas", count: 25 },
    { id: "studio", label: "Studios", count: 20 },
  ];

  const featuredRentals = [
    {
      id: 1,
      title: "Appartement Moderne Gombe",
      price: 800,
      location: "Gombe, Kinshasa",
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      type: "Appartement",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      features: ["Climatisé", "Meublé", "Parking", "Sécurité 24h"],
      available: "Immédiatement",
    },
    {
      id: 2,
      title: "Villa Spacieuse Ngaliema",
      price: 1500,
      location: "Ngaliema, Kinshasa",
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      type: "Villa",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
      features: ["Jardin", "Piscine", "Garage", "Cuisine équipée"],
      available: "15 Janvier 2024",
    },
    {
      id: 3,
      title: "Studio Moderne Lemba",
      price: 400,
      location: "Lemba, Kinshasa",
      bedrooms: 1,
      bathrooms: 1,
      area: 35,
      type: "Studio",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
      features: ["Meublé", "Internet", "Climatisé", "Transport proche"],
      available: "1er Février 2024",
    },
  ];

  const rentalStats = [
    {
      title: "Prix Moyen Location",
      value: "$650/mois",
      change: "+5%",
      icon: TrendingUp,
      color: "text-brand-green",
    },
    {
      title: "Propriétés Disponibles",
      value: "120+",
      change: "+15",
      icon: Home,
      color: "text-brand-blue",
    },
    {
      title: "Quartiers Couverts",
      value: "25",
      change: "+3",
      icon: MapPin,
      color: "text-purple-600",
    },
    {
      title: "Clients Satisfaits",
      value: "500+",
      change: "+50",
      icon: Users,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-blue to-brand-green text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Trouvez Votre Location Idéale
            </h1>
            <p className="text-xl mb-8">
              Découvrez notre sélection de propriétés en location à Kinshasa
              avec nos outils avancés de recherche et d'accompagnement
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="search" className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <TabsList className="grid w-full lg:w-auto grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="search" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Recherche
              </TabsTrigger>
              <TabsTrigger value="gallery" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Galerie
              </TabsTrigger>
              <TabsTrigger
                value="calculator"
                className="flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Calculs
              </TabsTrigger>
              <TabsTrigger value="tour" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Visite 360°
              </TabsTrigger>
            </TabsList>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {rentalCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? "bg-brand-blue hover:bg-brand-blue/90"
                      : ""
                  }
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {rentalStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                      </div>
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Onglet Recherche Avancée */}
          <TabsContent value="search" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <AdvancedSearchForm />
              </div>
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      Résultats de location
                    </h2>
                    <p className="text-gray-600">
                      {featuredRentals.length} propriétés disponibles en
                      location
                    </p>
                  </div>
                </div>

                {/* Featured Rentals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredRentals.map((property) => (
                    <Card key={property.id} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-48 object-cover"
                        />
                        <Badge className="absolute top-2 left-2 bg-brand-green">
                          À Louer
                        </Badge>
                        <Badge className="absolute top-2 right-2 bg-white text-gray-800">
                          {property.type}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2">
                          {property.title}
                        </h3>
                        <p className="text-2xl font-bold text-brand-blue mb-2">
                          ${property.price}/mois
                        </p>
                        <p className="text-gray-600 mb-3 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {property.location}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span>{property.bedrooms} ch.</span>
                          <span>{property.bathrooms} sdb</span>
                          <span>{property.area} m²</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {property.features.slice(0, 3).map((feature, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                          {property.features.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{property.features.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Disponible: {property.available}
                          </span>
                          <Button
                            size="sm"
                            className="bg-brand-blue hover:bg-brand-blue/90"
                          >
                            Visiter
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Onglet Galerie */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <div className="lg:w-80">
                  <AdvancedSearchForm />
                </div>
              </div>
              <div className="lg:col-span-3">
                <PropertyGallery />
              </div>
            </div>
          </TabsContent>

          {/* Onglet Calculatrice */}
          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Calculateur de Budget Location
                </h2>
                <p className="text-gray-600 mb-6">
                  Estimez votre budget mensuel pour la location en fonction de
                  vos revenus et de vos charges.
                </p>
                <FinanceCalculator />
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-brand-green" />
                      Conseils Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-brand-blue mb-2">
                        Règle des 30%
                      </h4>
                      <p className="text-sm text-gray-700">
                        Votre loyer ne devrait pas dépasser 30% de vos revenus
                        nets mensuels.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-brand-green mb-2">
                        Charges à prévoir
                      </h4>
                      <p className="text-sm text-gray-700">
                        N'oubliez pas les charges : électricité, eau, internet,
                        assurance...
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-600 mb-2">
                        Caution
                      </h4>
                      <p className="text-sm text-gray-700">
                        Prévoyez généralement 2-3 mois de caution pour sécuriser
                        votre location.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-orange-600" />
                      Pourquoi Nous Choisir
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-brand-blue rounded-full mt-2" />
                        <span className="text-sm">
                          Accompagnement personnalisé dans vos démarches
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-brand-green rounded-full mt-2" />
                        <span className="text-sm">
                          Vérification complète des propriétés
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                        <span className="text-sm">
                          Négociation des meilleurs prix
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2" />
                        <span className="text-sm">
                          Support après signature du bail
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Onglet Visite 360° */}
          <TabsContent value="tour" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Visites Virtuelles 360°
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explorez nos propriétés en location depuis chez vous grâce à nos
                visites virtuelles immersives en 360°.
              </p>
            </div>
            <VirtualTour />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Louer;
