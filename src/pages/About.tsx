import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Building,
  Users,
  Award,
  Target,
  Heart,
  Shield,
} from "lucide-react";

const About = () => {
  const rdcProvinces = [
    "Kinshasa",
    "Kongo Central",
    "Kwango",
    "Kwilu",
    "Mai-Ndombe",
    "Kasaï",
    "Kasaï Central",
    "Kasaï Oriental",
    "Lomami",
    "Sankuru",
    "Maniema",
    "Sud-Kivu",
    "Nord-Kivu",
    "Ituri",
    "Haut-Uélé",
    "Bas-Uélé",
    "Nord-Ubangi",
    "Sud-Ubangi",
    "Mongala",
    "Tshuapa",
    "Équateur",
    "Haut-Katanga",
    "Lualaba",
    "Kolwezi",
    "Haut-Lomami",
    "Tanganyika",
  ];

  const stats = [
    { label: "Provinces Couvertes", value: "26", icon: MapPin },
    { label: "Propriétés Gérées", value: "500+", icon: Building },
    { label: "Clients Satisfaits", value: "1000+", icon: Users },
    { label: "Années d'Expérience", value: "10+", icon: Award },
  ];

  const values = [
    {
      title: "Excellence",
      description:
        "Nous nous engageons à fournir un service de qualité supérieure à nos clients.",
      icon: Award,
    },
    {
      title: "Intégrité",
      description:
        "Transparence et honnêteté dans toutes nos transactions immobilières.",
      icon: Shield,
    },
    {
      title: "Innovation",
      description:
        "Utilisation des dernières technologies pour faciliter vos projets immobiliers.",
      icon: Target,
    },
    {
      title: "Proximité",
      description:
        "Une présence locale dans toutes les provinces de la RDC pour mieux vous servir.",
      icon: Heart,
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
              À Propos de YOUPENDI IMMO SELECT
            </h1>
            <p className="text-xl mb-8">
              Votre partenaire immobilier de confiance dans les 26 provinces de
              la République Démocratique du Congo
            </p>
            <Badge className="bg-white text-brand-blue text-lg px-6 py-2">
              Présent dans toute la RDC
            </Badge>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Notre Mission */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Faciliter l'accès à la propriété immobilière dans toute la RDC en
              offrant des services personnalisés, transparents et accessibles à
              tous nos clients, de Kinshasa à Lubumbashi, de Goma à Matadi.
            </p>
          </div>
        </section>

        {/* Statistiques */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <Icon className="w-12 h-12 mx-auto mb-4 text-brand-blue" />
                    <div className="text-3xl font-bold text-brand-blue mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Valeurs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre action quotidienne pour vous
              offrir le meilleur service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <Icon className="w-10 h-10 mx-auto mb-4 text-brand-green" />
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Couverture Géographique */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Notre Couverture : Les 26 Provinces de la RDC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {rdcProvinces.map((province, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="justify-center p-2 text-center"
                  >
                    {province}
                  </Badge>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Une présence locale dans chaque province pour vous accompagner
                  dans vos projets immobiliers
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Notre Histoire */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Fondée avec la vision de démocratiser l'accès à l'immobilier
                  en RDC, YOUPENDI IMMO SELECT s'est imposée comme un acteur
                  incontournable du secteur.
                </p>
                <p>
                  Depuis nos débuts, nous avons accompagné des milliers de
                  familles congolaises dans la réalisation de leur rêve
                  immobilier, de l'acquisition de leur première maison à
                  l'investissement locatif.
                </p>
                <p>
                  Notre expansion dans les 26 provinces témoigne de notre
                  engagement à servir tous les Congolais, où qu'ils se trouvent
                  sur le territoire national.
                </p>
              </div>
            </div>
            <div>
              <Card className="bg-gradient-to-br from-brand-blue to-brand-green text-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Pourquoi Nous Choisir ?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      Expertise locale dans toutes les provinces
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      Processus transparent et sécurisé
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      Accompagnement personnalisé
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      Réseau d'agents qualifiés
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      Solutions adaptées à tous les budgets
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <Card className="bg-gray-100">
            <CardHeader>
              <CardTitle className="text-center">Contactez-Nous</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Phone className="w-8 h-8 text-brand-blue" />
                  <h3 className="font-semibold">Téléphone</h3>
                  <p className="text-gray-600">+243 997 123 456</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Mail className="w-8 h-8 text-brand-green" />
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">contact@youpendimmoselect.com</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Globe className="w-8 h-8 text-brand-blue" />
                  <h3 className="font-semibold">Site Web</h3>
                  <p className="text-gray-600">www.youpendimmoselect.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
