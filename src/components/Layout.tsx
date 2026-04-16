
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
      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
      active 
        ? "bg-primary text-primary-foreground font-medium" 
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
    <span>{label}</span>
  </Link>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={cn(
            "border-right bg-card h-full transition-all duration-300 flex flex-col",
            isSidebarOpen ? "w-64" : "w-0 -translate-x-full lg:w-20 lg:translate-x-0"
          )}
        >
          <div className="p-6 flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <Ship className="w-6 h-6 text-primary-foreground" />
            </div>
            {isSidebarOpen && (
              <span className="font-bold text-xl tracking-tight">AeroSeat</span>
            )}
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
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

          <div className="p-4 border-t space-y-1">
            <SidebarItem 
              icon={Settings} 
              label={isSidebarOpen ? "Settings" : ""} 
              href="/settings" 
              active={location.pathname === "/settings"} 
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b bg-card px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="relative w-96 hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search shipments, projects, documents..." 
                  className="pl-10 bg-muted/50"
                  id="global-search"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative" id="notifications-btn">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
              <div className="flex items-center gap-3 border-l pl-4 ml-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">Sarah Jenkins</p>
                  <p className="text-xs text-muted-foreground">Logistics Manager</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  SJ
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};
