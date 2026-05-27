import type { LucideIcon } from "lucide-react";

export type AdminRole =
  | "super-admin"
  | "operations-admin"
  | "medical-reviewer"
  | "finance-admin"
  | "support-admin"
  | "content-manager";

export type RiskLevel = "low" | "medium" | "high" | "critical";
export type EntityStatus = "active" | "pending" | "review" | "suspended" | "resolved";

export type RoutePermission =
  | "dashboard:read"
  | "hospitals:manage"
  | "patients:manage"
  | "doctors:manage"
  | "pharmacies:manage"
  | "consultations:manage"
  | "prescriptions:review"
  | "health:monitor"
  | "subscriptions:manage"
  | "payouts:manage"
  | "analytics:read"
  | "support:manage"
  | "cms:manage"
  | "emergency:manage"
  | "audit:read"
  | "settings:manage"
  | "notifications:manage";

export type NavRoute = {
  label: string;
  href: string;
  icon: LucideIcon;
  group: "Command" | "Network" | "Clinical" | "Business" | "Operations" | "Governance";
  permission: RoutePermission;
  badge?: string;
  tone?: "default" | "danger" | "success" | "warning";
};

export type Patient = {
  id: string;
  name: string;
  email: string;
  age: number;
  country: string;
  condition: string;
  plan: "Basic" | "Premium" | "Enterprise";
  status: "Active" | "Inactive" | "High Risk";
  riskLevel: RiskLevel;
  assignedDoctor: string;
  lastVisit: string;
  healthScore: number;
  proxyCaregiver?: string;
  hospitalId?: string;
};

export type DoctorProfile = {
  id: string;
  name: string;
  specialty: string;
  status: "Verified" | "Pending Review" | "Suspended";
  patients: number;
  rating: number;
  availability: "Online" | "In Consultation" | "Offline";
  earnings: number;
  country: string;
  hospitalId?: string;
};

export type Hospital = {
  id: string;
  name: string;
  country: string;
  city: string;
  status: "Active" | "Onboarding" | "Suspended";
  doctors: number;
  patients: number;
  emergencyCapacity: number;
  specialties: string[];
  monthlyRevenue: number;
};

export type Pharmacy = {
  id: string;
  name: string;
  country: string;
  city: string;
  status: "Active" | "Review" | "Suspended";
  prescriptionsFilled: number;
  referralBonusRate: number;
  referralBonusesPaid: number;
  pendingPayout: number;
  partnerTier: "Standard" | "Preferred" | "Enterprise";
};

export type Specialty = {
  id: string;
  name: string;
  doctors: number;
  visibleToDoctors: boolean;
  protocolVersion: string;
  status: "Active" | "Draft" | "Review";
};

export type Consultation = {
  id: string;
  patient: string;
  doctor: string;
  type: "Initial Consult" | "Follow-up" | "Emergency" | "Medication Review";
  status: "Scheduled" | "Waiting Room" | "Live" | "Completed" | "Flagged";
  startedAt: string;
  duration: string;
  riskLevel: RiskLevel;
};

export type EmergencyAlert = {
  id: string;
  patient: string;
  condition: string;
  vitals: string;
  riskLevel: RiskLevel;
  status: string;
  assigned: string;
  time: string;
};

export type RevenuePoint = {
  month: string;
  subscriptions: number;
  consultations: number;
  payouts: number;
};

export type ActivityEvent = {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  riskLevel?: RiskLevel;
};
