import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Plus,
  Eye,
  Edit,
  Download,
  Calendar,
  User,
  MapPin,
  DollarSign,
  Clock,
  AlertTriangle,
} from "lucide-react";

interface Contract {
  id: string;
  property: string;
  tenant: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  deposit: number;
  status: "active" | "expired" | "terminated" | "pending";
  lastPayment: string;
  nextPayment: string;
  phone: string;
  email: string;
}

const ContractManagement = () => {
  const [contracts] = useState<Contract[]>([
    {
      id: "CTR-001",
      property: "Villa Moderne Gombe",
      tenant: "Jean Mukendi",
      startDate: "2024-01-15",
      endDate: "2025-01-14",
      monthlyRent: 1200,
      deposit: 2400,
      status: "active",
      lastPayment: "2024-12-01",
      nextPayment: "2025-01-01",
      phone: "+243 81 234 5678",
      email: "jean.mukendi@email.com",
    },
    {
      id: "CTR-002",
      property: "Appartement Bandalungwa",
      tenant: "Marie Kabila",
      startDate: "2023-06-01",
      endDate: "2024-05-31",
      monthlyRent: 800,
      deposit: 1600,
      status: "expired",
      lastPayment: "2024-05-01",
      nextPayment: "2024-06-01",
      phone: "+243 85 987 6543",
      email: "marie.kabila@email.com",
    },
    {
      id: "CTR-003",
      property: "Maison Familiale Lemba",
      tenant: "Pierre Tshisekedi",
      startDate: "2024-03-01",
      endDate: "2025-02-28",
      monthlyRent: 950,
      deposit: 1900,
      status: "active",
      lastPayment: "2024-12-01",
      nextPayment: "2025-01-01",
      phone: "+243 82 456 7890",
      email: "pierre.tshisekedi@email.com",
    },
    {
      id: "CTR-004",
      property: "Studio Kintambo",
      tenant: "Alice Mbuyi",
      startDate: "2024-11-01",
      endDate: "2025-10-31",
      monthlyRent: 600,
      deposit: 1200,
      status: "pending",
      lastPayment: "2024-11-01",
      nextPayment: "2024-12-01",
      phone: "+243 84 123 4567",
      email: "alice.mbuyi@email.com",
    },
  ]);

  const [showNewContract, setShowNewContract] = useState(false);

  const getStatusBadge = (status: Contract["status"]) => {
    const variants = {
      active: "default",
      expired: "destructive",
      terminated: "secondary",
      pending: "outline",
    } as const;

    const labels = {
      active: "Actif",
      expired: "Expiré",
      terminated: "Résilié",
      pending: "En attente",
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const getStatusIcon = (status: Contract["status"]) => {
    if (status === "expired") {
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
    if (status === "pending") {
      return <Clock className="w-4 h-4 text-yellow-500" />;
    }
    return null;
  };

  const activeContracts = contracts.filter((c) => c.status === "active").length;
  const expiredContracts = contracts.filter(
    (c) => c.status === "expired",
  ).length;
  const totalMonthlyRevenue = contracts
    .filter((c) => c.status === "active")
    .reduce((sum, c) => sum + c.monthlyRent, 0);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contrats Actifs</p>
                <p className="text-2xl font-bold text-brand-blue">
                  {activeContracts}
                </p>
              </div>
              <FileText className="w-8 h-8 text-brand-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contrats Expirés</p>
                <p className="text-2xl font-bold text-red-500">
                  {expiredContracts}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenus Mensuels</p>
                <p className="text-2xl font-bold text-brand-green">
                  ${totalMonthlyRevenue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-brand-green" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Contrats</p>
                <p className="text-2xl font-bold">{contracts.length}</p>
              </div>
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Gestion des Contrats de Location
            </CardTitle>
            <Dialog open={showNewContract} onOpenChange={setShowNewContract}>
              <DialogTrigger asChild>
                <Button className="bg-brand-blue hover:bg-brand-blue/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau Contrat
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Créer un Nouveau Contrat</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Propriété</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une propriété" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="villa-gombe">
                            Villa Moderne Gombe
                          </SelectItem>
                          <SelectItem value="apt-bandalungwa">
                            Appartement Bandalungwa
                          </SelectItem>
                          <SelectItem value="maison-lemba">
                            Maison Familiale Lemba
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Locataire</Label>
                      <Input placeholder="Nom complet du locataire" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date de début</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Date de fin</Label>
                      <Input type="date" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Loyer mensuel ($)</Label>
                      <Input type="number" placeholder="1200" />
                    </div>
                    <div className="space-y-2">
                      <Label>Dépôt de garantie ($)</Label>
                      <Input type="number" placeholder="2400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Téléphone</Label>
                      <Input placeholder="+243 81 234 5678" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="locataire@email.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Conditions spéciales</Label>
                    <Textarea
                      placeholder="Conditions particulières du contrat..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button className="bg-brand-blue hover:bg-brand-blue/90">
                      Créer le Contrat
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowNewContract(false)}
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Référence</TableHead>
                  <TableHead>Propriété</TableHead>
                  <TableHead>Locataire</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Loyer</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Prochain Paiement</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {contract.property}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{contract.tenant}</div>
                          <div className="text-sm text-gray-500">
                            {contract.phone}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>
                          {new Date(contract.startDate).toLocaleDateString()}
                        </div>
                        <div className="text-gray-500">
                          → {new Date(contract.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">${contract.monthlyRent}</div>
                      <div className="text-sm text-gray-500">
                        Dépôt: ${contract.deposit}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(contract.status)}
                        {getStatusBadge(contract.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(contract.nextPayment).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractManagement;
