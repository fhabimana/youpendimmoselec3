import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReportEditor from "@/components/ReportEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
import {
  Shield,
  Settings,
  Home,
  Users,
  FileText,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  Upload,
  MessageSquare,
  Bell,
  MapPin,
} from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data pour la démo
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Villa Moderne Gombe",
      location: "Gombe, Kinshasa",
      price: "$320,000",
      status: "available",
      views: 245,
      dateAdded: "2024-11-15",
    },
    {
      id: 2,
      title: "Appartement Bandalungwa",
      location: "Bandalungwa, Kinshasa",
      price: "$180,000",
      status: "sold",
      views: 189,
      dateAdded: "2024-11-10",
    },
    {
      id: 3,
      title: "Maison Familiale Lemba",
      location: "Lemba, Kinshasa",
      price: "$250,000",
      status: "available",
      views: 156,
      dateAdded: "2024-11-05",
    },
  ]);

  const [agents, setAgents] = useState([
    {
      id: 1,
      name: "Jean-Claude Mukendi",
      province: "Kinshasa",
      phone: "+243 994 052 587",
      email: "jean.mukendi@youpendiselect.com",
      status: "active",
      sales: 120,
    },
    {
      id: 2,
      name: "Marie Kabila Tshombe",
      province: "Katanga",
      phone: "+243 997 123 456",
      email: "marie.kabila@youpendiselect.com",
      status: "active",
      sales: 85,
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Pierre Lumbu",
      email: "pierre@email.com",
      subject: "Demande d'information villa Gombe",
      message: "Je suis intéressé par la villa moderne de Gombe...",
      date: "2024-12-04",
      status: "new",
    },
    {
      id: 2,
      name: "Marie Kasonga",
      email: "marie@email.com",
      subject: "Rendez-vous visite appartement",
      message: "Pouvons-nous programmer une visite...",
      date: "2024-12-03",
      status: "read",
    },
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      available: "default",
      sold: "secondary",
      pending: "outline",
      active: "default",
      inactive: "secondary",
      new: "destructive",
      read: "secondary",
    } as const;

    const labels = {
      available: "Disponible",
      sold: "Vendu",
      pending: "En attente",
      active: "Actif",
      inactive: "Inactif",
      new: "Nouveau",
      read: "Lu",
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  const dashboardStats = {
    totalProperties: properties.length,
    activeAgents: agents.filter((a) => a.status === "active").length,
    newMessages: messages.filter((m) => m.status === "new").length,
    monthlyViews: properties.reduce((sum, p) => sum + p.views, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Shield className="w-8 h-8 text-brand-green" />
                Administration YOUPENDI
              </h1>
              <p className="text-gray-600">
                Gérez le contenu et les paramètres du site
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-600">
                {dashboardStats.newMessages} nouveaux messages
              </Badge>
              <Button className="bg-brand-green hover:bg-brand-green/90">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
            </div>
          </div>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7">
              <TabsTrigger
                value="dashboard"
                className="flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Tableau de Bord
              </TabsTrigger>
              <TabsTrigger
                value="properties"
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Propriétés
              </TabsTrigger>
              <TabsTrigger value="agents" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Agents
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Rédiger Rapport
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Contenu
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Paramètres
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Propriétés</p>
                        <p className="text-2xl font-bold text-brand-blue">
                          {dashboardStats.totalProperties}
                        </p>
                      </div>
                      <Home className="w-8 h-8 text-brand-blue" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Agents Actifs</p>
                        <p className="text-2xl font-bold text-brand-green">
                          {dashboardStats.activeAgents}
                        </p>
                      </div>
                      <Users className="w-8 h-8 text-brand-green" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          Nouveaux Messages
                        </p>
                        <p className="text-2xl font-bold text-orange-600">
                          {dashboardStats.newMessages}
                        </p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Vues Mensuelles</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {dashboardStats.monthlyViews}
                        </p>
                      </div>
                      <Eye className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions Rapides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col gap-2"
                      onClick={() => setActiveTab("properties")}
                    >
                      <Plus className="w-6 h-6" />
                      Ajouter Propriété
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col gap-2"
                      onClick={() => setActiveTab("agents")}
                    >
                      <Users className="w-6 h-6" />
                      Gérer Agents
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col gap-2"
                      onClick={() => setActiveTab("messages")}
                    >
                      <MessageSquare className="w-6 h-6" />
                      Voir Messages
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col gap-2"
                      onClick={() => setActiveTab("content")}
                    >
                      <FileText className="w-6 h-6" />
                      Modifier Contenu
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Properties Tab */}
            <TabsContent value="properties" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Gestion des Propriétés</CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-brand-blue hover:bg-brand-blue/90">
                          <Plus className="w-4 h-4 mr-2" />
                          Nouvelle Propriété
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            Ajouter une Nouvelle Propriété
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Titre</Label>
                              <Input placeholder="Villa Moderne..." />
                            </div>
                            <div className="space-y-2">
                              <Label>Prix</Label>
                              <Input placeholder="$250,000" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Localisation</Label>
                            <Input placeholder="Gombe, Kinshasa" />
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              placeholder="Description de la propriété..."
                              rows={4}
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>Chambres</Label>
                              <Input type="number" placeholder="4" />
                            </div>
                            <div className="space-y-2">
                              <Label>Salles de bain</Label>
                              <Input type="number" placeholder="3" />
                            </div>
                            <div className="space-y-2">
                              <Label>Surface (m²)</Label>
                              <Input placeholder="280" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Images</Label>
                            <Button variant="outline" className="w-full">
                              <Upload className="w-4 h-4 mr-2" />
                              Télécharger Images
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Button className="bg-brand-blue hover:bg-brand-blue/90">
                              <Save className="w-4 h-4 mr-2" />
                              Enregistrer
                            </Button>
                            <Button variant="outline">Annuler</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titre</TableHead>
                        <TableHead>Localisation</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Vues</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {properties.map((property) => (
                        <TableRow key={property.id}>
                          <TableCell className="font-medium">
                            {property.title}
                          </TableCell>
                          <TableCell>{property.location}</TableCell>
                          <TableCell>{property.price}</TableCell>
                          <TableCell>
                            {getStatusBadge(property.status)}
                          </TableCell>
                          <TableCell>{property.views}</TableCell>
                          <TableCell>{property.dateAdded}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Agents Tab */}
            <TabsContent value="agents" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Gestion des Agents</CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-brand-green hover:bg-brand-green/90">
                          <Plus className="w-4 h-4 mr-2" />
                          Nouvel Agent
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ajouter un Nouvel Agent</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Nom complet</Label>
                            <Input placeholder="Jean Mukendi" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Province</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="kinshasa">
                                    Kinshasa
                                  </SelectItem>
                                  <SelectItem value="katanga">
                                    Katanga
                                  </SelectItem>
                                  <SelectItem value="kasai">Kasaï</SelectItem>
                                  <SelectItem value="bas-congo">
                                    Bas-Congo
                                  </SelectItem>
                                  <SelectItem value="equateur">
                                    Équateur
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Téléphone</Label>
                              <Input placeholder="+243 994 052 587" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                              type="email"
                              placeholder="agent@youpendiselect.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Photo de profil</Label>
                            <Button variant="outline" className="w-full">
                              <Upload className="w-4 h-4 mr-2" />
                              Télécharger Photo
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Button className="bg-brand-green hover:bg-brand-green/90">
                              Enregistrer
                            </Button>
                            <Button variant="outline">Annuler</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Province</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Ventes</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agents.map((agent) => (
                        <TableRow key={agent.id}>
                          <TableCell className="font-medium">
                            {agent.name}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {agent.province}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{agent.phone}</div>
                              <div className="text-gray-500">{agent.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{agent.sales}</TableCell>
                          <TableCell>{getStatusBadge(agent.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Messages Clients</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Sujet</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {messages.map((message) => (
                        <TableRow key={message.id}>
                          <TableCell className="font-medium">
                            {message.name}
                          </TableCell>
                          <TableCell>{message.email}</TableCell>
                          <TableCell>{message.subject}</TableCell>
                          <TableCell>{message.date}</TableCell>
                          <TableCell>
                            {getStatusBadge(message.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contenu de la Page d'Accueil</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Titre Principal</Label>
                      <Input defaultValue="TROUVEZ VOTRE MAISON À KINSHASA" />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        defaultValue="Découvrez notre sélection de propriétés premium..."
                        rows={3}
                      />
                    </div>
                    <Button className="bg-brand-blue hover:bg-brand-blue/90">
                      <Save className="w-4 h-4 mr-2" />
                      Sauvegarder
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Informations de Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Téléphone Principal</Label>
                      <Input defaultValue="+243 994 052 587" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email Principal</Label>
                      <Input defaultValue="contact@youpendiselect.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Adresse</Label>
                      <Textarea
                        defaultValue="Avenue de la Libération, Gombe, Kinshasa, RDC"
                        rows={2}
                      />
                    </div>
                    <Button className="bg-brand-green hover:bg-brand-green/90">
                      <Save className="w-4 h-4 mr-2" />
                      Sauvegarder
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <ReportEditor />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres Généraux</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nom du Site</Label>
                      <Input defaultValue="YOUPENDI IMMO SELECT" />
                    </div>
                    <div className="space-y-2">
                      <Label>Logo du Site</Label>
                      <Button variant="outline" className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Télécharger Nouveau Logo
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Description SEO</Label>
                      <Textarea
                        placeholder="Description pour les moteurs de recherche..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <Button className="bg-brand-blue hover:bg-brand-blue/90">
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder Paramètres
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
