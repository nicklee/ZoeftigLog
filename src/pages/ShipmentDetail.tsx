
import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Ship, 
  Plane, 
  Truck,
  CheckCircle2,
  AlertCircle,
  FileText,
  MessageSquare,
  History,
  Info,
  ExternalLink,
  MoreVertical,
  Download,
  Upload
} from "lucide-react";
import { shipments } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const MODE_ICONS = {
  Sea: Ship,
  Air: Plane,
  Road: Truck,
};

export const ShipmentDetail = () => {
  const { id } = useParams();
  const shipment = shipments.find(s => s.id === id);

  if (!shipment) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold">Shipment Not Found</h2>
        <Button asChild className="mt-4"><Link to="/shipments">Back to Shipments</Link></Button>
      </div>
    );
  }

  const ModeIcon = MODE_ICONS[shipment.mode];

  const milestones = [
    { name: "Order Booked", status: "Completed", date: shipment.plannedShipDate },
    { name: "Production Completed", status: "Completed", date: shipment.plannedShipDate },
    { name: "Packed & Ready", status: "Completed", date: shipment.plannedShipDate },
    { name: "Dispatched (Origin Port)", status: "Completed", date: shipment.actualShipDate || shipment.plannedShipDate },
    { name: "Arrival (Destination Port)", status: shipment.status === "In transit" ? "Planned" : "Completed", date: shipment.eta },
    { name: "Customs Clearance", status: "Planned", date: shipment.eta },
    { name: "Final Delivery", status: "Planned", date: shipment.eta },
    { name: "Installation Sign-off", status: "Planned", date: shipment.eta },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/shipments"><ChevronLeft className="w-4 h-4" /></Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold font-mono">{shipment.reference}</h1>
              <Badge variant={shipment.riskLevel === "High" ? "destructive" : "outline"} className="uppercase">
                {shipment.riskLevel} Risk
              </Badge>
            </div>
            <p className="text-muted-foreground">{shipment.projectName} • {shipment.customerName}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
          <Button>Edit Shipment</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Shipment Status</CardTitle>
                <CardDescription>Current stage and vital information.</CardDescription>
              </div>
              <Badge className="bg-blue-600 px-4 py-1 text-sm font-bold">{shipment.status}</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Origin
                  </p>
                  <p className="font-semibold text-sm">{shipment.origin}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Destination
                  </p>
                  <p className="font-semibold text-sm">{shipment.destination}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase flex items-center gap-1">
                    <ModeIcon className="w-3 h-3" /> Mode & Carrier
                  </p>
                  <p className="font-semibold text-sm">{shipment.mode} • {shipment.carrier}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase flex items-center gap-1">
                    <Info className="w-3 h-3" /> Owner
                  </p>
                  <p className="font-semibold text-sm">{shipment.owner}</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-muted/50 border flex items-center gap-4">
                  <Calendar className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">Planned Ship</p>
                    <p className="font-bold">{shipment.plannedShipDate}</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border flex items-center gap-4">
                  <Clock className="w-6 h-6 text-amber-600" />
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">Active ETA</p>
                    <p className="font-bold text-amber-600">{shipment.eta}</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">Inland Delivery</p>
                    <p className="font-bold text-emerald-600">{shipment.deliveryDate || "TBC"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Tabs */}
          <Tabs defaultValue="milestones">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="milestones">Timeline</TabsTrigger>
              <TabsTrigger value="documents">Documentation</TabsTrigger>
              <TabsTrigger value="history">Activity History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="milestones" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="relative space-y-6 pl-8">
                    <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-muted"></div>
                    {milestones.map((milestone, idx) => (
                      <div key={idx} className="relative flex items-center gap-6">
                        <div className={cn(
                          "absolute -left-7 w-4 h-4 rounded-full border-2 bg-card z-10",
                          milestone.status === "Completed" ? "border-emerald-500 bg-emerald-500" : "border-muted-foreground"
                        )}>
                          {milestone.status === "Completed" && <CheckCircle2 className="w-full h-full text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className={cn("font-semibold", milestone.status !== "Completed" && "text-muted-foreground")}>
                            {milestone.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{milestone.date ? `Scheduled: ${milestone.date}` : "Date pending"}</p>
                        </div>
                        <Badge variant={milestone.status === "Completed" ? "outline" : "secondary"}>
                          {milestone.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Documentation Checklist</CardTitle>
                      <CardDescription>Required paperwork for this {shipment.mode} shipment.</CardDescription>
                    </div>
                    <Button variant="outline" size="sm"><Upload className="w-4 h-4 mr-2" /> Upload New</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {shipment.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/30 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "p-2 rounded-lg",
                            doc.status === "Completed" ? "bg-emerald-100 text-emerald-600" : 
                            doc.status === "Overdue" ? "bg-red-100 text-red-600" : "bg-muted text-muted-foreground"
                          )}>
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">Due: {doc.dueDate} • Owner: {doc.owner}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={
                            doc.status === "Completed" ? "outline" : 
                            doc.status === "Overdue" ? "destructive" : "secondary"
                          }>
                            {doc.status}
                          </Badge>
                          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Elena Rodriguez added a note</p>
                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg border">
                          "Supplier Nordic Ergo confirms production is back on track. Waiting for the Port of Oslo to release the strike update."
                        </p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <History className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Status changed from 'In production' to 'Delayed'</p>
                        <p className="text-xs text-muted-foreground">Yesterday, 14:30</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Action Card */}
          <Card className="bg-primary text-primary-foreground border-none">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription className="text-primary-foreground/70">Required actions to move to active status.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {shipment.documents.filter(d => d.status !== "Completed").map(d => (
                <div key={d.id} className="flex gap-3">
                  <div className="p-1 rounded bg-primary-foreground/10 h-min">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{d.name} required</p>
                    <p className="text-xs text-primary-foreground/60 leading-tight">Paperwork is {d.status.toLowerCase()} and needs validation before port arrival.</p>
                  </div>
                </div>
              ))}
              <Separator className="bg-primary-foreground/10" />
              <Button variant="secondary" className="w-full">Update Customs Status</Button>
            </CardContent>
          </Card>

          {/* Supplier Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Supplier Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Manufacturing Site</p>
                <p className="font-semibold">{shipment.supplierName}</p>
                <p className="text-xs text-muted-foreground italic">Bologna, Italy</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground uppercase">Project Lead</p>
                <p className="font-semibold text-sm">Fabrizio Rossi</p>
                <p className="text-xs text-muted-foreground">f.rossi@steelcraft.it</p>
              </div>
              <Button variant="outline" className="w-full text-xs h-8">View Supplier Profile</Button>
            </CardContent>
          </Card>

          {/* Logistics Partners */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Logistics Partners</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Freight Forwarder</p>
                  <p className="font-bold text-sm">{shipment.carrier}</p>
                </div>
                <Badge variant="outline">Contract active</Badge>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-muted-foreground">Tracking Number</p>
                <code className="text-[10px] bg-muted px-2 py-1 rounded w-full flex items-center justify-between">
                  MAERSK-990-221-XB
                  <ExternalLink className="w-3 h-3" />
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
