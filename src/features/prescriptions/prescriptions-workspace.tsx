import { AlertTriangle, ClipboardCheck, FileText, Pill, Plus, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/metrics/metric-card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";
import { PrescriptionsTable } from "@/components/tables/prescriptions-table";
import { PrescriptionData } from "@/mock/prescriptions";

const medicationRules = [
  ["Lisinopril", "Blood pressure", "Interaction review enabled"],
  ["Metformin", "Diabetes", "Renal function check required"],
  ["Albuterol", "Asthma", "Refill threshold monitored"],
];

export function PrescriptionsWorkspace() {
  return (
    <ModulePage
      title="Prescriptions"
      description="Medication orders, dosage review, approval workflow, pharmacy routing, and clinical audit trails."
      icon={Pill}
      primaryAction="New prescription"
      secondaryAction="Review queue"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Issued Today" value="84" change="12 awaiting signature" icon={FileText} />
        <MetricCard label="Flagged Orders" value="7" change="Interaction or dosage warnings" icon={AlertTriangle} tone="red" />
        <MetricCard label="Approved" value="312" change="This week" icon={ClipboardCheck} />
        <MetricCard label="Audit Coverage" value="100%" change="Every order versioned" icon={ShieldCheck} tone="slate" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Prescription Review Queue</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <PrescriptionsTable data={PrescriptionData} />
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Medication Database</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {medicationRules.map(([drug, category, rule]) => (
              <div key={drug} className="rounded-lg border p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-950">{drug}</div>
                    <div className="mt-1 text-sm text-slate-500">{category}</div>
                  </div>
                  <StatusPill tone="success">Active</StatusPill>
                </div>
                <p className="mt-3 text-sm text-slate-500">{rule}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full"><Plus className="mr-2 h-4 w-4" /> Add medication rule</Button>
          </CardContent>
        </Card>
      </div>
    </ModulePage>
  );
}
