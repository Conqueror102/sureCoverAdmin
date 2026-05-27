"use client";

import { Clock, FileText, MessageSquare, Mic, MoreHorizontal, PhoneCall, Plus, ShieldAlert, Video } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskBadge } from "@/components/health/risk-badge";
import { MetricsSkeleton } from "@/components/loaders/skeleton";
import { MetricCard } from "@/components/metrics/metric-card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";
import { ActivityTimeline } from "@/components/timelines/activity-timeline";
import { useConsultations } from "@/hooks/use-platform-data";

const messages = [
  ["Patient", "I am feeling dizzy and my chest feels tight."],
  ["Doctor", "I am reviewing your vitals now. Please stay seated and keep your phone nearby."],
  ["System", "AI risk model flagged bradycardia pattern for clinical review."],
];

export function ConsultationsWorkspace() {
  const { data, isLoading } = useConsultations();

  return (
    <ModulePage
      title="Consultations"
      description="Manage live telemedicine sessions, waiting rooms, moderation flags, voice controls, prescriptions, and clinical timelines."
      icon={Video}
      primaryAction="Schedule session"
      secondaryAction="Moderation queue"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Consultations Today" value="245" change="18 active right now" icon={Video} />
        <MetricCard label="Avg Wait Time" value="4.2m" change="Within SLA" icon={Clock} tone="slate" />
        <MetricCard label="Flagged Conversations" value="6" change="Requires moderator review" icon={ShieldAlert} tone="amber" />
        <MetricCard label="Prescriptions Issued" value="84" change="12 pending pharmacy review" icon={FileText} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.95fr]">
        <Card className="rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Live Consultation Queue</CardTitle>
            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">3 active</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading || !data ? (
              <MetricsSkeleton />
            ) : (
              data.map((call) => (
                <div key={call.id} className="rounded-lg border bg-white p-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="flex min-w-64 items-center gap-3">
                      <Avatar className="h-11 w-11 border">
                        <AvatarImage src={`https://avatar.vercel.sh/${call.patient}.png`} />
                        <AvatarFallback>{call.patient.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-slate-950">{call.patient}</div>
                        <div className="text-sm text-slate-500">with {call.doctor}</div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusPill tone={call.status === "Live" ? "success" : call.status === "Flagged" ? "danger" : call.status === "Waiting Room" ? "warning" : "neutral"}>
                          {call.status}
                        </StatusPill>
                        <RiskBadge level={call.riskLevel} />
                        <span className="text-sm text-slate-500">{call.type}</span>
                      </div>
                      <div className="mt-2 text-sm text-slate-500">{call.startedAt} / {call.duration}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild size="sm">
                        <Link href={`/consultations/${call.id}`}>{call.status === "Live" ? "Join" : "Open"}</Link>
                      </Button>
                      <Button asChild variant="outline" size="icon">
                        <Link href={`/consultations/${call.id}`}><MoreHorizontal className="h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Session Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline
              items={[
                { title: "Patient entered waiting room", description: "Vitals and triage form attached to session.", time: "10:08", tone: "neutral" },
                { title: "Doctor joined consultation", description: "Clinical reviewer joined with high-risk context visible.", time: "10:15", tone: "success" },
                { title: "Prescription review started", description: "Medication interaction check generated two warnings.", time: "10:31", tone: "warning" },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="rounded-lg xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Live Chat & Voice Console</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Mic className="mr-2 h-4 w-4" /> Mute</Button>
              <Button variant="outline" size="sm"><PhoneCall className="mr-2 h-4 w-4" /> Escalate</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {messages.map(([sender, message]) => (
              <div key={message} className="rounded-lg border bg-slate-50/60 p-3">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{sender}</div>
                <p className="text-sm text-slate-700">{message}</p>
              </div>
            ))}
            <div className="flex gap-2">
              <div className="flex-1 rounded-lg border bg-white px-3 py-2 text-sm text-slate-400">Write internal note or moderator message...</div>
              <Button><MessageSquare className="mr-2 h-4 w-4" /> Send</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Prescription Draft</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Lisinopril 10mg", "Albuterol inhaler", "Metformin 500mg"].map((drug, index) => (
              <div key={drug} className="rounded-lg border p-3">
                <div className="font-medium text-slate-900">{drug}</div>
                <div className="mt-1 text-sm text-slate-500">{index === 0 ? "Interaction review required" : "Ready for physician signature"}</div>
              </div>
            ))}
            <Button variant="outline" className="w-full"><Plus className="mr-2 h-4 w-4" /> Add medication</Button>
          </CardContent>
        </Card>
      </div>
    </ModulePage>
  );
}
