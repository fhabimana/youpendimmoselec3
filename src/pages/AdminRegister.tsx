import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  User,
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    city: "",
    province: "",
    department: "",
    experience: "",
    motivation: "",
    accessCode: "",
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
    // Logique d'inscription administrateur
    console.log("Inscription administrateur:", formData);
    // Redirection vers la page de connexion après validation
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-brand-green/10 p-4 rounded-full">
                <Shield className="w-12 h-12 text-brand-green" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Inscription Administrateur
            </h1>
            <p className="text-gray-600">
              Demande d'accès pour gérer le contenu et les paramètres du site
            </p>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800">Accès Restreint</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  L'inscription d'administrateur nécessite une validation
                  manuelle. Votre demande sera examinée sous 24-48h.
                </p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Demande d'Accès Administrateur
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
                          handleInputChange("firstName", e.target.value)
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
                  <Label htmlFor="email">Email Professionnel *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@youpendimmoselect.com"
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
                    <Label>Province de travail *</Label>
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
                        <SelectItem value="national">
                          National (Toutes)
                        </SelectItem>
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

                {/* Informations professionnelles */}
                <div className="space-y-2">
                  <Label>Département souhaité *</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      handleInputChange("department", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre domaine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="content">
                        Gestion du Contenu
                      </SelectItem>
                      <SelectItem value="properties">
                        Gestion des Propriétés
                      </SelectItem>
                      <SelectItem value="agents">Gestion des Agents</SelectItem>
                      <SelectItem value="support">Support Client</SelectItem>
                      <SelectItem value="technical">
                        Support Technique
                      </SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="general">
                        Administration Générale
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">
                    Expérience professionnelle *
                  </Label>
                  <Textarea
                    id="experience"
                    placeholder="Décrivez votre expérience dans l'immobilier, la gestion de contenu ou l'administration..."
                    value={formData.experience}
                    onChange={(e) =>
                      handleInputChange("experience", e.target.value)
                    }
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivation">Motivation *</Label>
                  <Textarea
                    id="motivation"
                    placeholder="Pourquoi souhaitez-vous devenir administrateur de YOUPENDI IMMO SELECT ?"
                    value={formData.motivation}
                    onChange={(e) =>
                      handleInputChange("motivation", e.target.value)
                    }
                    rows={3}
                    required
                  />
                </div>

                {/* Code d'accès */}
                <div className="space-y-2">
                  <Label htmlFor="accessCode">
                    Code d'accès (si disponible)
                  </Label>
                  <Input
                    id="accessCode"
                    type="text"
                    placeholder="Code fourni par l'administration"
                    value={formData.accessCode}
                    onChange={(e) =>
                      handleInputChange("accessCode", e.target.value)
                    }
                  />
                  <p className="text-xs text-gray-500">
                    Code optionnel fourni par l'équipe de direction
                  </p>
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
                      to="/admin-terms"
                      className="text-brand-green hover:underline"
                    >
                      conditions d'administration
                    </Link>{" "}
                    et m'engage à respecter la confidentialité des données
                  </Label>
                </div>

                {/* Boutons */}
                <div className="space-y-4">
                  <Button
                    type="submit"
                    className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold py-3"
                    disabled={!formData.acceptTerms}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Soumettre la Demande
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Vous avez déjà un compte administrateur ?{" "}
                      <Link
                        to="/admin-login"
                        className="text-brand-green hover:underline font-medium"
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

export default AdminRegister;
