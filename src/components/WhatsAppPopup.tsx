import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, MessageCircle, Phone } from "lucide-react";

const WhatsAppPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Afficher le popup après 3 secondes
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const openWhatsApp = () => {
    const phoneNumber = "+243994052587";
    const message =
      "Bonjour! Je suis intéressé par vos services immobiliers. Pouvez-vous m'aider?";
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const closePopup = () => {
    setIsVisible(false);
  };

  const minimizePopup = () => {
    setIsMinimized(true);
  };

  const restorePopup = () => {
    setIsMinimized(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Popup WhatsApp */}
      {!isMinimized && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <Card className="w-80 border-green-200 shadow-lg">
            <CardHeader className="bg-green-500 text-white rounded-t-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <MessageCircle className="w-6 h-6" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <CardTitle className="text-lg">YOUPENDI Support</CardTitle>
                    <p className="text-green-100 text-sm">
                      En ligne maintenant
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={minimizePopup}
                    className="text-white hover:bg-green-600 p-1 h-6 w-6"
                  >
                    <span className="text-xs">−</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closePopup}
                    className="text-white hover:bg-green-600 p-1 h-6 w-6"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    👋 Bonjour! Bienvenue chez YOUPENDI IMMO SELECT
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Comment pouvons-nous vous aider avec vos projets immobiliers
                    aujourd'hui?
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-gray-500">
                    💬 Discutons sur WhatsApp pour une assistance immédiate
                  </p>
                  <p className="text-xs text-gray-500">📞 +243 994 052 587</p>
                </div>

                <Button
                  onClick={openWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Commencer la conversation
                </Button>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Nous répondons généralement en quelques minutes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bouton WhatsApp flottant minimisé */}
      {isMinimized && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={restorePopup}
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg animate-bounce"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Bouton WhatsApp flottant permanent (si pas de popup) */}
      {!isVisible && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={openWhatsApp}
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:scale-110 transition-transform"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </div>
      )}
    </>
  );
};

export default WhatsAppPopup;
