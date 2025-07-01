import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Home,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const OwnerRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    city: "",
    province: "",
    propertyType: "",
    acceptTerms: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'inscription
    console.log("Inscription propriétaire:", formData);
    // Redirection vers la page de connexion après inscription réussie
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-brand-blue/10 p-4 rounded-full">
                <Building className="w-12 h-12 text-brand-blue" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Inscription Propriétaire
            </h1>
            <p className="text-gray-600">
              Créez votre compte pour accéder à votre tableau de bord et gérer
              vos propriétés
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Informations Personnelles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations personnelles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Votre prénom"
                        className="pl-10"
                        value={formData.firstName}
                        onChange={(e) =>
                          (placeholder = "agent@youpendimmoselect.com")
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Votre nom"
                        className="pl-10"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+243 994 052 587"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                {/* Localisation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Province *</Label>
                    <Select
                      value={formData.province}
                      onValueChange={(value) =>
                        handleInputChange("province", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nord-kivu">Nord-Kivu</SelectItem>
                        <SelectItem value="kinshasa">Kinshasa</SelectItem>
                        <SelectItem value="sud-kivu">Sud-Kivu</SelectItem>
                        <SelectItem value="katanga">Katanga</SelectItem>
                        <SelectItem value="ituri">Ituri</SelectItem>
                        <SelectItem value="maniema">Maniema</SelectItem>
                        <SelectItem value="tshopo">Tshopo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Ville *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="city"
                        type="text"
                        placeholder="Votre ville"
                        className="pl-10"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Type de propriété */}
                <div className="space-y-2">
                  <Label>Type de propriétés que vous possédez *</Label>
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
                      <SelectItem value="residential">
                        Résidentielles
                      </SelectItem>
                      <SelectItem value="commercial">Commerciales</SelectItem>
                      <SelectItem value="mixed">
                        Mixtes (Résidentielles et Commerciales)
                      </SelectItem>
                      <SelectItem value="land">Terrains</SelectItem>
                      <SelectItem value="industrial">Industrielles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Mots de passe */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirmer le mot de passe *
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                {/* Conditions d'utilisation */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) =>
                      handleInputChange("acceptTerms", checked)
                    }
                  />
                  <Label htmlFor="terms" className="text-sm">
                    J'accepte les{" "}
                    <Link
                      to="/terms"
                      className="text-brand-blue hover:underline"
                    >
                      conditions d'utilisation
                    </Link>{" "}
                    et la{" "}
                    <Link
                      to="/privacy"
                      className="text-brand-blue hover:underline"
                    >
                      politique de confidentialité
                    </Link>
                  </Label>
                </div>

                {/* Boutons */}
                <div className="space-y-4">
                  <Button
                    type="submit"
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold py-3"
                    disabled={!formData.acceptTerms}
                  >
                    <Building className="w-4 h-4 mr-2" />
                    S'inscrire comme Propriétaire
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Vous avez déjà un compte ?{" "}
                      <Link
                        to="/login"
                        className="text-brand-blue hover:underline font-medium"
                      >
                        Se connecter
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <Button asChild variant="outline">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OwnerRegister;
