import { Banknote, CheckCircle2, DollarSign, ShieldCheck, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/metrics/metric-card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";

const requests = [
  ["WR-9012", "Dr. Sarah Jenkins", "$4,820", "Ready"],
  ["WR-9013", "Dr. Michael Chen", "$6,140", "Compliance Hold"],
  ["WR-9014", "Dr. Avery Davis", "$2,930", "Ready"],
  ["WR-9015", "Dr. Emily Taylor", "$3,310", "Processing"],
];

export function PayoutsWorkspace() {
  return (
    <ModulePage
      title="Doctor Payouts"
      description="Doctor earnings, withdrawal requests, payout history, transfer status, and approval workflows."
      icon={WalletCards}
      primaryAction="Run payout batch"
      secondaryAction="Export ledger"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Available to Payout" value="$124.5k" change="Next cycle closes today" icon={DollarSign} />
        <MetricCard label="Pending Requests" value="12" change="3 above review threshold" icon={WalletCards} tone="amber" />
        <MetricCard label="Compliance Holds" value="2" change="Missing tax profile" icon={ShieldCheck} tone="red" />
        <MetricCard label="Completed This Month" value="$412k" change="+8.1% vs last month" icon={CheckCircle2} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Withdrawal Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {requests.map(([id, doctor, amount, status]) => (
              <div key={id} className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-semibold text-slate-950">{doctor}</div>
                  <div className="mt-1 text-sm text-slate-500">{id} / requested withdrawal</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="font-semibold text-slate-900">{amount}</div>
                  <StatusPill tone={status === "Ready" ? "success" : status === "Compliance Hold" ? "danger" : "warning"}>{status}</StatusPill>
                  <Button size="sm" variant={status === "Ready" ? "default" : "outline"}>{status === "Ready" ? "Approve" : "Review"}</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Payout Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {["KYC verified", "Tax forms complete", "Fraud signals clear", "Bank account active"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-lg border bg-slate-50/60 p-3">
                <span className="text-sm font-medium text-slate-700">{item}</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
            ))}
            <Button className="w-full"><Banknote className="mr-2 h-4 w-4" /> Generate payout file</Button>
          </CardContent>
        </Card>
      </div>
    </ModulePage>
  );
}
