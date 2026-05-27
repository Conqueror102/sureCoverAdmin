import { Clock, LifeBuoy, MessageSquare, MessagesSquare, ShieldAlert, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/metrics/metric-card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";
import { SupportTable } from "@/components/tables/support-table";
import { TicketData } from "@/mock/support";

const liveQueue = [
  ["Billing failure", "Marcus Johnson", "Finance", "High"],
  ["Prescription delivery", "Eleanor Richards", "Clinical", "Medium"],
  ["Doctor onboarding", "Dr. William Smith", "Operations", "Medium"],
];

export function SupportWorkspace() {
  return (
    <ModulePage
      title="Support Center"
      description="Ticket inbox, escalations, response metrics, live support queue, and patient/doctor communication workflows."
      icon={LifeBuoy}
      primaryAction="New ticket"
      secondaryAction="Export SLA"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Open Tickets" value="18" change="6 clinical, 4 billing" icon={MessageSquare} />
        <MetricCard label="Avg Response Time" value="16m" change="SLA target 20m" icon={Clock} />
        <MetricCard label="Escalations" value="5" change="2 emergency-adjacent" icon={ShieldAlert} tone="amber" />
        <MetricCard label="Active Agents" value="4" change="2 online now" icon={Users} tone="slate" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Ticket Inbox</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <SupportTable data={TicketData} />
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Live Support Queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {liveQueue.map(([issue, user, team, priority]) => (
              <div key={`${issue}-${user}`} className="rounded-lg border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-950">{issue}</div>
                    <div className="mt-1 text-sm text-slate-500">{user} / {team}</div>
                  </div>
                  <StatusPill tone={priority === "High" ? "danger" : "warning"}>{priority}</StatusPill>
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  <MessagesSquare className="mr-2 h-4 w-4" /> Open chat
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </ModulePage>
  );
}
