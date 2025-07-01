import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  Wrench,
  Plus,
  Eye,
  MessageSquare,
  Calendar,
  User,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Filter,
  Search,
} from "lucide-react";

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  tenant: string;
  property: string;
  category:
    | "plumbing"
    | "electrical"
    | "heating"
    | "appliance"
    | "general"
    | "urgent";
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "pending_parts" | "completed" | "cancelled";
  createdDate: string;
  scheduledDate?: string;
  completedDate?: string;
  estimatedCost?: number;
  actualCost?: number;
  assignedTo?: string;
  images?: string[];
  notes?: string;
}

const MaintenanceRequests = () => {
  const [requests] = useState<MaintenanceRequest[]>([
    {
      id: "REQ-001",
      title: "Fuite d'eau dans la salle de bain",
      description:
        "Il y a une fuite importante sous l'évier de la salle de bain principale. L'eau s'accumule sur le sol.",
      tenant: "Jean Mukendi",
      property: "Villa Moderne Gombe",
      category: "plumbing",
      priority: "high",
      status: "in_progress",
      createdDate: "2024-12-01",
      scheduledDate: "2024-12-03",
      estimatedCost: 150,
      assignedTo: "Paul Kabemba - Plombier",
      images: [
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=150&fit=crop",
      ],
    },
    {
      id: "REQ-002",
      title: "Problème de climatisation",
      description:
        "La climatisation du salon ne fonctionne plus. Elle fait du bruit mais ne refroidit pas.",
      tenant: "Marie Kabila",
      property: "Appartement Bandalungwa",
      category: "heating",
      priority: "medium",
      status: "open",
      createdDate: "2024-12-02",
      estimatedCost: 200,
    },
    {
      id: "REQ-003",
      title: "Réparation porte d'entrée",
      description:
        "La serrure de la porte d'entrée est cassée. Impossible de fermer à clé.",
      tenant: "Pierre Tshisekedi",
      property: "Maison Familiale Lemba",
      category: "general",
      priority: "urgent",
      status: "pending_parts",
      createdDate: "2024-11-28",
      scheduledDate: "2024-12-04",
      estimatedCost: 75,
      assignedTo: "Martin Nzuzi - Serrurier",
    },
    {
      id: "REQ-004",
      title: "Panne d'électricité cuisine",
      description:
        "Plus d'électricité dans la cuisine depuis hier soir. Les autres pièces fonctionnent normalement.",
      tenant: "Alice Mbuyi",
      property: "Studio Kintambo",
      category: "electrical",
      priority: "high",
      status: "completed",
      createdDate: "2024-11-25",
      completedDate: "2024-11-26",
      actualCost: 120,
      assignedTo: "Joseph Lumbu - Électricien",
    },
    {
      id: "REQ-005",
      title: "Nettoyage gouttières",
      description:
        "Les gouttières sont bouchées et l'eau déborde pendant la pluie.",
      tenant: "Jean Mukendi",
      property: "Villa Moderne Gombe",
      category: "general",
      priority: "low",
      status: "open",
      createdDate: "2024-12-01",
      estimatedCost: 50,
    },
  ]);

  const getCategoryLabel = (category: MaintenanceRequest["category"]) => {
    const labels = {
      plumbing: "Plomberie",
      electrical: "Électricité",
      heating: "Climatisation",
      appliance: "Électroménager",
      general: "Général",
      urgent: "Urgent",
    };
    return labels[category];
  };

  const getPriorityBadge = (priority: MaintenanceRequest["priority"]) => {
    const variants = {
      low: "secondary",
      medium: "outline",
      high: "destructive",
      urgent: "destructive",
    } as const;

    const labels = {
      low: "Faible",
      medium: "Moyen",
      high: "Élevé",
      urgent: "Urgent",
    };

    return <Badge variant={variants[priority]}>{labels[priority]}</Badge>;
  };

  const getStatusBadge = (status: MaintenanceRequest["status"]) => {
    const variants = {
      open: "outline",
      in_progress: "secondary",
      pending_parts: "outline",
      completed: "default",
      cancelled: "destructive",
    } as const;

    const labels = {
      open: "Ouvert",
      in_progress: "En cours",
      pending_parts: "En attente",
      completed: "Terminé",
      cancelled: "Annulé",
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const getStatusIcon = (status: MaintenanceRequest["status"]) => {
    const icons = {
      open: <Clock className="w-4 h-4 text-orange-500" />,
      in_progress: <Wrench className="w-4 h-4 text-blue-500" />,
      pending_parts: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
      completed: <CheckCircle className="w-4 h-4 text-green-500" />,
      cancelled: <AlertTriangle className="w-4 h-4 text-red-500" />,
    };
    return icons[status];
  };

  // Statistiques
  const openRequests = requests.filter((r) => r.status === "open").length;
  const inProgressRequests = requests.filter(
    (r) => r.status === "in_progress",
  ).length;
  const urgentRequests = requests.filter((r) => r.priority === "urgent").length;
  const avgCost =
    requests
      .filter((r) => r.actualCost)
      .reduce((sum, r) => sum + (r.actualCost || 0), 0) /
      requests.filter((r) => r.actualCost).length || 0;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Demandes Ouvertes</p>
                <p className="text-2xl font-bold text-orange-600">
                  {openRequests}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En Cours</p>
                <p className="text-2xl font-bold text-blue-600">
                  {inProgressRequests}
                </p>
              </div>
              <Wrench className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Urgentes</p>
                <p className="text-2xl font-bold text-red-600">
                  {urgentRequests}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Coût Moyen</p>
                <p className="text-2xl font-bold text-green-600">
                  ${Math.round(avgCost)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Maintenance et Demandes Locataires
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-brand-blue hover:bg-brand-blue/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle Demande
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Créer une Demande de Maintenance</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Propriété</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Propriété" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="villa">
                            Villa Moderne Gombe
                          </SelectItem>
                          <SelectItem value="apt">
                            Appartement Bandalungwa
                          </SelectItem>
                          <SelectItem value="maison">
                            Maison Familiale Lemba
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Titre de la demande
                    </label>
                    <Input placeholder="Décrivez brièvement le problème" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Catégorie</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Type de problème" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plumbing">Plomberie</SelectItem>
                          <SelectItem value="electrical">
                            Électricité
                          </SelectItem>
                          <SelectItem value="heating">Climatisation</SelectItem>
                          <SelectItem value="appliance">
                            Électroménager
                          </SelectItem>
                          <SelectItem value="general">Général</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Priorité</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Niveau d'urgence" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Faible</SelectItem>
                          <SelectItem value="medium">Moyen</SelectItem>
                          <SelectItem value="high">Élevé</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Description détaillée
                    </label>
                    <Textarea
                      placeholder="Décrivez le problème en détail..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Date souhaitée
                      </label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Coût estimé ($)
                      </label>
                      <Input type="number" placeholder="150" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="bg-brand-blue hover:bg-brand-blue/90">
                      Créer la Demande
                    </Button>
                    <Button variant="outline">Annuler</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">Toutes</TabsTrigger>
                <TabsTrigger value="open">Ouvertes</TabsTrigger>
                <TabsTrigger value="in_progress">En cours</TabsTrigger>
                <TabsTrigger value="completed">Terminées</TabsTrigger>
              </TabsList>
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
            </div>

            <TabsContent value="all">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Référence</TableHead>
                      <TableHead>Titre</TableHead>
                      <TableHead>Locataire</TableHead>
                      <TableHead>Propriété</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Priorité</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Coût</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">
                          {request.id}
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px]">
                            <div className="font-medium truncate">
                              {request.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate">
                              {request.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            {request.tenant}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="truncate max-w-[150px]">
                              {request.property}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {getCategoryLabel(request.category)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {getPriorityBadge(request.priority)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(request.status)}
                            {getStatusBadge(request.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>
                              Créé:{" "}
                              {new Date(
                                request.createdDate,
                              ).toLocaleDateString()}
                            </div>
                            {request.scheduledDate && (
                              <div className="text-blue-600">
                                Prévu:{" "}
                                {new Date(
                                  request.scheduledDate,
                                ).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {request.estimatedCost && (
                              <div>Est.: ${request.estimatedCost}</div>
                            )}
                            {request.actualCost && (
                              <div className="font-medium">
                                Réel: ${request.actualCost}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Calendar className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="open">
              <div className="space-y-4">
                {requests
                  .filter((r) => r.status === "open")
                  .map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{request.title}</h3>
                              {getPriorityBadge(request.priority)}
                            </div>
                            <p className="text-sm text-gray-600">
                              {request.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{request.tenant}</span>
                              <span>•</span>
                              <span>{request.property}</span>
                              <span>•</span>
                              <span>{getCategoryLabel(request.category)}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Assigner
                            </Button>
                            <Button
                              size="sm"
                              className="bg-brand-blue hover:bg-brand-blue/90"
                            >
                              Planifier
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="in_progress">
              <div className="space-y-4">
                {requests
                  .filter((r) => r.status === "in_progress")
                  .map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{request.title}</h3>
                              {getPriorityBadge(request.priority)}
                              {getStatusBadge(request.status)}
                            </div>
                            <p className="text-sm text-gray-600">
                              {request.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{request.tenant}</span>
                              <span>•</span>
                              <span>{request.property}</span>
                              <span>•</span>
                              <span>Assigné à: {request.assignedTo}</span>
                            </div>
                            {request.scheduledDate && (
                              <div className="text-sm text-blue-600">
                                Planifié pour le:{" "}
                                {new Date(
                                  request.scheduledDate,
                                ).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Mettre à jour
                            </Button>
                            <Button
                              size="sm"
                              className="bg-brand-green hover:bg-brand-green/90"
                            >
                              Marquer terminé
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="space-y-4">
                {requests
                  .filter((r) => r.status === "completed")
                  .map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{request.title}</h3>
                              {getStatusBadge(request.status)}
                            </div>
                            <p className="text-sm text-gray-600">
                              {request.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{request.tenant}</span>
                              <span>•</span>
                              <span>{request.property}</span>
                              <span>•</span>
                              <span>Terminé par: {request.assignedTo}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              {request.completedDate && (
                                <span className="text-green-600">
                                  Terminé le:{" "}
                                  {new Date(
                                    request.completedDate,
                                  ).toLocaleDateString()}
                                </span>
                              )}
                              {request.actualCost && (
                                <span className="font-medium">
                                  Coût: ${request.actualCost}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Voir détails
                            </Button>
                            <Button size="sm" variant="outline">
                              Télécharger facture
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceRequests;
