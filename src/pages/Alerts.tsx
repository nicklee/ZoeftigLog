
import React from "react";
import { 
  AlertCircle, 
  Clock, 
  FileText, 
  TrendingUp, 
  Filter,
  ArrowUpRight,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Ship,
  Plane,
  Truck
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { alerts, shipments } from "@/lib/mockData";
import { Link } from "react-router-dom";

const SEVERITY_COLORS = {
  High: "border-red-500 bg-red-50 text-red-700",
  Medium: "border-amber-500 bg-amber-50 text-amber-700",
  Low: "border-blue-500 bg-blue-50 text-blue-700",
};

const TYPE_ICONS = {
  "Urgent Action": AlertCircle,
  "Delay": Clock,
  "Missing Document": FileText,
  "At Risk": TrendingUp,
};

export const Alerts = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts & Actions</h1>
          <p className="text-muted-foreground">Prioritized list of tasks, overdue paperwork, and operational blockers.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Clear Selected
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Quick Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium">Severity</label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="destructive">High</Badge>
                <Badge variant="outline">Medium</Badge>
                <Badge variant="outline">Low</Badge>
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <label className="text-xs font-medium">Type</label>
              <nav className="flex flex-col gap-1">
                {["All Actions", "Overdue Paperwork", "Logistics Delays", "At Risk Projects"].map((filter, i) => (
                  <Button key={i} variant="ghost" className="justify-start text-xs h-8 px-2 font-normal">
                    {filter}
                  </Button>
                ))}
              </nav>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3 space-y-4">
          {alerts.map((alert) => {
            const Icon = TYPE_ICONS[alert.type] || Info;
            const shipment = shipments.find(s => s.id === alert.shipmentId);
            
            return (
              <Card key={alert.id} className={cn("overflow-hidden transition-all hover:shadow-md", SEVERITY_COLORS[alert.severity])}>
                <div className="flex">
                  <div className={cn("w-16 flex flex-col items-center justify-center border-r shrink-0", 
                    alert.severity === "High" ? "bg-red-100" : alert.severity === "Medium" ? "bg-amber-100" : "bg-blue-100"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardContent className="flex-1 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-white/50">{alert.type}</Badge>
                        <span className="text-xs font-medium opacity-60">Posted {alert.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-1">{alert.message}</h3>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 bg-white/40 px-3 py-1.5 rounded-lg border border-white/50 text-sm font-medium">
                        <Ship className="w-4 h-4" />
                        <span>{alert.shipmentRef}</span>
                      </div>
                      {shipment && (
                        <div className="text-sm font-medium opacity-70">
                          {shipment.projectName}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-3 border-t border-black/5 pt-4">
                      <Button variant="ghost" size="sm" className="bg-white/30">Remind Me Later</Button>
                      <Button asChild size="sm" className={cn(
                        alert.severity === "High" ? "bg-red-600 hover:bg-red-700 text-white" : 
                        alert.severity === "Medium" ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                      )}>
                        <Link to={`/shipments/${alert.shipmentId}`}>
                          Resolve Now <ArrowUpRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Info = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);
