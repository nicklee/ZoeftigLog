
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Shipments } from "./pages/Shipments";
import { ShipmentDetail } from "./pages/ShipmentDetail";
import { Alerts } from "./pages/Alerts";

export default function App() {
  return (
    <Router
      basename={
        import.meta.env.BASE_URL.replace(/\/$/, '') || undefined
      }
    >
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/shipments" element={<Shipments />} />
          <Route path="/shipments/:id" element={<ShipmentDetail />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/documents" element={<div className="p-8 text-center text-muted-foreground italic">Document centralized management coming soon. Please see individual shipment checklists.</div>} />
          <Route path="/settings" element={<div className="p-8 text-center text-muted-foreground italic">Settings and configuration panel coming soon.</div>} />
          {/* Fallback */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}
