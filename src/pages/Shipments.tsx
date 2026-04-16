
import React from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  ArrowUpDown,
  MoreVertical,
  Calendar,
  AlertTriangle,
  Ship,
  Plane,
  Truck
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { shipments } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { RiskLevel, ShipmentStatus } from "@/lib/types";

const RISK_VARIANTS: Record<RiskLevel, string> = {
  High: "destructive",
  Medium: "secondary",
  Low: "outline",
};

const STATUS_VARIANTS: Record<ShipmentStatus, string> = {
  "In transit": "bg-blue-100 text-blue-800 border-blue-200",
  "Delayed": "bg-red-100 text-red-800 border-red-200",
  "Customs paperwork required": "bg-amber-100 text-amber-800 border-amber-200",
  "Ready for dispatch": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Installed": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Delivered": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "In production": "bg-slate-100 text-slate-800 border-slate-200",
  "Booked": "bg-slate-100 text-slate-800 border-slate-200",
  "Quote requested": "bg-slate-100 text-slate-800 border-slate-200",
  "At port": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "Customs cleared": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Out for delivery": "bg-sky-100 text-sky-800 border-sky-200",
  "Closed": "bg-gray-100 text-gray-800 border-gray-200",
};

const MODE_ICONS = {
  Sea: Ship,
  Air: Plane,
  Road: Truck,
};

export const Shipments = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredShipments = shipments.filter(s => 
    s.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0f172a]">All Shipments</h1>
          <p className="text-sm text-slate-500">Comprehensive list of all active projects and shipments.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-9 border-slate-200 text-slate-600 gap-2 text-xs font-semibold">
            <Filter className="w-3 h-3" />
            More Filters
          </Button>
          <Button variant="outline" className="h-9 border-slate-200 text-slate-600 gap-2 text-xs font-semibold">
            <ArrowUpDown className="w-3 h-3" />
            Sort
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search reference, project..." 
              className="pl-10 h-9 bg-slate-50/50 border-slate-200 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="shipment-search"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="border-b border-slate-200 hover:bg-slate-50">
                <TableHead className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Ref #</TableHead>
                <TableHead className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Project / Customer</TableHead>
                <TableHead className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Origin / Mode</TableHead>
                <TableHead className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">ETA</TableHead>
                <TableHead className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</TableHead>
                <TableHead className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Risk</TableHead>
                <TableHead className="px-4 py-3 text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShipments.map((shipment) => {
                const Icon = MODE_ICONS[shipment.mode];
                return (
                  <TableRow key={shipment.id} className="group cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0" onClick={() => window.location.href=`/shipments/${shipment.id}`}>
                    <TableCell className="px-4 py-4 font-bold text-sm">
                      {shipment.reference.replace("AS-", "SHP-")}
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-[#0f172a]">{shipment.projectName}</span>
                        <span className="text-[11px] text-slate-500">{shipment.customerName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">{shipment.origin}</span>
                        <span className="text-slate-300">/</span>
                        <Icon className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-tight">{shipment.mode}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 font-medium text-sm text-slate-700">
                      {shipment.status === "Delayed" ? (
                        <span className="text-red-600 font-bold">Delayed</span>
                      ) : (
                        shipment.eta.split("-").slice(1).join("/")
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                        shipment.status === "In transit" ? "bg-blue-100 text-blue-700" :
                        shipment.status === "At port" ? "bg-amber-100 text-amber-800" :
                        shipment.status === "Customs paperwork required" ? "bg-orange-100 text-orange-800" :
                        shipment.status === "Delayed" ? "bg-red-100 text-red-700" :
                        "bg-slate-100 text-slate-600"
                      )}>
                        {shipment.status}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          shipment.riskLevel === "High" ? "bg-red-500" :
                          shipment.riskLevel === "Medium" ? "bg-amber-500" :
                          "bg-emerald-500"
                        )} />
                        <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                          {shipment.riskLevel}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 group-hover:text-slate-600">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        <div className="p-4 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200">
          <span>Showing <strong>{filteredShipments.length}</strong> active trackers</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 border-slate-200 text-[10px]" disabled>Prev</Button>
            <Button variant="outline" size="sm" className="h-8 border-slate-200 text-[10px]" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
