import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  MapPin,
  DollarSign,
  Calendar,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Camera,
  Shield,
  TrendingUp,
} from "lucide-react";

const Location = () => {
  const [activeTab, setActiveTab] = useState("mettre");
  const [formData, setFormData] = useState({
    propertyType: "",
    title: "",
    description: "",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    features: [],
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  });

  const rentalSteps = [
    {
      title: "Évaluation Gratuite",
      description: "Notre expert évalue votre bien et fixe le loyer optimal",
      icon: TrendingUp,
      duration: "24h",
    },
    {
      title: "Mise en Ligne",
      description:
        "Votre propriété est mise en ligne avec photos professionnelles",
      icon: Camera,
      duration: "48h",
    },
    {
      title: "Recherche Locataires",
      description: "Nous trouvons et vérifions les locataires potentiels",
      icon: User,
      duration: "1-4 semaines",
    },
    {
      title: "Signature du Bail",
      description:
        "Accompagnement complet pour la signature et l'état des lieux",
      icon: FileText,
      duration: "1 jour",
    },
  ];

  const ourServices = [
    {
      title: "Gestion Locative Complète",
      description:
        "Nous nous occupons de tout : recherche de locataires, encaissement des loyers, gestion des réparations",
      price: "8% du loyer mensuel",
      features: [
        "Recherche locataires",
        "Encaissement loyers",
        "Gestion réparations",
        "Suivi administratif",
      ],
    },
    {
      title: "Mise en Location Simple",
      description:
        "Nous trouvons le locataire, vous gérez ensuite la relation locative",
      price: "1 mois de loyer",
      features: [
        "Évaluation gratuite",
        "Photos professionnelles",
        "Recherche locataires",
        "Signature bail",
      ],
    },
    {
      title: "Conseil et Évaluation",
      description:
        "Évaluation professionnelle de votre bien et conseils pour optimiser sa rentabilité",
      price: "Gratuit",
      features: [
        "Estimation loyer",
        "Conseils amélioration",
        "Analyse marché",
        "Recommandations",
      ],
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulaire soumis:", formData);
    alert("Votre demande a été envoyée ! Nous vous recontacterons sous 24h.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-green to-brand-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mettre Votre Bien en Location
            </h1>
            <p className="text-xl mb-8">
              Confiez-nous votre propriété et maximisez vos revenus locatifs
              avec notre expertise du marché kinois
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Évaluation Gratuite</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Photos Professionnelles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Gestion Complète</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full lg:w-auto grid-cols-1 lg:grid-cols-3">
            <TabsTrigger value="mettre" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Mettre en Location
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Nos Services
            </TabsTrigger>
            <TabsTrigger value="processus" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Notre Processus
            </TabsTrigger>
          </TabsList>

          {/* Onglet Mettre en Location */}
          <TabsContent value="mettre" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Formulaire de Mise en Location
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Home className="w-5 h-5" />
                        Informations sur le Bien
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Type de Propriété</Label>
                          <Select
                            value={formData.propertyType}
                            onValueChange={(value) =>
                              handleInputChange("propertyType", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez le type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="appartement">
                                Appartement
                              </SelectItem>
                              <SelectItem value="maison">Maison</SelectItem>
                              <SelectItem value="villa">Villa</SelectItem>
                              <SelectItem value="studio">Studio</SelectItem>
                              <SelectItem value="bureau">Bureau</SelectItem>
                              <SelectItem value="commercial">
                                Local Commercial
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Province/Localisation</Label>
                          <Select
                            value={formData.location}
                            onValueChange={(value) =>
                              handleInputChange("location", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez la province" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kinshasa">Kinshasa</SelectItem>
                              <SelectItem value="kongo-central">
                                Kongo Central
                              </SelectItem>
                              <SelectItem value="kwango">Kwango</SelectItem>
                              <SelectItem value="kwilu">Kwilu</SelectItem>
                              <SelectItem value="mai-ndombe">
                                Mai-Ndombe
                              </SelectItem>
                              <SelectItem value="kasai">Kasaï</SelectItem>
                              <SelectItem value="kasai-central">
                                Kasaï Central
                              </SelectItem>
                              <SelectItem value="kasai-oriental">
                                Kasaï Oriental
                              </SelectItem>
                              <SelectItem value="lomami">Lomami</SelectItem>
                              <SelectItem value="sankuru">Sankuru</SelectItem>
                              <SelectItem value="maniema">Maniema</SelectItem>
                              <SelectItem value="sud-kivu">Sud-Kivu</SelectItem>
                              <SelectItem value="nord-kivu">
                                Nord-Kivu
                              </SelectItem>
                              <SelectItem value="ituri">Ituri</SelectItem>
                              <SelectItem value="haut-uele">
                                Haut-Uélé
                              </SelectItem>
                              <SelectItem value="bas-uele">Bas-Uélé</SelectItem>
                              <SelectItem value="nord-ubangi">
                                Nord-Ubangi
                              </SelectItem>
                              <SelectItem value="sud-ubangi">
                                Sud-Ubangi
                              </SelectItem>
                              <SelectItem value="mongala">Mongala</SelectItem>
                              <SelectItem value="tshuapa">Tshuapa</SelectItem>
                              <SelectItem value="equateur">Équateur</SelectItem>
                              <SelectItem value="haut-katanga">
                                Haut-Katanga
                              </SelectItem>
                              <SelectItem value="lualaba">Lualaba</SelectItem>
                              <SelectItem value="kolwezi">Kolwezi</SelectItem>
                              <SelectItem value="haut-lomami">
                                Haut-Lomami
                              </SelectItem>
                              <SelectItem value="tanganyika">
                                Tanganyika
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Titre de l'Annonce</Label>
                        <Input
                          placeholder="Ex: Bel appartement moderne avec vue sur le fleuve..."
                          value={formData.title}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Décrivez votre bien en détail..."
                          rows={4}
                          value={formData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                        />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label>Prix/mois ($)</Label>
                          <Input
                            type="number"
                            placeholder="800"
                            value={formData.price}
                            onChange={(e) =>
                              handleInputChange("price", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Chambres</Label>
                          <Select
                            value={formData.bedrooms}
                            onValueChange={(value) =>
                              handleInputChange("bedrooms", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Nb" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">Studio</SelectItem>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5">5+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Salles de bain</Label>
                          <Select
                            value={formData.bathrooms}
                            onValueChange={(value) =>
                              handleInputChange("bathrooms", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Nb" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Surface (m²)</Label>
                          <Input
                            type="number"
                            placeholder="85"
                            value={formData.area}
                            onChange={(e) =>
                              handleInputChange("area", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Vos Coordonnées
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nom Complet</Label>
                          <Input
                            placeholder="Votre nom complet"
                            value={formData.contactName}
                            onChange={(e) =>
                              handleInputChange("contactName", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Téléphone</Label>
                          <Input
                            placeholder="+243 xxx xxx xxx"
                            value={formData.contactPhone}
                            onChange={(e) =>
                              handleInputChange("contactPhone", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          placeholder="votre.email@exemple.com"
                          value={formData.contactEmail}
                          onChange={(e) =>
                            handleInputChange("contactEmail", e.target.value)
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    type="submit"
                    className="w-full bg-brand-green hover:bg-brand-green/90 text-white py-3"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Soumettre ma Demande
                  </Button>
                </form>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-brand-green" />
                      Estimateur de Revenus
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-brand-green mb-2">
                          Revenus Potentiels
                        </h4>
                        <p className="text-2xl font-bold text-brand-green">
                          ${formData.price || "0"}/mois
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Soit $
                          {(
                            parseInt(formData.price || "0") * 12
                          ).toLocaleString()}
                          /an
                        </p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Frais de gestion (8%)</span>
                          <span>
                            -$
                            {(
                              parseInt(formData.price || "0") * 0.08 || 0
                            ).toFixed(0)}
                          </span>
                        </div>
                        <div className="flex justify-between font-semibold border-t pt-2">
                          <span>Revenus nets/mois</span>
                          <span className="text-brand-green">
                            $
                            {(
                              parseInt(formData.price || "0") * 0.92 || 0
                            ).toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      Points Clés
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-brand-green mt-0.5" />
                        <span>Évaluation gratuite sous 24h</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-brand-green mt-0.5" />
                        <span>Photos professionnelles incluses</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-brand-green mt-0.5" />
                        <span>Vérification complète des locataires</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-brand-green mt-0.5" />
                        <span>Contrat de bail sécurisé</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-brand-green mt-0.5" />
                        <span>Accompagnement administratif complet</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Onglet Services */}
          <TabsContent value="services" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Nos Formules de Location
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choisissez la formule qui correspond le mieux à vos besoins et à
                votre niveau d'implication souhaité.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ourServices.map((service, index) => (
                <Card
                  key={index}
                  className={index === 1 ? "border-brand-green border-2" : ""}
                >
                  {index === 1 && (
                    <div className="bg-brand-green text-white text-center py-2 text-sm font-medium">
                      RECOMMANDÉ
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <p className="text-gray-600">{service.description}</p>
                    <div className="text-2xl font-bold text-brand-blue">
                      {service.price}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-brand-green" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full mt-4"
                      variant={index === 1 ? "default" : "outline"}
                    >
                      Choisir cette Formule
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Onglet Processus */}
          <TabsContent value="processus" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Notre Processus de Location
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Un processus simple et transparent pour mettre votre bien en
                location rapidement et efficacement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {rentalSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-brand-blue" />
                      </div>
                      <div className="text-sm font-medium text-brand-blue mb-2">
                        ÉTAPE {index + 1}
                      </div>
                      <h3 className="font-bold mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {step.description}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.duration}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-gradient-to-r from-brand-blue/5 to-brand-green/5">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Prêt à Mettre Votre Bien en Location ?
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Rejoignez plus de 500 propriétaires qui nous font confiance
                  pour la gestion de leurs biens immobiliers. Commencez dès
                  aujourd'hui et maximisez vos revenus locatifs.
                </p>
                <Button
                  size="lg"
                  className="bg-brand-green hover:bg-brand-green/90"
                  onClick={() => setActiveTab("mettre")}
                >
                  <Home className="w-5 h-5 mr-2" />
                  Mettre mon Bien en Location
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Location;
