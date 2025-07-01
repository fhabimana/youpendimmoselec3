import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://cdn.builder.io/api/v1/assets/3ec82a5d41524ff8930c47019fe9aa86/whatsapp-image-2025-04-26-19.03.58_31dd8f84-9fb79f?format=webp&width=800"
              alt="YOUPENDI IMMO SELECT"
              className="h-24 w-auto"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-brand-gray hover:text-brand-blue transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link
              to="/acheter"
              className="text-brand-gray hover:text-brand-blue transition-colors font-medium"
            >
              Acheter
            </Link>
            <Link
              to="/dashboard"
              className="text-brand-gray hover:text-brand-blue transition-colors font-medium"
            >
              Tableau de Bord
            </Link>
            <div className="flex gap-2">
              <Button
                asChild
                variant="outline"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
              >
                <Link to="/login">
                  <User className="w-4 h-4 mr-2" />
                  Se Connecter
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
              >
                <Link to="/admin-login">
                  <User className="w-4 h-4 mr-2" />
                  Administrateur
                </Link>
              </Button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <Button variant="ghost" className="md:hidden">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
