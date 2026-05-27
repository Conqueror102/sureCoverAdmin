import type { AdminRole, RoutePermission } from "@/types/domain";

export const roleLabels: Record<AdminRole, string> = {
  "super-admin": "Super Admin",
  "operations-admin": "Operations Admin",
  "medical-reviewer": "Medical Reviewer",
  "finance-admin": "Finance Admin",
  "support-admin": "Support Admin",
  "content-manager": "Content Manager",
};

export const rolePermissions: Record<AdminRole, RoutePermission[]> = {
  "super-admin": [
    "dashboard:read",
    "hospitals:manage",
    "patients:manage",
    "doctors:manage",
    "pharmacies:manage",
    "consultations:manage",
    "prescriptions:review",
    "health:monitor",
    "subscriptions:manage",
    "payouts:manage",
    "analytics:read",
    "support:manage",
    "cms:manage",
    "emergency:manage",
    "audit:read",
    "settings:manage",
    "notifications:manage",
  ],
  "operations-admin": [
    "dashboard:read",
    "hospitals:manage",
    "patients:manage",
    "doctors:manage",
    "pharmacies:manage",
    "consultations:manage",
    "health:monitor",
    "analytics:read",
    "support:manage",
    "emergency:manage",
    "notifications:manage",
  ],
  "medical-reviewer": [
    "dashboard:read",
    "hospitals:manage",
    "patients:manage",
    "doctors:manage",
    "consultations:manage",
    "prescriptions:review",
    "health:monitor",
    "emergency:manage",
  ],
  "finance-admin": [
    "dashboard:read",
    "pharmacies:manage",
    "subscriptions:manage",
    "payouts:manage",
    "analytics:read",
    "audit:read",
  ],
  "support-admin": ["dashboard:read", "hospitals:manage", "patients:manage", "support:manage", "notifications:manage"],
  "content-manager": ["dashboard:read", "cms:manage", "notifications:manage"],
};

export function canAccess(role: AdminRole, permission: RoutePermission) {
  return rolePermissions[role].includes(permission);
}
