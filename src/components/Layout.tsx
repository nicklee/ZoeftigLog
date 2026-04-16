
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Ship, 
  FileText, 
  Bell, 
  Search, 
  Package, 
  Truck, 
  Box, 
  Settings,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active }: SidebarItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 px-6 py-3 transition-all group relative",
      active 
        ? "text-white bg-white/5 border-l-4 border-primary" 
        : "text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-primary" : "text-slate-400 group-hover:text-white")} />
    <span>{label}</span>
  </Link>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-[#f8fafc] text-[#0f172a] overflow-hidden font-sans">
        {/* Sidebar */}
        <aside 
          className={cn(
            "bg-[#1e293b] h-full transition-all duration-300 flex flex-col shrink-0",
            isSidebarOpen ? "w-[240px]" : "w-0 -translate-x-full lg:w-20 lg:translate-x-0"
          )}
        >
          <div className="px-6 py-8 flex items-center gap-3">
            <div className="w-6 h-6 bg-primary rounded" />
            {isSidebarOpen && (
              <span className="font-bold text-lg tracking-tight text-white uppercase">ZoeftigOps</span>
            )}
          </div>

          <nav className="flex-1 py-4 flex flex-col">
            <SidebarItem 
              icon={LayoutDashboard} 
              label={isSidebarOpen ? "Dashboard" : ""} 
              href="/" 
              active={location.pathname === "/"} 
            />
            <SidebarItem 
              icon={Ship} 
              label={isSidebarOpen ? "All Shipments" : ""} 
              href="/shipments" 
              active={location.pathname.startsWith("/shipments")} 
            />
            <SidebarItem 
              icon={Bell} 
              label={isSidebarOpen ? "Alerts & Actions" : ""} 
              href="/alerts" 
              active={location.pathname === "/alerts"} 
            />
            <SidebarItem 
              icon={FileText} 
              label={isSidebarOpen ? "Documents" : ""} 
              href="/documents" 
              active={location.pathname === "/documents"} 
            />
          </nav>

          <div className="pb-8 flex flex-col">
            <SidebarItem 
              icon={Settings} 
              label={isSidebarOpen ? "Settings" : ""} 
              href="/settings" 
              active={location.pathname === "/settings"} 
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f8fafc]">
          {/* Header */}
          <header className="h-20 px-8 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden text-slate-500"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="relative w-96 hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Filter..." 
                  className="pl-10 bg-white border-slate-200"
                  id="global-search"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Button variant="outline" className="border-slate-200 text-slate-600 font-semibold text-xs h-9">Export Manifest</Button>
                <Button className="font-semibold text-xs h-9 bg-primary">+ New Shipment</Button>
              </div>
              <Button variant="ghost" size="icon" className="relative text-slate-500" id="notifications-btn">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs">
                  SJ
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto px-8 pb-8">
            <div className="max-w-[1400px] mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};
