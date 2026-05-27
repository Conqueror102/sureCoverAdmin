import {
  Activity,
  BarChart3,
  Bell,
  Building2,
  CreditCard,
  DollarSign,
  FileText,
  Globe,
  LayoutDashboard,
  LifeBuoy,
  Pill,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Users,
  Video,
} from "lucide-react";
import type { NavRoute } from "@/types/domain";

export const dashboardRoutes: NavRoute[] = [
  { label: "Overview", href: "/", icon: LayoutDashboard, group: "Command", permission: "dashboard:read" },
  { label: "Analytics", href: "/analytics", icon: BarChart3, group: "Command", permission: "analytics:read" },
  { label: "Hospitals", href: "/hospitals", icon: Building2, group: "Network", permission: "hospitals:manage", badge: "12" },
  { label: "Pharmacies", href: "/pharmacies", icon: Pill, group: "Network", permission: "pharmacies:manage", badge: "24" },
  { label: "Patients", href: "/users", icon: Users, group: "Clinical", permission: "patients:manage" },
  { label: "Doctors", href: "/doctors", icon: Stethoscope, group: "Clinical", permission: "doctors:manage", badge: "7" },
  { label: "Consultations", href: "/consultations", icon: Video, group: "Clinical", permission: "consultations:manage" },
  { label: "Prescriptions", href: "/prescriptions", icon: FileText, group: "Clinical", permission: "prescriptions:review" },
  { label: "Health Monitoring", href: "/health-monitoring", icon: Activity, group: "Clinical", permission: "health:monitor", tone: "success" },
  { label: "Emergency", href: "/emergency", icon: ShieldAlert, group: "Clinical", permission: "emergency:manage", badge: "3", tone: "danger" },
  { label: "Subscriptions", href: "/subscriptions", icon: CreditCard, group: "Business", permission: "subscriptions:manage" },
  { label: "Payouts", href: "/payouts", icon: DollarSign, group: "Business", permission: "payouts:manage" },
  { label: "Support", href: "/support", icon: LifeBuoy, group: "Operations", permission: "support:manage", badge: "18" },
  { label: "Content CMS", href: "/cms", icon: Globe, group: "Operations", permission: "cms:manage" },
  { label: "Notifications", href: "/notifications", icon: Bell, group: "Operations", permission: "notifications:manage" },
  { label: "Audit Logs", href: "/audit-logs", icon: ShieldCheck, group: "Governance", permission: "audit:read" },
  { label: "Settings", href: "/settings", icon: Settings, group: "Governance", permission: "settings:manage" },
];

export const routeGroups = ["Command", "Network", "Clinical", "Business", "Operations", "Governance"] as const;

export const authRoutes = [
  { label: "Login", href: "/login" },
  { label: "Forgot Password", href: "/forgot-password" },
  { label: "Reset Password", href: "/reset-password" },
  { label: "Verify OTP", href: "/verify-otp" },
];
