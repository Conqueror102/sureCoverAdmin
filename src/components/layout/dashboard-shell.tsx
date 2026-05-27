"use client";

import { CommandPalette } from "@/components/navigation/command-palette";
import { NotificationCenter } from "@/components/notifications/notification-center";
import { ModalManager } from "@/components/dialogs/modal-manager";
import { EmergencySimulator } from "@/components/emergency/simulator";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed, mobileNavOpen, setMobileNavOpen } = useUIStore();

  return (
    <div className="relative flex h-screen overflow-hidden bg-slate-50">
      <EmergencySimulator />
      <CommandPalette />
      <NotificationCenter />
      <ModalManager />

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-[90] bg-slate-950/30 md:hidden" onClick={() => setMobileNavOpen(false)}>
          <div className="h-full w-80 max-w-[85vw]" onClick={(event) => event.stopPropagation()}>
            <Sidebar />
          </div>
        </div>
      ) : null}

      <aside
        className={cn(
          "hidden h-full shrink-0 border-r bg-white transition-[width] duration-200 md:block",
          sidebarCollapsed ? "w-20" : "w-72"
        )}
      >
        <Sidebar />
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
