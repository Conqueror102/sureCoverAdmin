import { BellRing, CreditCard, LockKeyhole, Save, Settings, Shield, SlidersHorizontal, Users, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { roleLabels, rolePermissions } from "@/config/permissions";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";
import type { AdminRole, RoutePermission } from "@/types/domain";

const permissionLabels: Record<RoutePermission, string> = {
  "dashboard:read": "Dashboard",
  "hospitals:manage": "Hospitals",
  "patients:manage": "Patients",
  "doctors:manage": "Doctors",
  "pharmacies:manage": "Pharmacies",
  "consultations:manage": "Consultations",
  "prescriptions:review": "Prescriptions",
  "health:monitor": "Health",
  "subscriptions:manage": "Billing",
  "payouts:manage": "Payouts",
  "analytics:read": "Analytics",
  "support:manage": "Support",
  "cms:manage": "CMS",
  "emergency:manage": "Emergency",
  "audit:read": "Audit",
  "settings:manage": "Settings",
  "notifications:manage": "Notifications",
};

const roles = Object.keys(roleLabels) as AdminRole[];
const permissions = Object.keys(permissionLabels) as RoutePermission[];
const integrationCards: Array<[LucideIcon, string, string, string]> = [
  [LockKeyhole, "Security", "MFA required, session timeout 30m", "Enabled"],
  [CreditCard, "Payments", "Stripe and local payout provider", "Connected"],
  [BellRing, "Notifications", "Emergency SMS and in-app routing", "Live"],
  [SlidersHorizontal, "Integrations", "Webhook signing and audit capture", "Ready"],
];

export function SettingsWorkspace() {
  return (
    <ModulePage
      title="Settings"
      description="General configuration, RBAC permissions, security controls, payment integrations, and notification routing."
      icon={Settings}
      primaryAction="Save changes"
      secondaryAction="Export config"
    >
      <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Platform Name", "SureCova Health"],
              ["Support Email", "support@surecova.com"],
              ["Default Timezone", "UTC"],
              ["Emergency Hotline", "+1 800 220 9400"],
            ].map(([label, value]) => (
              <label key={label} className="block space-y-2">
                <span className="text-sm font-medium text-slate-700">{label}</span>
                <Input defaultValue={value} />
              </label>
            ))}
            <Button><Save className="mr-2 h-4 w-4" /> Save general settings</Button>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Role Permissions Matrix</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="border-b bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Role</th>
                  {permissions.slice(0, 8).map((permission) => (
                    <th key={permission} className="px-3 py-3">{permissionLabels[permission]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role} className="border-b last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-950">{roleLabels[role]}</td>
                    {permissions.slice(0, 8).map((permission) => (
                      <td key={permission} className="px-3 py-3">
                        <span className={rolePermissions[role].includes(permission) ? "text-teal-700" : "text-slate-300"}>
                          {rolePermissions[role].includes(permission) ? "Allowed" : "Hidden"}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {integrationCards.map(([Icon, title, description, state]) => (
          <Card key={String(title)} className="rounded-lg">
            <CardContent className="p-5">
              <Icon className="mb-3 h-5 w-5 text-teal-700" />
              <div className="font-semibold text-slate-950">{title}</div>
              <p className="mt-1 text-sm text-slate-500">{description}</p>
              <StatusPill tone="success" className="mt-4">{state}</StatusPill>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-teal-700" /> Protected Route Policy</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {["Hidden modules by role", "Permission guarded actions", "Admin audit trail"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg border bg-slate-50/60 p-4">
              <Users className="h-4 w-4 text-teal-700" />
              <span className="text-sm font-medium text-slate-700">{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </ModulePage>
  );
}
