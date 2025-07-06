import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PDFGenerator from "@/components/PDFGenerator";
import ContractManagement from "@/components/dashboard/ContractManagement";
import PaymentTracking from "@/components/dashboard/PaymentTracking";
import MaintenanceRequests from "@/components/dashboard/MaintenanceRequests";
import FinancialReports from "@/components/dashboard/FinancialReports";
import CalendarSchedule from "@/components/dashboard/CalendarSchedule";
import NotificationCenter from "@/components/dashboard/NotificationCenter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  Wrench,
  BarChart3,
  Calendar,
  Bell,
  TrendingUp,
  TrendingDown,
  Building,
  Users,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isOwner, setIsOwner] = useState(false);
  const [accessKey, setAccessKey] = useState("");

  // Vérification d'accès propriétaire
  const verifyOwnerAccess = () => {
    const ownerKeys = ["proprietaire", "owner", "123456", "admin"];
    if (ownerKeys.includes(accessKey.toLowerCase())) {
      setIsOwner(true);
    } else {
      alert("Clé d'accès incorrecte. Accès refusé.");
    }
  };

  // Si pas propriétaire, afficher la page de vérification
  if (!isOwner) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  Accès Propriétaire Requis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-gray-600">
                  Ce tableau de bord est réservé aux propriétaires. Veuillez
                  saisir votre clé d'accès.
                </p>
                <div className="space-y-2">
                  <Label>Clé d'Accès Propriétaire</Label>
                  <Input
                    type="password"
                    placeholder="Saisissez votre clé d'accès"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && verifyOwnerAccess()}
                  />
                </div>
                <Button
                  onClick={verifyOwnerAccess}
                  className="w-full bg-brand-blue hover:bg-brand-blue/90"
                >
                  Vérifier l'Accès
                </Button>
                <p className="text-xs text-center text-gray-500">
                  Clés acceptées: proprietaire, owner, 123456, admin
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Données du tableau de bord global
  const dashboardStats = {
    totalProperties: 4,
    activeContracts: 3,
    monthlyRevenue: 3550,
    occupancyRate: 95.8,
    pendingMaintenance: 2,
    overduePayments: 1,
    upcomingDeadlines: 3,
    unreadNotifications: 5,
  };

  const recentActivities = [
    {
      id: 1,
      type: "payment",
      title: "Paiement reçu",
      description: "Jean Mukendi - Villa Gombe - $1,200",
      timestamp: "Il y a 2 heures",
      status: "success",
    },
    {
      id: 2,
      type: "maintenance",
      title: "Nouvelle demande",
      description: "Fuite d'eau - Villa Gombe",
      timestamp: "Il y a 4 heures",
      status: "pending",
    },
    {
      id: 3,
      type: "payment",
      title: "Paiement en retard",
      description: "Marie Kabila - Appartement Bandalungwa",
      timestamp: "Il y a 1 jour",
      status: "warning",
    },
    {
      id: 4,
      type: "contract",
      title: "Contrat renouvelé",
      description: "Alice Mbuyi - Studio Kintambo",
      timestamp: "Il y a 2 jours",
      status: "success",
    },
  ];

  const getActivityIcon = (type: string) => {
    const icons = {
      payment: <DollarSign className="w-4 h-4" />,
      maintenance: <Wrench className="w-4 h-4" />,
      contract: <FileText className="w-4 h-4" />,
    };
    return icons[type as keyof typeof icons];
  };

  const getActivityColor = (status: string) => {
    const colors = {
      success: "text-green-600 bg-green-50",
      pending: "text-yellow-600 bg-yellow-50",
      warning: "text-red-600 bg-red-50",
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Tableau de Bord Propriétaire
              </h1>
              <p className="text-gray-600">
                Gérez vos propriétés et suivez vos performances en temps réel
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-600">
                {dashboardStats.unreadNotifications} notifications
              </Badge>
              <Button className="bg-brand-blue hover:bg-brand-blue/90">
                <Bell className="w-4 h-4 mr-2" />
                Voir toutes
              </Button>
            </div>
          </div>

          {/* Main Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-8">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Aperçu
              </TabsTrigger>
              <TabsTrigger
                value="contracts"
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Contrats
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Paiements
              </TabsTrigger>
              <TabsTrigger
                value="maintenance"
                className="flex items-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                Maintenance
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Rapports
              </TabsTrigger>
              <TabsTrigger value="pdf" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Imprimer PDF
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Calendrier
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center gap-2"
              >
                <Bell className="w-4 h-4" />
                Notifications
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Propriétés</p>
                        <p className="text-2xl font-bold text-brand-blue">
                          {dashboardStats.totalProperties}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <TrendingUp className="w-3 h-3" />
                          +1 ce mois
                        </div>
                      </div>
                      <Building className="w-8 h-8 text-brand-blue" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          Revenus Mensuels
                        </p>
                        <p className="text-2xl font-bold text-brand-green">
                          ${dashboardStats.monthlyRevenue.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <TrendingUp className="w-3 h-3" />
                          +12% vs mois dernier
                        </div>
                      </div>
                      <DollarSign className="w-8 h-8 text-brand-green" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">
                          Taux d'Occupation
                        </p>
                        <p className="text-2xl font-bold text-purple-600">
                          {dashboardStats.occupancyRate}%
                        </p>
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <TrendingUp className="w-3 h-3" />
                          +2.1% ce mois
                        </div>
                      </div>
                      <Users className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Contrats Actifs</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {dashboardStats.activeContracts}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3" />
                          Tous à jour
                        </div>
                      </div>
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Actions Rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setActiveTab("contracts")}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Nouveau Contrat
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setActiveTab("payments")}
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Enregistrer Paiement
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setActiveTab("maintenance")}
                    >
                      <Wrench className="w-4 h-4 mr-2" />
                      Demande Maintenance
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setActiveTab("calendar")}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Planifier Événement
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Activité Récente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div
                            className={`p-2 rounded-full ${getActivityColor(activity.status)}`}
                          >
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">
                              {activity.title}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {activity.description}
                            </p>
                            <p className="text-xs text-gray-500">
                              {activity.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Alerts & Warnings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-800">
                          Maintenance en attente
                        </p>
                        <p className="text-sm text-yellow-700">
                          {dashboardStats.pendingMaintenance} demandes à traiter
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                      <div>
                        <p className="font-medium text-red-800">
                          Paiements en retard
                        </p>
                        <p className="text-sm text-red-700">
                          {dashboardStats.overduePayments} paiement en attente
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800">
                          Échéances à venir
                        </p>
                        <p className="text-sm text-blue-700">
                          {dashboardStats.upcomingDeadlines} événements cette
                          semaine
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Contracts Tab */}
            <TabsContent value="contracts">
              <ContractManagement />
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments">
              <PaymentTracking />
            </TabsContent>

            {/* Maintenance Tab */}
            <TabsContent value="maintenance">
              <MaintenanceRequests />
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports">
              <FinancialReports />
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar">
              <CalendarSchedule />
            </TabsContent>

            {/* PDF Tab */}
            <TabsContent value="pdf" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Rapports Financiers PDF</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PDFGenerator
                      reportType="financial"
                      title="Rapport Financier Propriétaire"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Rapports Propriétés PDF</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PDFGenerator
                      reportType="property"
                      title="Rapport Gestion Propriétés"
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <NotificationCenter />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
