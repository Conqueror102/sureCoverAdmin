import { Award, CalendarClock, DollarSign, FileCheck2, Star, Stethoscope, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/metrics/metric-card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";
import { ActivityTimeline } from "@/components/timelines/activity-timeline";

export function DoctorDetail() {
  return (
    <ModulePage
      title="Dr. Sarah Jenkins"
      description="Credential profile, patient load, availability, earnings, ratings, and clinical performance."
      icon={Stethoscope}
      primaryAction="Assign patients"
      secondaryAction="Suspend access"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active Patients" value="142" change="+18 this month" icon={Users} />
        <MetricCard label="Rating" value="4.9" change="1,284 reviews" icon={Star} />
        <MetricCard label="Cycle Earnings" value="$18.4k" change="Eligible for payout" icon={DollarSign} />
        <MetricCard label="Availability" value="Online" change="Accepting urgent cases" icon={CalendarClock} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="rounded-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border">
                <AvatarImage src="https://avatar.vercel.sh/DrSarahJenkins.png" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-lg font-semibold text-slate-950">Cardiology</div>
                <p className="text-sm text-slate-500">United Kingdom / 12 years experience</p>
                <StatusPill tone="success" className="mt-3">Verified</StatusPill>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {["Medical license MD-8923145", "Board certification verified", "Identity check passed", "Malpractice insurance active"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border bg-slate-50/60 p-3">
                  <FileCheck2 className="h-4 w-4 text-teal-700" />
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Performance Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline
              items={[
                { title: "Emergency consultation completed", description: "Accepted high-risk handoff in under two minutes.", time: "Today", tone: "success" },
                { title: "Credential audit passed", description: "License and insurance documents reviewed by Medical Ops.", time: "2d", tone: "success" },
                { title: "Patient cohort expanded", description: "Assigned 18 new hypertension patients.", time: "1w", tone: "neutral" },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-teal-700" /> Quality Signals</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {["Avg response time 3.1m", "Clinical note completion 98%", "Patient retention 91%"].map((item) => (
            <div key={item} className="rounded-lg border bg-slate-50/60 p-4 text-sm font-medium text-slate-700">{item}</div>
          ))}
        </CardContent>
      </Card>
    </ModulePage>
  );
}
