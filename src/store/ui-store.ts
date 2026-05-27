"use client";

import { create } from "zustand";
import type { AdminRole } from "@/types/domain";

type UIState = {
  role: AdminRole;
  sidebarCollapsed: boolean;
  mobileNavOpen: boolean;
  commandOpen: boolean;
  notificationOpen: boolean;
  activeModal: ModalState | null;
  setRole: (role: AdminRole) => void;
  toggleSidebar: () => void;
  setMobileNavOpen: (open: boolean) => void;
  setCommandOpen: (open: boolean) => void;
  setNotificationOpen: (open: boolean) => void;
  openModal: (modal: ModalState) => void;
  closeModal: () => void;
};

export type ModalState = {
  type: "approve-doctor" | "reject-doctor" | "assign-doctor" | "resolve-ticket" | "approve-payout" | "approve-refund";
  title: string;
  description: string;
  entityId?: string;
  entityName?: string;
};

export const useUIStore = create<UIState>((set) => ({
  role: "super-admin",
  sidebarCollapsed: false,
  mobileNavOpen: false,
  commandOpen: false,
  notificationOpen: false,
  activeModal: null,
  setRole: (role) => set({ role }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
  setCommandOpen: (commandOpen) => set({ commandOpen }),
  setNotificationOpen: (notificationOpen) => set({ notificationOpen }),
  openModal: (activeModal) => set({ activeModal }),
  closeModal: () => set({ activeModal: null }),
}));
