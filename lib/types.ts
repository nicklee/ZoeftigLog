
import { format, addDays, subDays } from "date-fns";

export type ShipmentStatus = 
  | "Quote requested"
  | "Booked"
  | "In production"
  | "Ready for dispatch"
  | "In transit"
  | "At port"
  | "Customs paperwork required"
  | "Customs cleared"
  | "Out for delivery"
  | "Delivered"
  | "Installed"
  | "Delayed"
  | "Closed";

export type RiskLevel = "Low" | "Medium" | "High";

export type ShippingMode = "Sea" | "Air" | "Road";

export interface Document {
  id: string;
  name: string;
  required: boolean;
  dueDate: string;
  status: "Missing" | "Pending Review" | "Completed" | "Overdue";
  owner: string;
  type: string;
}

export interface Milestone {
  name: string;
  date: string;
  status: "Completed" | "Planned" | "Actual" | "At Risk";
}

export interface Shipment {
  id: string;
  reference: string;
  projectId: string;
  projectName: string;
  customerId: string;
  customerName: string;
  supplierId: string;
  supplierName: string;
  origin: string;
  destination: string;
  carrier: string;
  mode: ShippingMode;
  incoterms: string;
  status: ShipmentStatus;
  riskLevel: RiskLevel;
  owner: string;
  notes: string;
  
  // Dates
  plannedShipDate: string;
  actualShipDate?: string;
  eta: string;
  customsClearanceDate?: string;
  deliveryDate?: string;
  installationDate?: string;
  
  // Documents
  documents: Document[];
}

export interface Project {
  id: string;
  name: string;
  customer: string;
}

export interface Supplier {
  id: string;
  name: string;
  location: string;
}

export interface Alert {
  id: string;
  shipmentId: string;
  shipmentRef: string;
  type: "Urgent Action" | "Delay" | "Missing Document" | "At Risk";
  message: string;
  severity: "High" | "Medium" | "Low";
  date: string;
}
