
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
          <h1 className="text-3xl font-bold tracking-tight">All Shipments</h1>
          <p className="text-muted-foreground">Comprehensive list of all active projects and shipments.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
          <Button variant="outline" className="gap-2">
            <ArrowUpDown className="w-4 h-4" />
            Sort
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search shipments..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="shipment-search"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[150px]">Reference</TableHead>
                  <TableHead>Project / Customer</TableHead>
                  <TableHead>Origin / Destination</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.map((shipment) => {
                  const Icon = MODE_ICONS[shipment.mode];
                  return (
                    <TableRow key={shipment.id} className="group cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-mono text-sm font-medium">
                        <Link to={`/shipments/${shipment.id}`} className="hover:underline">
                          {shipment.reference}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">{shipment.projectName}</span>
                          <span className="text-xs text-muted-foreground">{shipment.customerName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-xs">
                          <span className="text-muted-foreground">From: {shipment.origin}</span>
                          <span className="font-medium">To: {shipment.destination}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs uppercase font-medium">{shipment.mode}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("px-2 py-0.5 whitespace-nowrap", STATUS_VARIANTS[shipment.status])}>
                          {shipment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={RISK_VARIANTS[shipment.riskLevel] as any} className="text-[10px] uppercase font-bold tracking-wider px-1.5 h-5">
                          {shipment.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/shipments/${shipment.id}`} className="w-full flex items-center gap-2">
                                <Eye className="h-4 w-4" /> View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Mark as Delayed</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing {filteredShipments.length} shipments</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
