"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Activity, ChevronsLeft, ChevronsRight } from "lucide-react";
import { dashboardRoutes, routeGroups } from "@/constants/routes";
import { canAccess } from "@/config/permissions";
import { useUIStore } from "@/store/ui-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Sidebar = () => {
  const pathname = usePathname();
  const { role, sidebarCollapsed, toggleSidebar, setMobileNavOpen } = useUIStore();
  const routes = dashboardRoutes.filter((route) => canAccess(role, route.permission));

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between border-b px-4 py-4">
        <Link href="/" className="flex min-w-0 items-center gap-2" onClick={() => setMobileNavOpen(false)}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Activity className="text-white h-5 w-5" />
          </div>
          {!sidebarCollapsed ? (
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold tracking-tight text-slate-950">SureCova</h1>
              <p className="text-xs font-medium text-slate-500">Operations Command</p>
            </div>
          ) : null}
        </Link>
        <Button variant="ghost" size="icon" className="hidden md:inline-flex" onClick={toggleSidebar}>
          {sidebarCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-5">
          {routeGroups.map((group) => {
            const groupRoutes = routes.filter((route) => route.group === group);
            if (!groupRoutes.length) return null;

            return (
              <div key={group}>
                {!sidebarCollapsed ? (
                  <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{group}</div>
                ) : null}
                <div className="space-y-1">
                  {groupRoutes.map((route) => {
                    const isActive = pathname === route.href;
                    return (
                      <Link
                        href={route.href}
                        key={route.href}
                        title={route.label}
                        onClick={() => setMobileNavOpen(false)}
                        className={cn(
                          "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-slate-50",
                          isActive ? "bg-teal-50 text-teal-700" : "text-slate-600",
                          sidebarCollapsed && "justify-center px-2"
                        )}
                      >
                        <route.icon
                          className={cn(
                            "h-4 w-4 shrink-0",
                            route.tone === "danger" ? "text-red-500" : route.tone === "success" ? "text-teal-600" : "",
                            isActive && "text-teal-700"
                          )}
                        />
                        {!sidebarCollapsed ? (
                          <>
                            <span className="min-w-0 flex-1 truncate">{route.label}</span>
                            {route.badge ? (
                              <Badge
                                variant="outline"
                                className={cn(
                                  "h-5 rounded-full px-1.5 text-[10px]",
                                  route.tone === "danger" ? "border-red-200 bg-red-50 text-red-700" : "border-slate-200"
                                )}
                              >
                                {route.badge}
                              </Badge>
                            ) : null}
                          </>
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      <div className="border-t p-4">
        <div className={cn("rounded-lg border bg-slate-50 p-3", sidebarCollapsed && "px-2")}>
          {!sidebarCollapsed ? (
            <>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">System Status</p>
              <div className="flex items-center text-sm font-medium text-slate-700">
                <div className="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
                All Systems Operational
              </div>
            </>
          ) : (
            <div className="mx-auto h-2 w-2 rounded-full bg-emerald-500" />
          )}
        </div>
      </div>
    </div>
  );
};
