import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  Send,
  FileText,
  Calendar,
  MapPin,
  User,
  Building,
  DollarSign,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const ReportEditor = () => {
  const [reportData, setReportData] = useState({
    title: "",
    type: "",
    province: "",
    dateStart: "",
    dateEnd: "",
    author: "",
    summary: "",
    content: "",
    status: "draft",
    priority: "normal",
  });

  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Situation Générale",
      content: "",
      type: "text",
    },
  ]);

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

  const reportTypes = [
    { value: "monthly", label: "Rapport Mensuel" },
    { value: "quarterly", label: "Rapport Trimestriel" },
    { value: "annual", label: "Rapport Annuel" },
    { value: "property", label: "Rapport Propriétés" },
    { value: "financial", label: "Rapport Financier" },
    { value: "agent", label: "Rapport Agents" },
    { value: "maintenance", label: "Rapport Maintenance" },
    { value: "custom", label: "Rapport Personnalisé" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setReportData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSection = () => {
    const newSection = {
      id: Date.now(),
      title: `Section ${sections.length + 1}`,
      content: "",
      type: "text",
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (id: number, field: string, value: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, [field]: value } : section,
      ),
    );
  };

  const removeSection = (id: number) => {
    setSections((prev) => prev.filter((section) => section.id !== id));
  };

  const saveReport = () => {
    console.log("Rapport sauvegardé:", { reportData, sections });
    alert("Rapport sauvegardé avec succès !");
  };

  const submitReport = () => {
    console.log("Rapport soumis:", { reportData, sections });
    alert("Rapport soumis pour validation !");
  };

  const generateTemplate = () => {
    const templates = {
      monthly: {
        title: `Rapport Mensuel - ${new Date().toLocaleDateString("fr-CD", { month: "long", year: "numeric" })}`,
        sections: [
          {
            title: "Résumé Exécutif",
            content: "Vue d'ensemble des performances du mois...",
          },
          {
            title: "Activités Immobilières",
            content: "Nouvelles acquisitions, ventes, locations...",
          },
          {
            title: "Performance Financière",
            content: "Revenus, dépenses, rentabilité...",
          },
          {
            title: "Activités par Province",
            content: "Détail des activités par région...",
          },
          {
            title: "Défis et Opportunités",
            content: "Obstacles rencontrés et opportunités identifiées...",
          },
          {
            title: "Prévisions",
            content: "Objectifs et projections pour le mois prochain...",
          },
        ],
      },
      property: {
        title: "Rapport de Gestion des Propriétés",
        sections: [
          {
            title: "État du Portefeuille",
            content: "Vue d'ensemble des propriétés gérées...",
          },
          {
            title: "Nouvelles Acquisitions",
            content: "Propriétés récemment ajoutées au portefeuille...",
          },
          {
            title: "Maintenance et Réparations",
            content: "Travaux effectués et planifiés...",
          },
          {
            title: "Occupation et Vacances",
            content: "Taux d'occupation par propriété et province...",
          },
          {
            title: "Évaluations et Prix",
            content: "Ajustements de prix et réévaluations...",
          },
        ],
      },
    };

    const template = templates[reportData.type as keyof typeof templates];
    if (template) {
      setReportData((prev) => ({ ...prev, title: template.title }));
      setSections(
        template.sections.map((section, index) => ({
          id: Date.now() + index,
          title: section.title,
          content: section.content,
          type: "text",
        })),
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-blue" />
            Éditeur de Rapports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Informations de base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type de Rapport</Label>
              <Select
                value={reportData.type}
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Province Concernée</Label>
              <Select
                value={reportData.province}
                onValueChange={(value) => handleInputChange("province", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les provinces" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les provinces</SelectItem>
                  {rdcProvinces.map((province) => (
                    <SelectItem key={province} value={province.toLowerCase()}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Titre du Rapport</Label>
              <Input
                placeholder="Titre du rapport..."
                value={reportData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Auteur</Label>
              <Input
                placeholder="Nom de l'auteur..."
                value={reportData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Date de Début</Label>
              <Input
                type="date"
                value={reportData.dateStart}
                onChange={(e) => handleInputChange("dateStart", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Date de Fin</Label>
              <Input
                type="date"
                value={reportData.dateEnd}
                onChange={(e) => handleInputChange("dateEnd", e.target.value)}
              />
            </div>
          </div>

          {/* Actions rapides */}
          <div className="flex gap-2">
            <Button onClick={generateTemplate} variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Générer Modèle
            </Button>
            <Badge
              variant={reportData.status === "draft" ? "secondary" : "default"}
            >
              {reportData.status === "draft" ? "Brouillon" : "Finalisé"}
            </Badge>
          </div>

          {/* Résumé */}
          <div className="space-y-2">
            <Label>Résumé Exécutif</Label>
            <Textarea
              placeholder="Résumé du rapport en quelques lignes..."
              rows={3}
              value={reportData.summary}
              onChange={(e) => handleInputChange("summary", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sections du rapport */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Contenu du Rapport</CardTitle>
          <Button onClick={addSection} variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Ajouter Section
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {sections.map((section, index) => (
            <Card key={section.id} className="border border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Input
                    value={section.title}
                    onChange={(e) =>
                      updateSection(section.id, "title", e.target.value)
                    }
                    className="font-semibold border-none p-0 text-lg"
                    placeholder="Titre de la section..."
                  />
                  <Button
                    onClick={() => removeSection(section.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600"
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Contenu de cette section..."
                  rows={6}
                  value={section.content}
                  onChange={(e) =>
                    updateSection(section.id, "content", e.target.value)
                  }
                />
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Dernière modification: {new Date().toLocaleDateString("fr-CD")}
          </span>
        </div>

        <div className="flex gap-2">
          <Button onClick={saveReport} variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder
          </Button>
          <Button onClick={submitReport} className="bg-brand-green">
            <Send className="w-4 h-4 mr-2" />
            Soumettre
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportEditor;
