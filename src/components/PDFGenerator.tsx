import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  FileText,
  Printer,
  Calendar,
  DollarSign,
  Building,
  MapPin,
} from "lucide-react";

interface PDFGeneratorProps {
  reportType: "financial" | "property" | "contract" | "maintenance";
  data?: any;
  title?: string;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({
  reportType,
  data,
  title = "Rapport YOUPENDI IMMO SELECT",
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: title,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
      }
    `,
  });

  const generatePDF = async () => {
    if (printRef.current) {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${title.toLowerCase().replace(/\s+/g, "-")}.pdf`);
    }
  };

  const renderFinancialReport = () => (
    <div className="space-y-6">
      <div className="text-center border-b pb-4">
        <h2 className="text-2xl font-bold">Rapport Financier</h2>
        <p className="text-gray-600">
          Période: {new Date().toLocaleDateString("fr-CD")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 rounded">
          <h3 className="font-semibold text-green-800">Revenus Totaux</h3>
          <p className="text-2xl font-bold text-green-600">42 600 000 FC</p>
        </div>
        <div className="p-4 bg-blue-50 rounded">
          <h3 className="font-semibold text-blue-800">Dépenses</h3>
          <p className="text-2xl font-bold text-blue-600">12 800 000 FC</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Revenus par Province</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Province</th>
              <th className="border border-gray-300 p-2 text-left">Revenus</th>
              <th className="border border-gray-300 p-2 text-left">
                Propriétés
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Kinshasa</td>
              <td className="border border-gray-300 p-2">28 500 000 FC</td>
              <td className="border border-gray-300 p-2">15</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Haut-Katanga</td>
              <td className="border border-gray-300 p-2">8 200 000 FC</td>
              <td className="border border-gray-300 p-2">6</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Nord-Kivu</td>
              <td className="border border-gray-300 p-2">5 900 000 FC</td>
              <td className="border border-gray-300 p-2">4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPropertyReport = () => (
    <div className="space-y-6">
      <div className="text-center border-b pb-4">
        <h2 className="text-2xl font-bold">Rapport des Propriétés</h2>
        <p className="text-gray-600">
          État des biens - {new Date().toLocaleDateString("fr-CD")}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded text-center">
          <Building className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <h3 className="font-semibold">Total Propriétés</h3>
          <p className="text-2xl font-bold text-blue-600">125</p>
        </div>
        <div className="p-4 bg-green-50 rounded text-center">
          <h3 className="font-semibold">Disponibles</h3>
          <p className="text-2xl font-bold text-green-600">87</p>
        </div>
        <div className="p-4 bg-orange-50 rounded text-center">
          <h3 className="font-semibold">Louées</h3>
          <p className="text-2xl font-bold text-orange-600">38</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Répartition par Province</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Province</th>
              <th className="border border-gray-300 p-2 text-left">Total</th>
              <th className="border border-gray-300 p-2 text-left">
                Disponibles
              </th>
              <th className="border border-gray-300 p-2 text-left">Louées</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Kinshasa</td>
              <td className="border border-gray-300 p-2">45</td>
              <td className="border border-gray-300 p-2">28</td>
              <td className="border border-gray-300 p-2">17</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Haut-Katanga</td>
              <td className="border border-gray-300 p-2">32</td>
              <td className="border border-gray-300 p-2">24</td>
              <td className="border border-gray-300 p-2">8</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Nord-Kivu</td>
              <td className="border border-gray-300 p-2">18</td>
              <td className="border border-gray-300 p-2">12</td>
              <td className="border border-gray-300 p-2">6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (reportType) {
      case "financial":
        return renderFinancialReport();
      case "property":
        return renderPropertyReport();
      default:
        return renderFinancialReport();
    }
  };

  return (
    <div className="space-y-4">
      {/* Contrôles d'impression */}
      <div className="flex gap-2 no-print">
        <Button onClick={handlePrint} variant="outline">
          <Printer className="w-4 h-4 mr-2" />
          Imprimer
        </Button>
        <Button onClick={generatePDF} className="bg-brand-blue">
          <Download className="w-4 h-4 mr-2" />
          Télécharger PDF
        </Button>
      </div>

      {/* Contenu à imprimer */}
      <div ref={printRef} className="bg-white p-8 rounded-lg">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              YOUPENDI IMMO SELECT
            </h1>
            <p className="text-gray-600">Services Immobiliers - RDC</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">
              Généré le: {new Date().toLocaleDateString("fr-CD")}
            </p>
            <p className="text-sm text-gray-600">
              Heure: {new Date().toLocaleTimeString("fr-CD")}
            </p>
          </div>
        </div>

        {/* Contenu du rapport */}
        {renderContent()}

        {/* Pied de page */}
        <div className="mt-8 pt-4 border-t text-center text-sm text-gray-600">
          <p>YOUPENDI IMMO SELECT - Contact: +243 997 123 456</p>
          <p>Email: contact@youpendimmoselect.com</p>
        </div>
      </div>
    </div>
  );
};

export default PDFGenerator;
