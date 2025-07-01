import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  CreditCard,
  Plus,
  Download,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Receipt,
  Send,
} from "lucide-react";

interface Payment {
  id: string;
  tenant: string;
  property: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "paid" | "pending" | "overdue" | "partial";
  paymentMethod?: string;
  invoiceNumber: string;
  reference?: string;
}

interface Invoice {
  id: string;
  number: string;
  tenant: string;
  property: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: "sent" | "viewed" | "paid" | "overdue";
  items: { description: string; amount: number }[];
}

const PaymentTracking = () => {
  const [payments] = useState<Payment[]>([
    {
      id: "PAY-001",
      tenant: "Jean Mukendi",
      property: "Villa Moderne Gombe",
      amount: 1200,
      dueDate: "2024-12-01",
      paidDate: "2024-11-30",
      status: "paid",
      paymentMethod: "Virement bancaire",
      invoiceNumber: "INV-2024-001",
      reference: "VIR240001",
    },
    {
      id: "PAY-002",
      tenant: "Marie Kabila",
      property: "Appartement Bandalungwa",
      amount: 800,
      dueDate: "2024-12-01",
      status: "overdue",
      invoiceNumber: "INV-2024-002",
    },
    {
      id: "PAY-003",
      tenant: "Pierre Tshisekedi",
      property: "Maison Familiale Lemba",
      amount: 950,
      dueDate: "2024-12-15",
      status: "pending",
      invoiceNumber: "INV-2024-003",
    },
    {
      id: "PAY-004",
      tenant: "Alice Mbuyi",
      property: "Studio Kintambo",
      amount: 600,
      dueDate: "2024-12-01",
      paidDate: "2024-12-01",
      status: "partial",
      paymentMethod: "Espèces",
      invoiceNumber: "INV-2024-004",
      reference: "CASH001",
    },
  ]);

  const [invoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      number: "INV-2024-001",
      tenant: "Jean Mukendi",
      property: "Villa Moderne Gombe",
      amount: 1200,
      issueDate: "2024-11-01",
      dueDate: "2024-12-01",
      status: "paid",
      items: [{ description: "Loyer mensuel - Décembre 2024", amount: 1200 }],
    },
    {
      id: "INV-002",
      number: "INV-2024-002",
      tenant: "Marie Kabila",
      property: "Appartement Bandalungwa",
      amount: 800,
      issueDate: "2024-11-01",
      dueDate: "2024-12-01",
      status: "overdue",
      items: [{ description: "Loyer mensuel - Décembre 2024", amount: 800 }],
    },
    {
      id: "INV-003",
      number: "INV-2024-003",
      tenant: "Pierre Tshisekedi",
      property: "Maison Familiale Lemba",
      amount: 950,
      issueDate: "2024-11-15",
      dueDate: "2024-12-15",
      status: "sent",
      items: [{ description: "Loyer mensuel - Décembre 2024", amount: 950 }],
    },
    {
      id: "INV-004",
      number: "INV-2024-004",
      tenant: "Alice Mbuyi",
      property: "Studio Kintambo",
      amount: 650,
      issueDate: "2024-11-01",
      dueDate: "2024-12-01",
      status: "viewed",
      items: [
        { description: "Loyer mensuel - Décembre 2024", amount: 600 },
        { description: "Charges communes", amount: 50 },
      ],
    },
  ]);

  const getPaymentStatusBadge = (status: Payment["status"]) => {
    const variants = {
      paid: "default",
      pending: "outline",
      overdue: "destructive",
      partial: "secondary",
    } as const;

    const labels = {
      paid: "Payé",
      pending: "En attente",
      overdue: "En retard",
      partial: "Partiel",
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const getPaymentStatusIcon = (status: Payment["status"]) => {
    const icons = {
      paid: <CheckCircle className="w-4 h-4 text-green-500" />,
      pending: <Clock className="w-4 h-4 text-yellow-500" />,
      overdue: <XCircle className="w-4 h-4 text-red-500" />,
      partial: <AlertCircle className="w-4 h-4 text-orange-500" />,
    };
    return icons[status];
  };

  const getInvoiceStatusBadge = (status: Invoice["status"]) => {
    const variants = {
      sent: "outline",
      viewed: "secondary",
      paid: "default",
      overdue: "destructive",
    } as const;

    const labels = {
      sent: "Envoyée",
      viewed: "Vue",
      paid: "Payée",
      overdue: "En retard",
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  // Calculs des statistiques
  const totalPaid = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments
    .filter((p) => p.status === "overdue")
    .reduce((sum, p) => sum + p.amount, 0);
  const overdueCount = payments.filter((p) => p.status === "overdue").length;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Paiements Reçus</p>
                <p className="text-2xl font-bold text-green-600">
                  ${totalPaid.toLocaleString()}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En Attente</p>
                <p className="text-2xl font-bold text-yellow-600">
                  ${totalPending.toLocaleString()}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En Retard</p>
                <p className="text-2xl font-bold text-red-600">
                  ${totalOverdue.toLocaleString()}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Retards</p>
                <p className="text-2xl font-bold text-red-500">
                  {overdueCount}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Suivi des Paiements et Factures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="payments" className="space-y-4">
            <TabsList>
              <TabsTrigger value="payments">Paiements</TabsTrigger>
              <TabsTrigger value="invoices">Factures</TabsTrigger>
            </TabsList>

            <TabsContent value="payments" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Rechercher..." className="pl-9 w-64" />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrer
                  </Button>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-brand-blue hover:bg-brand-blue/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Enregistrer Paiement
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Enregistrer un Paiement</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Locataire</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un locataire" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="jean">Jean Mukendi</SelectItem>
                            <SelectItem value="marie">Marie Kabila</SelectItem>
                            <SelectItem value="pierre">
                              Pierre Tshisekedi
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Montant ($)
                          </label>
                          <Input type="number" placeholder="1200" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Date de paiement
                          </label>
                          <Input type="date" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Méthode de paiement
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bank">
                              Virement bancaire
                            </SelectItem>
                            <SelectItem value="cash">Espèces</SelectItem>
                            <SelectItem value="mobile">Mobile Money</SelectItem>
                            <SelectItem value="check">Chèque</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Référence</label>
                        <Input placeholder="Référence de la transaction" />
                      </div>
                      <div className="flex gap-2">
                        <Button className="bg-brand-blue hover:bg-brand-blue/90">
                          Enregistrer
                        </Button>
                        <Button variant="outline">Annuler</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Locataire</TableHead>
                      <TableHead>Propriété</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Date d'échéance</TableHead>
                      <TableHead>Date de paiement</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Méthode</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">
                          {payment.tenant}
                        </TableCell>
                        <TableCell>{payment.property}</TableCell>
                        <TableCell>
                          ${payment.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {new Date(payment.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {payment.paidDate
                            ? new Date(payment.paidDate).toLocaleDateString()
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getPaymentStatusIcon(payment.status)}
                            {getPaymentStatusBadge(payment.status)}
                          </div>
                        </TableCell>
                        <TableCell>{payment.paymentMethod || "-"}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Receipt className="w-4 h-4" />
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
            </TabsContent>

            <TabsContent value="invoices" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Rechercher..." className="pl-9 w-64" />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrer
                  </Button>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-brand-blue hover:bg-brand-blue/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouvelle Facture
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Créer une Nouvelle Facture</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Locataire</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un locataire" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="jean">Jean Mukendi</SelectItem>
                            <SelectItem value="marie">Marie Kabila</SelectItem>
                            <SelectItem value="pierre">
                              Pierre Tshisekedi
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Date d'émission
                          </label>
                          <Input type="date" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Date d'échéance
                          </label>
                          <Input type="date" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Description
                        </label>
                        <Input placeholder="Loyer mensuel - Janvier 2025" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Montant ($)
                        </label>
                        <Input type="number" placeholder="1200" />
                      </div>
                      <div className="flex gap-2">
                        <Button className="bg-brand-blue hover:bg-brand-blue/90">
                          Créer et Envoyer
                        </Button>
                        <Button variant="outline">Créer Brouillon</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Numéro</TableHead>
                      <TableHead>Locataire</TableHead>
                      <TableHead>Propriété</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Date d'émission</TableHead>
                      <TableHead>Date d'échéance</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">
                          {invoice.number}
                        </TableCell>
                        <TableCell>{invoice.tenant}</TableCell>
                        <TableCell>{invoice.property}</TableCell>
                        <TableCell>
                          ${invoice.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {new Date(invoice.issueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {getInvoiceStatusBadge(invoice.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Send className="w-4 h-4" />
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentTracking;
