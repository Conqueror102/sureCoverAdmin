import { Activity, CalendarDays, HeartPulse, Pill, UserRound, Users, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/metrics/metric-card";
import { ModulePage } from "@/components/shared/module-page";
import { RiskBadge } from "@/components/health/risk-badge";
import { StatusPill } from "@/components/shared/status-pill";
import { ActivityTimeline } from "@/components/timelines/activity-timeline";

const patientCards = [
  [Users, "Proxy Caregivers", "No proxy caregiver currently assigned.", "Needs setup"],
  [Pill, "Medication Adherence", "78% adherence over the last 30 days.", "Review"],
  [CalendarDays, "Subscription", "Premium plan renews on June 27, 2026.", "Active"],
] satisfies Array<[LucideIcon, string, string, string]>;

export function PatientDetail() {
  return (
    <ModulePage
      title="Marcus Johnson"
      description="Patient profile, chronic care status, subscription, caregiver access, and escalation history."
      icon={UserRound}
      primaryAction="Assign doctor"
      secondaryAction="Export record"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Health Score" value="46/100" change="Critical risk band" icon={HeartPulse} tone="red" />
        <MetricCard label="Care Plan" value="Premium" change="Chronic care monitoring" icon={CalendarDays} />
        <MetricCard label="Open Alerts" value="3" change="1 emergency active" icon={Activity} tone="amber" />
        <MetricCard label="Medications" value="4" change="1 interaction review" icon={Pill} tone="slate" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Clinical Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Condition", "Hypertension"],
              ["Assigned Doctor", "Dr. Michael Chen"],
              ["Last Visit", "2026-05-27"],
              ["Country", "United States"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b pb-3 last:border-0">
                <span className="text-sm text-slate-500">{label}</span>
                <span className="font-medium text-slate-900">{value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Risk Level</span>
              <RiskBadge level="critical" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Care Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline
              items={[
                { title: "Emergency alert created", description: "Chest pain and low heart-rate pattern detected.", time: "2m", tone: "danger" },
                { title: "Doctor assigned", description: "Dr. Michael Chen accepted escalation handoff.", time: "1m", tone: "success" },
                { title: "Medication review required", description: "Blood pressure medication adjustment pending.", time: "Today", tone: "warning" },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {patientCards.map(([CardIcon, title, copy, state]) => (
            <Card key={String(title)} className="rounded-lg">
              <CardContent className="p-5">
                <CardIcon className="mb-3 h-5 w-5 text-teal-700" />
                <div className="font-semibold text-slate-950">{title}</div>
                <p className="mt-1 text-sm text-slate-500">{copy}</p>
                <StatusPill tone={state === "Active" ? "success" : "warning"} className="mt-4">{state}</StatusPill>
              </CardContent>
            </Card>
        ))}
      </div>
    </ModulePage>
  );
}
