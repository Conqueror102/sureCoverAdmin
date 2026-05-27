import { FileText, MessageSquare, Mic, ShieldAlert, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskBadge } from "@/components/health/risk-badge";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";
import { ActivityTimeline } from "@/components/timelines/activity-timeline";

export function ConsultationDetail() {
  return (
    <ModulePage
      title="Consultation C-1092"
      description="Live emergency consultation with clinical context, transcript, moderation state, and prescription review."
      icon={Video}
      primaryAction="Join session"
      secondaryAction="Flag for review"
    >
      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Live Session</CardTitle>
            <StatusPill tone="success">Live</StatusPill>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {["Marcus Johnson", "Dr. Michael Chen"].map((name) => (
                <div key={name} className="rounded-xl border bg-slate-950 p-5 text-white">
                  <div className="flex h-52 items-center justify-center rounded-lg bg-slate-900">
                    <Avatar className="h-16 w-16 border border-white/20">
                      <AvatarImage src={`https://avatar.vercel.sh/${name}.png`} />
                      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-medium">{name}</span>
                    <Mic className="h-4 w-4 text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button><Video className="mr-2 h-4 w-4" /> Resume video</Button>
              <Button variant="outline"><ShieldAlert className="mr-2 h-4 w-4" /> Escalate</Button>
              <Button variant="outline"><FileText className="mr-2 h-4 w-4" /> Open notes</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Clinical Context</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Risk level</span>
              <RiskBadge level="critical" />
            </div>
            {[
              ["Vitals", "HR 42 bpm / BP 90-60"],
              ["Condition", "Severe chest pain, bradycardia"],
              ["Medication", "Lisinopril 10mg"],
              ["Care plan", "Premium chronic monitoring"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b pb-3 last:border-0">
                <span className="text-sm text-slate-500">{label}</span>
                <span className="text-sm font-medium text-slate-900">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Transcript & Moderation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ["Patient", "I feel pressure in my chest and I am getting dizzy."],
              ["Doctor", "Stay seated. I am going to keep you on the line while support coordinates local emergency care."],
              ["System", "Moderation note: emergency escalation language detected and routed to operations."],
            ].map(([speaker, message]) => (
              <div key={message} className="rounded-lg border bg-slate-50/60 p-3">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{speaker}</div>
                <p className="text-sm text-slate-700">{message}</p>
              </div>
            ))}
            <Button variant="outline"><MessageSquare className="mr-2 h-4 w-4" /> Add moderator note</Button>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Session Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline
              items={[
                { title: "Session opened", description: "Patient entered emergency consultation queue.", time: "10:08", tone: "warning" },
                { title: "Doctor joined", description: "Clinical review began with vitals attached.", time: "10:15", tone: "success" },
                { title: "Emergency dispatch", description: "Support coordinator initiated local handoff.", time: "10:22", tone: "danger" },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </ModulePage>
  );
}
