import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Settings,
  Mail,
  Smartphone,
  AlertTriangle,
  DollarSign,
  Wrench,
  FileText,
  Calendar,
  Check,
  X,
  Volume2,
  VolumeX,
  Eye,
  Trash2,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "payment" | "maintenance" | "contract" | "reminder" | "alert";
  priority: "low" | "medium" | "high" | "urgent";
  timestamp: string;
  isRead: boolean;
  actionRequired: boolean;
  relatedProperty?: string;
  relatedTenant?: string;
}

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  sound: boolean;
  frequency: "immediate" | "daily" | "weekly";
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Paiement en retard",
      message:
        "Le loyer de Marie Kabila (Appartement Bandalungwa) est en retard de 3 jours.",
      type: "payment",
      priority: "high",
      timestamp: "2024-12-04T09:30:00",
      isRead: false,
      actionRequired: true,
      relatedProperty: "Appartement Bandalungwa",
      relatedTenant: "Marie Kabila",
    },
    {
      id: "2",
      title: "Demande de maintenance urgente",
      message:
        "Nouvelle demande de maintenance : Fuite d'eau dans la salle de bain (Villa Gombe)",
      type: "maintenance",
      priority: "urgent",
      timestamp: "2024-12-04T08:15:00",
      isRead: false,
      actionRequired: true,
      relatedProperty: "Villa Moderne Gombe",
      relatedTenant: "Jean Mukendi",
    },
    {
      id: "3",
      title: "Contrat expirant bientôt",
      message:
        "Le contrat de Pierre Tshisekedi expire dans 30 jours. Pensez à le renouveler.",
      type: "contract",
      priority: "medium",
      timestamp: "2024-12-04T07:00:00",
      isRead: true,
      actionRequired: true,
      relatedProperty: "Maison Familiale Lemba",
      relatedTenant: "Pierre Tshisekedi",
    },
    {
      id: "4",
      title: "Paiement reçu",
      message:
        "Paiement de $1,200 reçu de Jean Mukendi pour le mois de décembre.",
      type: "payment",
      priority: "low",
      timestamp: "2024-12-03T14:20:00",
      isRead: true,
      actionRequired: false,
      relatedProperty: "Villa Moderne Gombe",
      relatedTenant: "Jean Mukendi",
    },
    {
      id: "5",
      title: "Rappel inspection",
      message:
        "Inspection annuelle programmée pour le Studio Kintambo le 15 décembre.",
      type: "reminder",
      priority: "medium",
      timestamp: "2024-12-03T10:00:00",
      isRead: false,
      actionRequired: false,
      relatedProperty: "Studio Kintambo",
    },
    {
      id: "6",
      title: "Maintenance terminée",
      message:
        "Réparation électrique terminée au Studio Kintambo. Facture : $120",
      type: "maintenance",
      priority: "low",
      timestamp: "2024-12-02T16:45:00",
      isRead: true,
      actionRequired: false,
      relatedProperty: "Studio Kintambo",
      relatedTenant: "Alice Mbuyi",
    },
    {
      id: "7",
      title: "Nouveau message locataire",
      message:
        "Alice Mbuyi a envoyé un message concernant le chauffage de son studio.",
      type: "alert",
      priority: "medium",
      timestamp: "2024-12-02T11:30:00",
      isRead: false,
      actionRequired: true,
      relatedProperty: "Studio Kintambo",
      relatedTenant: "Alice Mbuyi",
    },
  ]);

  const [settings, setSettings] = useState<{
    payment: NotificationSettings;
    maintenance: NotificationSettings;
    contract: NotificationSettings;
    reminder: NotificationSettings;
    alert: NotificationSettings;
  }>({
    payment: {
      email: true,
      sms: true,
      push: true,
      sound: true,
      frequency: "immediate",
    },
    maintenance: {
      email: true,
      sms: true,
      push: true,
      sound: true,
      frequency: "immediate",
    },
    contract: {
      email: true,
      sms: false,
      push: true,
      sound: false,
      frequency: "daily",
    },
    reminder: {
      email: true,
      sms: false,
      push: true,
      sound: false,
      frequency: "daily",
    },
    alert: {
      email: true,
      sms: true,
      push: true,
      sound: true,
      frequency: "immediate",
    },
  });

  const getTypeIcon = (type: Notification["type"]) => {
    const icons = {
      payment: <DollarSign className="w-4 h-4" />,
      maintenance: <Wrench className="w-4 h-4" />,
      contract: <FileText className="w-4 h-4" />,
      reminder: <Calendar className="w-4 h-4" />,
      alert: <AlertTriangle className="w-4 h-4" />,
    };
    return icons[type];
  };

  const getTypeColor = (type: Notification["type"]) => {
    const colors = {
      payment: "text-brand-blue bg-blue-50",
      maintenance: "text-orange-600 bg-orange-50",
      contract: "text-purple-600 bg-purple-50",
      reminder: "text-brand-green bg-green-50",
      alert: "text-red-600 bg-red-50",
    };
    return colors[type];
  };

  const getPriorityBadge = (priority: Notification["priority"]) => {
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

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true })),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const updateSettings = (
    type: keyof typeof settings,
    key: keyof NotificationSettings,
    value: boolean | string,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: value,
      },
    }));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const urgentCount = notifications.filter(
    (n) => !n.isRead && (n.priority === "high" || n.priority === "urgent"),
  ).length;
  const actionRequiredCount = notifications.filter(
    (n) => !n.isRead && n.actionRequired,
  ).length;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Il y a quelques minutes";
    } else if (diffInHours < 24) {
      return `Il y a ${Math.floor(diffInHours)} heure${Math.floor(diffInHours) > 1 ? "s" : ""}`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Non lues</p>
                <p className="text-2xl font-bold text-brand-blue">
                  {unreadCount}
                </p>
              </div>
              <Bell className="w-8 h-8 text-brand-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Urgentes</p>
                <p className="text-2xl font-bold text-red-500">{urgentCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Action requise</p>
                <p className="text-2xl font-bold text-orange-500">
                  {actionRequiredCount}
                </p>
              </div>
              <Settings className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
              <Bell className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Centre de Notifications
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" onClick={markAllAsRead}>
                <Check className="w-4 h-4 mr-2" />
                Tout marquer lu
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="notifications" className="space-y-4">
            <TabsList>
              <TabsTrigger value="notifications">
                Notifications ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            <TabsContent value="notifications" className="space-y-4">
              {/* Filter Tabs */}
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">
                    Toutes ({notifications.length})
                  </TabsTrigger>
                  <TabsTrigger value="unread">
                    Non lues ({unreadCount})
                  </TabsTrigger>
                  <TabsTrigger value="urgent">
                    Urgentes ({urgentCount})
                  </TabsTrigger>
                  <TabsTrigger value="action">
                    Action requise ({actionRequiredCount})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border transition-all ${
                          notification.isRead
                            ? "bg-gray-50 border-gray-200"
                            : "bg-white border-brand-blue shadow-sm"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-full ${getTypeColor(notification.type)}`}
                              >
                                {getTypeIcon(notification.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4
                                    className={`font-medium ${
                                      notification.isRead
                                        ? "text-gray-600"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    {notification.title}
                                  </h4>
                                  {getPriorityBadge(notification.priority)}
                                  {notification.actionRequired && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      Action requise
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                                  <span>
                                    {formatTime(notification.timestamp)}
                                  </span>
                                  {notification.relatedProperty && (
                                    <>
                                      <span>•</span>
                                      <span>
                                        {notification.relatedProperty}
                                      </span>
                                    </>
                                  )}
                                  {notification.relatedTenant && (
                                    <>
                                      <span>•</span>
                                      <span>{notification.relatedTenant}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="unread">
                  <div className="space-y-3">
                    {notifications
                      .filter((n) => !n.isRead)
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 rounded-lg border bg-white border-brand-blue shadow-sm"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`p-2 rounded-full ${getTypeColor(notification.type)}`}
                                >
                                  {getTypeIcon(notification.type)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-gray-900">
                                      {notification.title}
                                    </h4>
                                    {getPriorityBadge(notification.priority)}
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {notification.message}
                                  </p>
                                  <div className="text-xs text-gray-500 mt-2">
                                    {formatTime(notification.timestamp)}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="urgent">
                  <div className="space-y-3">
                    {notifications
                      .filter(
                        (n) => n.priority === "high" || n.priority === "urgent",
                      )
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 rounded-lg border-2 border-red-200 bg-red-50"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-red-100 text-red-600">
                                  {getTypeIcon(notification.type)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-gray-900">
                                      {notification.title}
                                    </h4>
                                    {getPriorityBadge(notification.priority)}
                                  </div>
                                  <p className="text-sm text-gray-700 mt-1">
                                    {notification.message}
                                  </p>
                                  <div className="text-xs text-gray-600 mt-2">
                                    {formatTime(notification.timestamp)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="action">
                  <div className="space-y-3">
                    {notifications
                      .filter((n) => n.actionRequired)
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 rounded-lg border border-orange-200 bg-orange-50"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-orange-100 text-orange-600">
                                  {getTypeIcon(notification.type)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-gray-900">
                                      {notification.title}
                                    </h4>
                                    <Badge
                                      variant="outline"
                                      className="bg-orange-100 text-orange-700"
                                    >
                                      Action requise
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-700 mt-1">
                                    {notification.message}
                                  </p>
                                  <div className="text-xs text-gray-600 mt-2">
                                    {formatTime(notification.timestamp)}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              className="bg-orange-600 hover:bg-orange-700"
                            >
                              Traiter
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Paramètres de Notification
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Configurez comment et quand vous souhaitez recevoir les
                    notifications.
                  </p>
                </div>

                {Object.entries(settings).map(([type, typeSettings]) => (
                  <Card key={type}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        {getTypeIcon(type as Notification["type"])}
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`${type}-email`}
                            checked={typeSettings.email}
                            onCheckedChange={(checked) =>
                              updateSettings(
                                type as keyof typeof settings,
                                "email",
                                checked,
                              )
                            }
                          />
                          <Label
                            htmlFor={`${type}-email`}
                            className="flex items-center gap-2"
                          >
                            <Mail className="w-4 h-4" />
                            Email
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`${type}-sms`}
                            checked={typeSettings.sms}
                            onCheckedChange={(checked) =>
                              updateSettings(
                                type as keyof typeof settings,
                                "sms",
                                checked,
                              )
                            }
                          />
                          <Label
                            htmlFor={`${type}-sms`}
                            className="flex items-center gap-2"
                          >
                            <Smartphone className="w-4 h-4" />
                            SMS
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`${type}-push`}
                            checked={typeSettings.push}
                            onCheckedChange={(checked) =>
                              updateSettings(
                                type as keyof typeof settings,
                                "push",
                                checked,
                              )
                            }
                          />
                          <Label
                            htmlFor={`${type}-push`}
                            className="flex items-center gap-2"
                          >
                            <Bell className="w-4 h-4" />
                            Push
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`${type}-sound`}
                            checked={typeSettings.sound}
                            onCheckedChange={(checked) =>
                              updateSettings(
                                type as keyof typeof settings,
                                "sound",
                                checked,
                              )
                            }
                          />
                          <Label
                            htmlFor={`${type}-sound`}
                            className="flex items-center gap-2"
                          >
                            {typeSettings.sound ? (
                              <Volume2 className="w-4 h-4" />
                            ) : (
                              <VolumeX className="w-4 h-4" />
                            )}
                            Son
                          </Label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Fréquence</Label>
                        <Select
                          value={typeSettings.frequency}
                          onValueChange={(value) =>
                            updateSettings(
                              type as keyof typeof settings,
                              "frequency",
                              value,
                            )
                          }
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immédiat</SelectItem>
                            <SelectItem value="daily">Quotidien</SelectItem>
                            <SelectItem value="weekly">Hebdomadaire</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="pt-4">
                  <Button className="bg-brand-blue hover:bg-brand-blue/90">
                    Sauvegarder les Paramètres
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
