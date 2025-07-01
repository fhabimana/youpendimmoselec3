import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Building, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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
    // Logique de connexion propriétaire
    console.log("Connexion propriétaire:", formData);
    // Redirection vers le dashboard après connexion réussie
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-brand-blue/10 p-4 rounded-full">
                    <Building className="w-10 h-10 text-brand-blue" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Connexion Propriétaire
                </CardTitle>
                <p className="text-gray-600">Accédez à votre tableau de bord</p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="votre@email.com"
                          className="pl-10 border-gray-200 focus:border-brand-blue"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          required
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
                          placeholder="••••••••"
                          className="pl-10 border-gray-200 focus:border-brand-blue"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          required
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
                        to="/forgot-password"
                        className="text-sm text-brand-blue hover:underline"
                      >
                        Mot de passe oublié ?
                      </Link>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold py-3"
                  >
                    <Building className="w-4 h-4 mr-2" />
                    Se Connecter
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Pas encore de compte propriétaire ?{" "}
                      <Link
                        to="/owner-register"
                        className="text-brand-blue hover:underline font-medium"
                      >
                        S'inscrire
                      </Link>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="text-center mt-6">
              <Button
                asChild
                variant="outline"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
              >
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
