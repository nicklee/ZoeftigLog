
import React from "react";
import { 
  Plus, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp,
  Package,
  Calendar,
  MoreVertical,
  Ship,
  Plane,
  Truck
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { shipments, alerts } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const STATUS_COLORS: Record<string, string> = {
  "In transit": "#3b82f6",
  "In production": "#94a3b8",
  "Customs paperwork required": "#f59e0b",
  "Delayed": "#ef4444",
  "Ready for dispatch": "#10b981",
  "Delivered": "#10b981",
  "Installed": "#10b981",
};

export const Dashboard = () => {
  const stats = [
    { label: "Total Live Shipments", value: shipments.length, icon: Ship, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Overdue Documents", value: shipments.flatMap(s => s.documents).filter(d => d.status === "Overdue" || d.status === "Missing").length, icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-100" },
    { label: "At Risk Shipments", value: shipments.filter(s => s.riskLevel === "High").length, icon: TrendingUp, color: "text-red-600", bg: "bg-red-100" },
    { label: "Planned Arrivals (7d)", value: 2, icon: Calendar, color: "text-green-600", bg: "bg-green-100" },
  ];

  const statusData = shipments.reduce((acc, s) => {
    const existing = acc.find(i => i.name === s.status);
    if (existing) existing.value++;
    else acc.push({ name: s.status, value: 1 });
    return acc;
  }, [] as { name: string, value: number }[]);

  const modeData = [
    { name: "Sea", value: shipments.filter(s => s.mode === "Sea").length },
    { name: "Air", value: shipments.filter(s => s.mode === "Air").length },
    { name: "Road", value: shipments.filter(s => s.mode === "Road").length },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Logistics Control Tower</h1>
          <p className="text-muted-foreground">Monitoring all shipments, milestones, and documentation across the supply chain.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" id="export-btn">Export Report</Button>
          <Button className="gap-2" id="new-shipment-btn">
            <Plus className="w-4 h-4" />
            New Shipment
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className={cn("p-2 rounded-lg", stat.bg)}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Charts area */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Shipments by Status</CardTitle>
            <CardDescription>Real-time view of all active shipment stages.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis fontSize={11} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || "#94a3b8"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Mode Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Modes</CardTitle>
            <CardDescription>Volume split by transport method.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={modeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#f43f5e" />
                    <Cell fill="#10b981" />
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full mt-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase mb-1">Sea</p>
                <div className="flex items-center justify-center gap-1">
                  <Ship className="w-3 h-3 text-blue-500" />
                  <span className="font-bold">{shipments.filter(s => s.mode === "Sea").length}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase mb-1">Air</p>
                <div className="flex items-center justify-center gap-1">
                  <Plane className="w-3 h-3 text-rose-500" />
                  <span className="font-bold">{shipments.filter(s => s.mode === "Air").length}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase mb-1">Road</p>
                <div className="flex items-center justify-center gap-1">
                  <Truck className="w-3 h-3 text-emerald-500" />
                  <span className="font-bold">{shipments.filter(s => s.mode === "Road").length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Urgent Alerts */}
        <Card className="border-red-100 bg-red-50/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-red-900">Urgent Actions Required</CardTitle>
              <CardDescription className="text-red-800/60">Documentation or delays needing immediate attention.</CardDescription>
            </div>
            <AlertCircle className="w-5 h-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.filter(a => a.severity === "High").map((alert) => (
                <div key={alert.id} className="flex gap-4 p-4 rounded-xl bg-white border border-red-100 shadow-sm relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wider">{alert.type}</span>
                      <span className="text-xs text-muted-foreground">{alert.date}</span>
                    </div>
                    <p className="font-semibold text-sm mb-1">{alert.message}</p>
                    <p className="text-xs text-muted-foreground truncate">Shipment: {alert.shipmentRef}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0"><ArrowUpRight className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-4 text-red-600 p-0 h-auto" id="all-alerts-link">View all alerts</Button>
          </CardContent>
        </Card>

        {/* Paperwork Health */}
        <Card>
          <CardHeader>
            <CardTitle>Documentation Health</CardTitle>
            <CardDescription>Completion status of required shipping paperwork.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { label: "Commercial Invoices", completed: 3, total: 4 },
                { label: "Packing Lists", completed: 2, total: 4 },
                { label: "Bills of Lading / AWB", completed: 3, total: 3 },
                { label: "Customs Clearances", completed: 1, total: 4 },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-muted-foreground">{item.label}</span>
                    <span className="font-bold">{Math.round((item.completed / item.total) * 100)}%</span>
                  </div>
                  <Progress value={(item.completed / item.total) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
