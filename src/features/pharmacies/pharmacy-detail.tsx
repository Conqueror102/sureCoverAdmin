"use client";

import { BadgeDollarSign, ClipboardCheck, Pill, ReceiptText, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/metrics/metric-card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";
import { ActivityTimeline } from "@/components/timelines/activity-timeline";
import { useUIStore } from "@/store/ui-store";

export function PharmacyDetail() {
  const openModal = useUIStore((state) => state.openModal);
  const referrals = [
    ["RX-12091", "Marcus Johnson", "Lisinopril 10mg", "$14.20"],
    ["RX-12092", "Eleanor Richards", "Metformin 500mg", "$8.40"],
    ["RX-12093", "Sophia Martinez", "Albuterol inhaler", "$11.60"],
  ];

  return (
    <ModulePage
      title="CarePlus Rx Network"
      description="Referral bonus ledger, prescription fulfillment performance, partner tier, payout controls, and audit trail."
      icon={Store}
      primaryAction="Approve bonus payout"
      secondaryAction="Adjust bonus rate"
    >
      <div className="flex justify-end">
        <Button
          onClick={() => openModal({
            type: "approve-payout",
            title: "Approve pharmacy referral payout",
            description: "This approves the pharmacy referral bonus payout for finance release.",
            entityId: "PH-2402",
            entityName: "CarePlus Rx Network / $5,120",
          })}
        >
          Approve referral payout
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Partner Tier" value="Enterprise" change="Highest fulfillment SLA" icon={Store} />
        <MetricCard label="Filled Prescriptions" value="2,310" change="Current cycle" icon={Pill} />
        <MetricCard label="Referral Bonus Rate" value="10%" change="Applies to eligible fills" icon={BadgeDollarSign} />
        <MetricCard label="Pending Payout" value="$5,120" change="Finance approval required" icon={ReceiptText} tone="amber" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
        <Card className="rounded-lg">
          <CardHeader><CardTitle>Referral Bonus Ledger</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {referrals.map(([id, patient, medication, bonus]) => (
              <div key={id} className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-semibold text-slate-950">{id}</div>
                  <div className="text-sm text-slate-500">{patient} / {medication}</div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusPill tone="success">Eligible</StatusPill>
                  <div className="font-semibold text-slate-900">{bonus}</div>
                </div>
              </div>
            ))}
            <Button variant="outline"><ClipboardCheck className="mr-2 h-4 w-4" /> Reconcile ledger</Button>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader><CardTitle>Pharmacy Timeline</CardTitle></CardHeader>
          <CardContent>
            <ActivityTimeline
              items={[
                { title: "Referral bonus accrued", description: "Three eligible prescription fills added to ledger.", time: "Today", tone: "success" },
                { title: "Tier upgraded", description: "Partner moved to Enterprise tier after SLA review.", time: "1w", tone: "success" },
                { title: "Payout pending", description: "Finance review required before payout release.", time: "Now", tone: "warning" },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </ModulePage>
  );
}
