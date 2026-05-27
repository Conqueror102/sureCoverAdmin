"use client";

import { Activity, Ambulance, AlertTriangle, HeartPulse, PhoneCall, ShieldAlert, Siren } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskBadge } from "@/components/health/risk-badge";
import { MetricsSkeleton } from "@/components/loaders/skeleton";
import { MetricCard } from "@/components/metrics/metric-card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";
import { ActivityTimeline } from "@/components/timelines/activity-timeline";
import { useEmergencies } from "@/hooks/use-platform-data";

export function EmergencyWorkspace() {
  const { data, isLoading } = useEmergencies();

  return (
    <ModulePage
      title="Emergency Command Center"
      description="Real-time triage, responder coordination, high-risk vitals, and escalation workflow control."
      icon={ShieldAlert}
      eyebrow="Live Clinical Operations"
      primaryAction="Dispatch support"
      secondaryAction="Broadcast alert"
    >
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-900">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-red-600 p-2 text-white">
              <Siren className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold">Critical escalation protocol active</div>
              <p className="mt-1 text-sm text-red-700">Emergency cases are prioritized above scheduled consultations until cleared by medical operations.</p>
            </div>
          </div>
          <Button className="bg-red-600 hover:bg-red-700">Open incident bridge</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Critical Queue" value="1" change="Immediate response required" icon={AlertTriangle} tone="red" />
        <MetricCard label="High Risk Vitals" value="2" change="AI-triggered escalations" icon={HeartPulse} tone="amber" />
        <MetricCard label="Active Responders" value="4" change="2 doctors, 2 support coordinators" icon={PhoneCall} tone="slate" />
        <MetricCard label="Avg Handoff" value="3.8m" change="Target under 5 minutes" icon={Ambulance} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Live Emergency Queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading || !data ? (
              <MetricsSkeleton />
            ) : (
              data.map((alert) => (
                <div key={alert.id} className="rounded-lg border bg-white p-4 shadow-sm">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="flex min-w-64 items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-red-100">
                          <AvatarImage src={`https://avatar.vercel.sh/${alert.patient}.png`} />
                          <AvatarFallback>{alert.patient.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {alert.riskLevel === "critical" ? <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-red-600 ring-2 ring-white" /> : null}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-950">{alert.patient}</div>
                        <div className="text-xs font-medium text-slate-500">{alert.id} / {alert.time}</div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-slate-900">{alert.condition}</div>
                      <div className="mt-1 font-mono text-xs text-slate-500">{alert.vitals}</div>
                    </div>
                    <RiskBadge level={alert.riskLevel} />
                    <div className="w-48">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Status</div>
                      <div className="mt-1 text-sm font-medium text-slate-800">{alert.status}</div>
                    </div>
                    <Button size="sm" variant={alert.riskLevel === "critical" ? "default" : "outline"}>View chart</Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Escalation Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline
              items={[
                { title: "AI risk alert created", description: "Vitals crossed chest-pain and bradycardia thresholds.", time: "2m", tone: "danger" },
                { title: "Responder assigned", description: "Dr. Michael Chen accepted emergency handoff.", time: "1m", tone: "success" },
                { title: "Ambulance dispatched", description: "Support coordinator confirmed local emergency response.", time: "Now", tone: "warning" },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {["Vitals telemetry", "Caregiver contact", "Emergency notes"].map((item) => (
          <Card key={item} className="rounded-lg">
            <CardContent className="p-5">
              <Activity className="mb-3 h-5 w-5 text-teal-700" />
              <div className="font-semibold text-slate-950">{item}</div>
              <p className="mt-1 text-sm text-slate-500">Context panel ready for real-time stream, permissions, and audit capture.</p>
              <StatusPill tone="success" className="mt-4">Connected</StatusPill>
            </CardContent>
          </Card>
        ))}
      </div>
    </ModulePage>
  );
}
