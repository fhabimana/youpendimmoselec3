import { Link } from "react-router-dom";
import {
  Home,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="https://cdn.builder.io/api/v1/assets/3ec82a5d41524ff8930c47019fe9aa86/whatsapp-image-2025-04-26-19.03.58_31dd8f84-9fb79f?format=webp&width=800"
                alt="YOUPENDI IMMO SELECT"
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              Votre partenaire de confiance pour l'achat et la vente de
              propriétés partout en République Démocratique du Congo. Nous vous
              accompagnons dans tous vos projets immobiliers à travers toutes
              les provinces.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gray-800"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gray-800"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gray-800"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gray-800"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Liens Rapides</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/"
                  className="hover:text-brand-blue transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/acheter"
                  className="hover:text-brand-blue transition-colors"
                >
                  Acheter
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-brand-blue transition-colors"
                >
                  Tableau de Bord
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-brand-blue transition-colors"
                >
                  À Propos
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-brand-blue transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-brand-blue" />
                <span className="text-sm">
                  Avenue de la Libération, Gombe
                  <br />
                  Kinshasa, RDC
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-blue" />
                <span className="text-sm">+243 994 052 587</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-blue" />
                <span className="text-sm">contact@youpendimmoselect.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Newsletter</h3>
            <p className="text-gray-400 text-sm">
              Restez informé des dernières propriétés et actualités
              immobilières.
            </p>
            <div className="space-y-2">
              <Input
                placeholder="Votre email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="w-full bg-brand-blue hover:bg-brand-blue/90">
                S'abonner
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 YOUPENDI IMMO SELECT. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
