import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Wrench,
  FileText,
  User,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  type: "payment" | "maintenance" | "contract" | "inspection" | "meeting";
  date: string;
  time?: string;
  property: string;
  tenant?: string;
  amount?: number;
  status: "upcoming" | "today" | "overdue" | "completed";
  priority: "low" | "medium" | "high";
  description?: string;
}

const CalendarSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showNewEvent, setShowNewEvent] = useState(false);

  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "Loyer - Jean Mukendi",
      type: "payment",
      date: "2024-12-01",
      property: "Villa Moderne Gombe",
      tenant: "Jean Mukendi",
      amount: 1200,
      status: "completed",
      priority: "medium",
    },
    {
      id: "2",
      title: "Réparation plomberie",
      type: "maintenance",
      date: "2024-12-03",
      time: "14:00",
      property: "Villa Moderne Gombe",
      tenant: "Jean Mukendi",
      status: "upcoming",
      priority: "high",
      description: "Fuite d'eau dans la salle de bain",
    },
    {
      id: "3",
      title: "Loyer - Marie Kabila",
      type: "payment",
      date: "2024-12-01",
      property: "Appartement Bandalungwa",
      tenant: "Marie Kabila",
      amount: 800,
      status: "overdue",
      priority: "high",
    },
    {
      id: "4",
      title: "Fin de contrat - Pierre",
      type: "contract",
      date: "2024-12-31",
      property: "Maison Familiale Lemba",
      tenant: "Pierre Tshisekedi",
      status: "upcoming",
      priority: "medium",
    },
    {
      id: "5",
      title: "Inspection annuelle",
      type: "inspection",
      date: "2024-12-15",
      time: "10:00",
      property: "Studio Kintambo",
      status: "upcoming",
      priority: "low",
    },
    {
      id: "6",
      title: "Loyer - Pierre Tshisekedi",
      type: "payment",
      date: "2024-12-15",
      property: "Maison Familiale Lemba",
      tenant: "Pierre Tshisekedi",
      amount: 950,
      status: "upcoming",
      priority: "medium",
    },
    {
      id: "7",
      title: "Réunion locataire",
      type: "meeting",
      date: "2024-12-10",
      time: "16:00",
      property: "Appartement Bandalungwa",
      tenant: "Marie Kabila",
      status: "upcoming",
      priority: "medium",
      description: "Discussion problème de voisinage",
    },
    {
      id: "8",
      title: "Loyer - Alice Mbuyi",
      type: "payment",
      date: "2024-12-01",
      property: "Studio Kintambo",
      tenant: "Alice Mbuyi",
      amount: 600,
      status: "today",
      priority: "medium",
    },
  ];

  const getTypeIcon = (type: CalendarEvent["type"]) => {
    const icons = {
      payment: <DollarSign className="w-4 h-4" />,
      maintenance: <Wrench className="w-4 h-4" />,
      contract: <FileText className="w-4 h-4" />,
      inspection: <CheckCircle className="w-4 h-4" />,
      meeting: <User className="w-4 h-4" />,
    };
    return icons[type];
  };

  const getTypeColor = (type: CalendarEvent["type"]) => {
    const colors = {
      payment: "bg-brand-blue",
      maintenance: "bg-orange-500",
      contract: "bg-purple-500",
      inspection: "bg-brand-green",
      meeting: "bg-gray-500",
    };
    return colors[type];
  };

  const getStatusBadge = (status: CalendarEvent["status"]) => {
    const variants = {
      upcoming: "outline",
      today: "default",
      overdue: "destructive",
      completed: "secondary",
    } as const;

    const labels = {
      upcoming: "À venir",
      today: "Aujourd'hui",
      overdue: "En retard",
      completed: "Terminé",
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const getPriorityIcon = (priority: CalendarEvent["priority"]) => {
    if (priority === "high") {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  // Navigation du calendrier
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  // Génération des jours du calendrier
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days = [];

    // Jours du mois précédent
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({ date: day, isCurrentMonth: false });
    }

    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true });
    }

    // Compléter la semaine
    const totalCells = Math.ceil(days.length / 7) * 7;
    for (let day = 1; days.length < totalCells; day++) {
      const date = new Date(year, month + 1, day);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return events.filter((event) => event.date === dateStr);
  };

  const todayEvents = events.filter((e) => e.status === "today");
  const upcomingEvents = events
    .filter((e) => e.status === "upcoming")
    .slice(0, 5);
  const overdueEvents = events.filter((e) => e.status === "overdue");

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aujourd'hui</p>
                <p className="text-2xl font-bold text-brand-blue">
                  {todayEvents.length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-brand-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">À venir</p>
                <p className="text-2xl font-bold text-brand-green">
                  {upcomingEvents.length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-brand-green" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En retard</p>
                <p className="text-2xl font-bold text-red-500">
                  {overdueEvents.length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ce mois</p>
                <p className="text-2xl font-bold">
                  {
                    events.filter((e) =>
                      e.date.startsWith(currentDate.toISOString().slice(0, 7)),
                    ).length
                  }
                </p>
              </div>
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Calendrier des Échéances
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="font-medium min-w-[140px] text-center">
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </span>
                <Button variant="outline" size="sm" onClick={goToNextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Dialog open={showNewEvent} onOpenChange={setShowNewEvent}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-brand-blue hover:bg-brand-blue/90"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Événement
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nouvel Événement</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Titre</Label>
                        <Input placeholder="Titre de l'événement" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Type d'événement" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="payment">Paiement</SelectItem>
                              <SelectItem value="maintenance">
                                Maintenance
                              </SelectItem>
                              <SelectItem value="contract">Contrat</SelectItem>
                              <SelectItem value="inspection">
                                Inspection
                              </SelectItem>
                              <SelectItem value="meeting">Réunion</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Priorité</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Priorité" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Faible</SelectItem>
                              <SelectItem value="medium">Moyen</SelectItem>
                              <SelectItem value="high">Élevé</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Input type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label>Heure</Label>
                          <Input type="time" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Propriété</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une propriété" />
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
                            <SelectItem value="studio">
                              Studio Kintambo
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Description de l'événement..." />
                      </div>
                      <div className="flex gap-2">
                        <Button className="bg-brand-blue hover:bg-brand-blue/90">
                          Créer
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowNewEvent(false)}
                        >
                          Annuler
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="p-2 text-center text-sm font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth().map((day, index) => {
                const dayEvents = getEventsForDate(day.date);
                const isToday =
                  day.date.toDateString() === new Date().toDateString();

                return (
                  <div
                    key={index}
                    className={`min-h-[60px] p-1 border rounded cursor-pointer hover:bg-gray-50 ${
                      !day.isCurrentMonth ? "text-gray-300 bg-gray-50" : ""
                    } ${isToday ? "bg-brand-blue/10 border-brand-blue" : "border-gray-200"}`}
                    onClick={() => setSelectedDate(day.date)}
                  >
                    <div
                      className={`text-sm ${isToday ? "font-bold text-brand-blue" : ""}`}
                    >
                      {day.date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded text-white truncate ${getTypeColor(event.type)}`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayEvents.length - 2} autres
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <Card>
          <CardHeader>
            <CardTitle>Événements à Venir</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Today's Events */}
            {todayEvents.length > 0 && (
              <div>
                <h4 className="font-medium text-brand-blue mb-2">
                  Aujourd'hui
                </h4>
                <div className="space-y-2">
                  {todayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 bg-blue-50 rounded-lg border-l-4 border-brand-blue"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(event.type)}
                            <span className="font-medium text-sm">
                              {event.title}
                            </span>
                            {getPriorityIcon(event.priority)}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {event.property}
                            {event.time && ` • ${event.time}`}
                            {event.amount && ` • $${event.amount}`}
                          </div>
                        </div>
                        {getStatusBadge(event.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overdue Events */}
            {overdueEvents.length > 0 && (
              <div>
                <h4 className="font-medium text-red-500 mb-2">En Retard</h4>
                <div className="space-y-2">
                  {overdueEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(event.type)}
                            <span className="font-medium text-sm">
                              {event.title}
                            </span>
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {event.property}
                            {event.amount && ` • $${event.amount}`}
                          </div>
                        </div>
                        {getStatusBadge(event.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Events */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">
                Prochains Événements
              </h4>
              <div className="space-y-2">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(event.type)}
                          <span className="font-medium text-sm">
                            {event.title}
                          </span>
                          {getPriorityIcon(event.priority)}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {event.date} {event.time && `• ${event.time}`}
                        </div>
                        <div className="text-xs text-gray-600">
                          {event.property}
                          {event.amount && ` • $${event.amount}`}
                        </div>
                      </div>
                      {getStatusBadge(event.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarSchedule;
