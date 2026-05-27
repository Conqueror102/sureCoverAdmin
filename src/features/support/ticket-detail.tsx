"use client";

import { AlertCircle, Clock, LifeBuoy, MessageSquare, Send, UserRound, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";
import { ActivityTimeline } from "@/components/timelines/activity-timeline";
import { useUIStore } from "@/store/ui-store";

const caseContext = [
  [UserRound, "Patient", "Marcus Johnson"],
  [AlertCircle, "Priority", "High"],
  [Clock, "SLA", "8 minutes remaining"],
  [MessageSquare, "Owner", "Support Tier 2"],
] satisfies Array<[LucideIcon, string, string]>;

export function TicketDetail() {
  const openModal = useUIStore((state) => state.openModal);

  return (
    <ModulePage
      title="Ticket T-4092"
      description="Escalated patient support case with conversation history, ownership, SLA, and internal resolution workflow."
      icon={LifeBuoy}
      primaryAction="Resolve ticket"
      secondaryAction="Escalate"
    >
      <div className="flex justify-end">
        <Button
          onClick={() => openModal({
            type: "resolve-ticket",
            title: "Resolve support ticket",
            description: "This closes the ticket, records an audit note, and updates support metrics.",
            entityId: "T-4092",
            entityName: "Ticket T-4092",
          })}
        >
          Resolve ticket
        </Button>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Support Conversation</CardTitle>
            <StatusPill tone="danger">Escalated</StatusPill>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ["Patient", "My payment failed but I need access to the emergency consultation feature."],
              ["Agent", "I can see the failed charge. I am escalating this to billing and keeping care access active temporarily."],
              ["Internal note", "Finance approval needed for 24-hour emergency access override."],
            ].map(([sender, message]) => (
              <div key={message} className="rounded-lg border bg-slate-50/60 p-3">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{sender}</div>
                <p className="text-sm text-slate-700">{message}</p>
              </div>
            ))}
            <div className="flex gap-2">
              <div className="flex-1 rounded-lg border bg-white px-3 py-2 text-sm text-slate-400">Write response...</div>
              <Button><Send className="mr-2 h-4 w-4" /> Send</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Case Context</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {caseContext.map(([RowIcon, label, value]) => (
                <div key={String(label)} className="flex items-center gap-3 rounded-lg border bg-slate-50/60 p-4">
                  <RowIcon className="h-4 w-4 text-teal-700" />
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</div>
                    <div className="text-sm font-medium text-slate-900">{value}</div>
                  </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Resolution Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityTimeline
            items={[
              { title: "Ticket created", description: "Patient reported failed payment and urgent care need.", time: "18m", tone: "warning" },
              { title: "Temporary access granted", description: "Support granted emergency access override.", time: "12m", tone: "success" },
              { title: "Finance escalation opened", description: "Billing recovery and invoice correction required.", time: "Now", tone: "danger" },
            ]}
          />
        </CardContent>
      </Card>
    </ModulePage>
  );
}
