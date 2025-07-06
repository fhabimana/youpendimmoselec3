import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Mail, Lock, ArrowLeft, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Credentials administrateur autorisés
    const ADMIN_EMAIL = "admin@youpendimmosect.com";
    const ADMIN_PASSWORDS = ["000000", "admin"];

    // Vérification des credentials
    if (
      formData.email === ADMIN_EMAIL &&
      ADMIN_PASSWORDS.includes(formData.password)
    ) {
      console.log("Connexion administrateur réussie:", formData);
      // Redirection vers l'espace admin après connexion réussie
      navigate("/admin");
    } else {
      alert("Email ou mot de passe incorrect. Accès refusé.");
      console.log("Tentative de connexion échouée:", formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-brand-green/10 p-4 rounded-full">
                <Shield className="w-12 h-12 text-brand-green" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Connexion Administrateur
            </h1>
            <p className="text-gray-600">Accédez à l'espace d'administration</p>
          </div>

          {/* Welcome Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-800">
                  Bienvenue Administrateur
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  Connectez-vous avec vos identifiants ou utilisez l'accès
                  direct pour gérer la plateforme.
                </p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Authentification</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Administrateur</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Votre email administrateur"
                      className="pl-10 border-gray-200 focus:border-brand-green"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Votre mot de passe"
                      className="pl-10 border-gray-200 focus:border-brand-green"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        handleInputChange("rememberMe", checked)
                      }
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Se souvenir de moi
                    </Label>
                  </div>
                  <Link
                    to="/admin-reset-password"
                    className="text-sm text-brand-green hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold py-3"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Se Connecter
                </Button>

                <Button
                  type="button"
                  onClick={handleDirectAccess}
                  className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold py-3 mt-3"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Accès Direct Administrateur
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Pas encore d'accès administrateur ?{" "}
                    <Link
                      to="/admin-register"
                      className="text-brand-green hover:underline font-medium"
                    >
                      Demander l'accès
                    </Link>
                  </p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 text-center">
                    Contact support technique :{" "}
                    <a
                      href="mailto:support@youpendimmoselect.com"
                      className="text-brand-green hover:underline"
                    >
                      support@youpendimmoselect.com
                    </a>
                  </p>
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

export default AdminLogin;
