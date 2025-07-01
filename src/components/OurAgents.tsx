import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Award } from "lucide-react";

const OurAgents = () => {
  const agents = [
    {
      id: 1,
      name: "Jean-Claude Mukendi",
      province: "Goma",
      position: "Agent Principal",
      phone: "+243 994 052 587",
      email: "jean.mukendi@youpendimmoselect.com",
      image:
        "https://images.pexels.com/photos/10397001/pexels-photo-10397001.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      experience: "8 ans d'expérience",
      specialties: ["Villas de luxe", "Appartements standing", "Terrains"],
      propertiesSold: 120,
    },
    {
      id: 2,
      name: "Marie Kabila Tshombe",
      province: "Kinshasa",
      position: "Agent Principal",
      phone: "+243 997 123 456",
      email: "marie.kabila@youpendimmoselect.com",
      image:
        "https://images.pexels.com/photos/7679648/pexels-photo-7679648.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      experience: "6 ans d'expérience",
      specialties: ["Propriétés commerciales", "Résidences", "Investissements"],
      propertiesSold: 85,
    },
    {
      id: 3,
      name: "Pierre Tshisekedi Mulumba",
      province: "Bukavu",
      position: "Agent Régional",
      phone: "+243 998 654 321",
      email: "pierre.tshisekedi@youpendimmoselect.com",
      image:
        "https://images.pexels.com/photos/8715785/pexels-photo-8715785.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      experience: "5 ans d'expérience",
      specialties: ["Propriétés lacustres", "Maisons familiales", "Tourisme"],
      propertiesSold: 65,
    },
    {
      id: 4,
      name: "Alice Mbuyi Kalala",
      province: "Lubumbashi",
      position: "Agent Régional",
      phone: "+243 996 789 012",
      email: "alice.mbuyi@youpendimmoselect.com",
      image:
        "https://images.pexels.com/photos/12562546/pexels-photo-12562546.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      experience: "4 ans d'expérience",
      specialties: [
        "Propriétés minières",
        "Résidences industrielles",
        "Commerces",
      ],
      propertiesSold: 45,
    },
    {
      id: 5,
      name: "Joseph Lumbu Ngandu",
      province: "Beni",
      position: "Agent Régional",
      phone: "+243 995 456 789",
      email: "joseph.lumbu@youpendimmoselect.com",
      image:
        "https://images.pexels.com/photos/15522690/pexels-photo-15522690.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      experience: "3 ans d'expérience",
      specialties: [
        "Propriétés agricoles",
        "Écotourisme",
        "Développement rural",
      ],
      propertiesSold: 30,
    },
    {
      id: 6,
      name: "Marcel Ilunga Kayembe",
      province: "Butembo",
      position: "Agent Régional",
      phone: "+243 993 321 654",
      email: "marcel.ilunga@youpendimmoselect.com",
      image:
        "https://images.pexels.com/photos/5060987/pexels-photo-5060987.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      experience: "4 ans d'expérience",
      specialties: [
        "Propriétés montagnardes",
        "Commerce frontalier",
        "Résidences",
      ],
      propertiesSold: 40,
    },
    {
      id: 7,
      name: "Clémentine Mwamba Kasonga",
      province: "Kisangani",
      position: "Agent Régional",
      phone: "+243 992 987 321",
      email: "clementine.mwamba@youpendimmoselect.com",
      image:
        "https://images.pexels.com/photos/32669988/pexels-photo-32669988.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
      experience: "5 ans d'expérience",
      specialties: ["Propriétés fluviales", "Commerce", "Éducation"],
      propertiesSold: 55,
    },
  ];

  // Organiser les agents dans l'ordre spécifié
  const orderedProvinces = [
    "Goma",
    "Kinshasa",
    "Bukavu",
    "Lubumbashi",
    "Beni",
    "Butembo",
    "Kisangani",
  ];

  const groupedAgents = orderedProvinces.reduce(
    (acc, province) => {
      const agentsInProvince = agents.filter(
        (agent) => agent.province === province,
      );
      if (agentsInProvince.length > 0) {
        acc[province] = agentsInProvince;
      }
      return acc;
    },
    {} as Record<string, typeof agents>,
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            APPELEZ NOS AGENTS
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Notre équipe d'experts immobiliers vous accompagne dans toutes les
            provinces de la RDC. Contactez directement nos agents régionaux pour
            vos projets immobiliers.
          </p>
        </div>

        {/* Afficher tous les agents en une seule grille horizontale */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-brand-blue mb-6 text-center">
            Nos Agents Régionaux
          </h3>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl">
              {agents.map((agent) => (
                <Card
                  key={agent.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
                >
                  <CardContent className="p-0">
                    {/* Photo de l'agent */}
                    <div className="relative">
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <div className="bg-brand-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                          {agent.position}
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                          <Award className="w-4 h-4 text-brand-green" />
                          {agent.propertiesSold} ventes
                        </div>
                      </div>
                    </div>

                    {/* Informations de l'agent */}
                    <div className="p-6 space-y-4">
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-gray-900 mb-1">
                          {agent.name}
                        </h4>
                        <div className="flex items-center justify-center gap-1 text-gray-600 text-sm">
                          <MapPin className="w-4 h-4" />
                          {agent.province}
                        </div>
                        <p className="text-brand-blue font-medium text-sm mt-1">
                          {agent.experience}
                        </p>
                      </div>

                      {/* Spécialités */}
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2 text-sm">
                          Spécialités :
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {agent.specialties.map((speciality, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                            >
                              {speciality}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Contacts */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm">
                          <Phone className="w-4 h-4 text-brand-blue" />
                          <span className="text-gray-700">{agent.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Mail className="w-4 h-4 text-brand-blue" />
                          <span className="text-gray-700 truncate">
                            {agent.email}
                          </span>
                        </div>
                      </div>

                      {/* Boutons d'action */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-brand-blue hover:bg-brand-blue/90"
                          onClick={() => window.open(`tel:${agent.phone}`)}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Appeler
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => window.open(`mailto:${agent.email}`)}
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <div className="bg-brand-blue/5 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Besoin d'un accompagnement personnalisé ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Nos agents sont disponibles 24h/7j pour vous accompagner dans vos
              projets immobiliers. N'hésitez pas à les contacter directement
              selon votre province.
            </p>
            <Button
              size="lg"
              className="bg-brand-blue hover:bg-brand-blue/90"
              onClick={() => window.open("tel:+243994052587")}
            >
              <Phone className="w-5 h-5 mr-2" />
              Appeler le numéro principal : +243 994 052 587
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurAgents;
