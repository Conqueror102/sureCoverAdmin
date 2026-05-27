"use client";

import { create } from "zustand";
import type { AdminRole } from "@/types/domain";

type UIState = {
  role: AdminRole;
  sidebarCollapsed: boolean;
  mobileNavOpen: boolean;
  commandOpen: boolean;
  notificationOpen: boolean;
  setRole: (role: AdminRole) => void;
  toggleSidebar: () => void;
  setMobileNavOpen: (open: boolean) => void;
  setCommandOpen: (open: boolean) => void;
  setNotificationOpen: (open: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  role: "super-admin",
  sidebarCollapsed: false,
  mobileNavOpen: false,
  commandOpen: false,
  notificationOpen: false,
  setRole: (role) => set({ role }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
  setCommandOpen: (commandOpen) => set({ commandOpen }),
  setNotificationOpen: (notificationOpen) => set({ notificationOpen }),
}));
