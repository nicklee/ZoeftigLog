
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
import { Input } from "@/components/ui/input";
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
    { label: "Live Shipments", value: shipments.length, meta: "↑ 4 since last week", metaColor: "text-emerald-500" },
    { label: "At Risk / Delayed", value: "07", meta: "Requires attention", metaColor: "text-red-500", valueColor: "text-red-600" },
    { label: "Paperwork Pending", value: "12", meta: "3 Overdue", metaColor: "text-amber-500" },
    { label: "Arrivals (7 Days)", value: "18", meta: "4 at Customs", metaColor: "text-slate-500" },
  ];

  const statusData = shipments.reduce((acc, s) => {
    const existing = acc.find(i => i.name === s.status);
    if (existing) existing.value++;
    else acc.push({ name: s.status, value: 1 });
    return acc;
  }, [] as { name: string, value: number }[]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="header-left">
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a]">ZoeftigOps Dashboard</h1>
          <p className="text-sm text-slate-500">Real-time logistics status for October 24, 2024</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
            <h3 className={cn("text-2xl font-bold my-1", stat.valueColor || "text-[#0f172a]")}>{stat.value}</h3>
            <p className={cn("text-[11px] font-medium", stat.metaColor)}>{stat.meta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Trackers area */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-800">Critical Trackers</h2>
            <Input placeholder="Filter..." className="h-8 w-40 text-xs" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="px-4 py-3">Ref #</th>
                  <th className="px-4 py-3">Project / Customer</th>
                  <th className="px-4 py-3">Origin / Mode</th>
                  <th className="px-4 py-3">ETA</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {shipments.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => window.location.href=`/shipments/${s.id}`}>
                    <td className="px-4 py-3 font-bold">{s.reference.replace("AS-", "SHP-")}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold">{s.projectName}</div>
                      <div className="text-slate-400 text-[10px]">{s.customerName}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{s.origin} / {s.mode}</td>
                    <td className="px-4 py-3 font-medium text-slate-700">{s.eta.split("-").slice(1).join("/")}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                        s.status === "In transit" ? "bg-blue-100 text-blue-700" :
                        s.status === "Delayed" ? "bg-red-100 text-red-700" :
                        s.status === "Customs paperwork required" ? "bg-amber-100 text-amber-700" :
                        "bg-slate-100 text-slate-600"
                      )}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Required Sidebar */}
        <div className="bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-sm font-bold text-slate-800">Action Required</h2>
          </div>
          <div className="p-4 space-y-3 overflow-y-auto max-h-[500px]">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={cn(
                  "p-3 rounded-lg border-l-4 text-xs",
                  alert.severity === "High" ? "bg-red-50/50 border-red-500" : "bg-slate-50/50 border-primary"
                )}
              >
                <div className="font-bold text-[#0f172a] mb-0.5">{alert.message.split(" for ")[0]}</div>
                <div className="text-slate-500">{alert.shipmentRef} - {alert.message.includes("overdue") ? "Overdue" : "Action Req"}</div>
                <div className="text-[10px] text-slate-400 mt-1">Due: {alert.date} • Owner: Ops Team</div>
              </div>
            ))}
            <div className="p-3 rounded-lg border-l-4 border-emerald-500 bg-emerald-50/50 text-xs opacity-80">
                <div className="font-bold text-[#0f172a] mb-0.5">Commercial Invoice Validated</div>
                <div className="text-slate-500">AS-DXB-2024-001 - Dubai DXB</div>
                <div className="text-[10px] text-slate-400 mt-1">Approved by System Automator</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
