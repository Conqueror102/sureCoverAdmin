import { Building2, CalendarClock, HeartPulse, Stethoscope, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/metrics/metric-card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";
import { ActivityTimeline } from "@/components/timelines/activity-timeline";

export function HospitalDetail() {
  const doctors = ["Dr. Sarah Jenkins", "Dr. Amina Bello", "Dr. Victor Hall"];
  const patients = ["Eleanor Richards", "Sophia Martinez", "Noah Kim"];

  return (
    <ModulePage
      title="SureCova London Heart Institute"
      description="Hospital-owned doctors, assigned patients, active specialties, emergency capacity, and operational timeline."
      icon={Building2}
      primaryAction="Assign doctor"
      secondaryAction="Add patient"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Doctors" value="42" change="18 online today" icon={Stethoscope} />
        <MetricCard label="Assigned Patients" value="3,120" change="242 high risk" icon={Users} />
        <MetricCard label="Emergency Capacity" value="18" change="6 currently occupied" icon={HeartPulse} tone="red" />
        <MetricCard label="Avg Handoff" value="4.1m" change="Within emergency SLA" icon={CalendarClock} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="rounded-lg">
          <CardHeader><CardTitle>Hospital Doctors</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {doctors.map((doctor, index) => (
              <div key={doctor} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <div className="font-medium text-slate-900">{doctor}</div>
                  <div className="text-sm text-slate-500">{index === 0 ? "Cardiology" : index === 1 ? "Emergency Care" : "Internal Medicine"}</div>
                </div>
                <StatusPill tone={index === 2 ? "warning" : "success"}>{index === 2 ? "In consult" : "Online"}</StatusPill>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader><CardTitle>Assigned Patients</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {patients.map((patient, index) => (
              <div key={patient} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <div className="font-medium text-slate-900">{patient}</div>
                  <div className="text-sm text-slate-500">{index === 2 ? "CHF Monitoring" : "Chronic care"}</div>
                </div>
                <StatusPill tone={index === 2 ? "danger" : "success"}>{index === 2 ? "High risk" : "Active"}</StatusPill>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader><CardTitle>Hospital Timeline</CardTitle></CardHeader>
          <CardContent>
            <ActivityTimeline
              items={[
                { title: "Doctor added", description: "Dr. Amina Bello assigned to emergency care rotation.", time: "Today", tone: "success" },
                { title: "Capacity updated", description: "Emergency capacity increased from 14 to 18 slots.", time: "2d", tone: "neutral" },
                { title: "High-risk patient assigned", description: "Noah Kim moved to hospital-managed monitoring.", time: "4d", tone: "warning" },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </ModulePage>
  );
}
