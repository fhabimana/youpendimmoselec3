import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Download,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Target,
} from "lucide-react";

const FinancialReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("2024");
  const [selectedProperty, setSelectedProperty] = useState("all");

  // Données pour les graphiques
  const monthlyRevenue = [
    { month: "Jan", revenue: 3550, expenses: 800, profit: 2750 },
    { month: "Fév", revenue: 3550, expenses: 1200, profit: 2350 },
    { month: "Mar", revenue: 3550, expenses: 950, profit: 2600 },
    { month: "Avr", revenue: 3550, expenses: 1100, profit: 2450 },
    { month: "Mai", revenue: 3550, expenses: 850, profit: 2700 },
    { month: "Jun", revenue: 3550, expenses: 1300, profit: 2250 },
    { month: "Jul", revenue: 3550, expenses: 900, profit: 2650 },
    { month: "Aoû", revenue: 3550, expenses: 1050, profit: 2500 },
    { month: "Sep", revenue: 3550, expenses: 800, profit: 2750 },
    { month: "Oct", revenue: 3550, expenses: 1150, profit: 2400 },
    { month: "Nov", revenue: 3550, expenses: 950, profit: 2600 },
    { month: "Déc", revenue: 3550, expenses: 1000, profit: 2550 },
  ];

  const propertyRevenue = [
    { property: "Villa Gombe", revenue: 14400, percentage: 40.5 },
    { property: "Apt Bandalungwa", revenue: 9600, percentage: 27.0 },
    { property: "Maison Lemba", revenue: 11400, percentage: 32.1 },
    { property: "Studio Kintambo", revenue: 7200, percentage: 20.2 },
  ];

  const expenseCategories = [
    { category: "Maintenance", amount: 4200, percentage: 35 },
    { category: "Taxes", amount: 3600, percentage: 30 },
    { category: "Assurances", amount: 2400, percentage: 20 },
    { category: "Gestion", amount: 1800, percentage: 15 },
  ];

  const occupancyTrend = [
    { month: "Jan", rate: 95 },
    { month: "Fév", rate: 98 },
    { month: "Mar", rate: 92 },
    { month: "Avr", rate: 100 },
    { month: "Mai", rate: 95 },
    { month: "Jun", rate: 88 },
    { month: "Jul", rate: 95 },
    { month: "Aoû", rate: 100 },
    { month: "Sep", rate: 95 },
    { month: "Oct", rate: 98 },
    { month: "Nov", rate: 100 },
    { month: "Déc", rate: 95 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Calculs des métriques clés
  const totalRevenue = monthlyRevenue.reduce(
    (sum, item) => sum + item.revenue,
    0,
  );
  const totalExpenses = monthlyRevenue.reduce(
    (sum, item) => sum + item.expenses,
    0,
  );
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = ((netProfit / totalRevenue) * 100).toFixed(1);
  const avgOccupancy = (
    occupancyTrend.reduce((sum, item) => sum + item.rate, 0) /
    occupancyTrend.length
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Rapports Financiers</h2>
          <p className="text-gray-600">Analyse détaillée de vos performances</p>
        </div>
        <div className="flex gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les propriétés</SelectItem>
              <SelectItem value="villa">Villa Gombe</SelectItem>
              <SelectItem value="apt">Appartement Bandalungwa</SelectItem>
              <SelectItem value="maison">Maison Lemba</SelectItem>
              <SelectItem value="studio">Studio Kintambo</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenus Totaux</p>
                <p className="text-2xl font-bold text-brand-blue">
                  ${totalRevenue.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  +12.5%
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-brand-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Dépenses Totales</p>
                <p className="text-2xl font-bold text-orange-600">
                  ${totalExpenses.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <TrendingUp className="w-3 h-3" />
                  +8.2%
                </div>
              </div>
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bénéfice Net</p>
                <p className="text-2xl font-bold text-brand-green">
                  ${netProfit.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  Marge: {profitMargin}%
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-brand-green" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taux d'Occupation</p>
                <p className="text-2xl font-bold text-purple-600">
                  {avgOccupancy}%
                </p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  +2.1%
                </div>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analysis */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenus & Profits</TabsTrigger>
          <TabsTrigger value="properties">Par Propriété</TabsTrigger>
          <TabsTrigger value="expenses">Dépenses</TabsTrigger>
          <TabsTrigger value="occupancy">Occupation</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Évolution Mensuelle - Revenus vs Dépenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                      labelFormatter={(label) => `Mois: ${label}`}
                    />
                    <Bar dataKey="revenue" fill="#0088FE" name="Revenus" />
                    <Bar dataKey="expenses" fill="#FF8042" name="Dépenses" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profit Net Mensuel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        "Profit",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      stroke="#00C49F"
                      fill="#00C49F"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5" />
                  Répartition des Revenus par Propriété
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={propertyRevenue}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="revenue"
                        label={({ property, percentage }) =>
                          `${property}: ${percentage}%`
                        }
                      >
                        {propertyRevenue.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `$${value.toLocaleString()}`,
                          "Revenus",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance par Propriété</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {propertyRevenue.map((property, index) => (
                    <div
                      key={property.property}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        <span className="font-medium">{property.property}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          ${property.revenue.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {property.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des Dépenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                        label={({ category, percentage }) =>
                          `${category}: ${percentage}%`
                        }
                      >
                        {expenseCategories.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `$${value.toLocaleString()}`,
                          "Montant",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Détail des Dépenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseCategories.map((category, index) => (
                    <div
                      key={category.category}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        <span className="font-medium">{category.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          ${category.amount.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {category.percentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                      $
                      {expenseCategories
                        .reduce((sum, cat) => sum + cat.amount, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="occupancy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Taux d'Occupation Mensuel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={occupancyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Taux d'occupation"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#8884d8"
                      strokeWidth={3}
                      dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-blue">
                    95.8%
                  </div>
                  <div className="text-sm text-gray-600">Taux moyen</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-green">
                    100%
                  </div>
                  <div className="text-sm text-gray-600">Taux maximum</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">88%</div>
                  <div className="text-sm text-gray-600">Taux minimum</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialReports;
