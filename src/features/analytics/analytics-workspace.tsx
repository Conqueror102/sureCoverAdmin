"use client";

import { BarChart3, Calendar, Download, Filter, Globe2, TrendingUp, Users, Activity } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/metrics/metric-card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";

const growth = [
  { month: "Jan", patients: 18200, doctors: 920 },
  { month: "Feb", patients: 20100, doctors: 980 },
  { month: "Mar", patients: 22300, doctors: 1040 },
  { month: "Apr", patients: 25200, doctors: 1120 },
  { month: "May", patients: 28430, doctors: 1210 },
];

const health = [
  { condition: "Diabetes", value: 38 },
  { condition: "Hypertension", value: 44 },
  { condition: "Asthma", value: 18 },
  { condition: "CHF", value: 12 },
];

export function AnalyticsWorkspace() {
  return (
    <ModulePage
      title="Analytics"
      description="Revenue, user growth, doctor performance, health trends, geography, exports, and date-filtered operational intelligence."
      icon={BarChart3}
      primaryAction="Generate report"
      secondaryAction="Export CSV"
    >
      <div className="flex flex-wrap gap-2">
        <Button variant="outline"><Calendar className="mr-2 h-4 w-4" /> Last 30 days</Button>
        <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Segment</Button>
        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Patient Growth" value="+12.8%" change="Month over month" icon={Users} />
        <MetricCard label="Revenue Growth" value="+18.4%" change="Net of refunds" icon={TrendingUp} />
        <MetricCard label="High Risk Trend" value="-6.2%" change="Fewer unresolved escalations" icon={Activity} tone="slate" />
        <MetricCard label="Countries Active" value="42" change="8 priority markets" icon={Globe2} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={280}>
              <AreaChart data={growth}>
                <defs>
                  <linearGradient id="patientsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D9488" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="patients" stroke="#0D9488" fill="url(#patientsGradient)" strokeWidth={2} />
                <Area type="monotone" dataKey="doctors" stroke="#2563eb" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Chronic Illness Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={280}>
              <BarChart data={health} layout="vertical" margin={{ left: 28 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis dataKey="condition" type="category" axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#0D9488" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Revenue Analytics", "MRR, ARPU, failed payments, refunds, and cohorts.", "Ready"],
          ["Doctor Performance", "Capacity, ratings, response time, and earnings.", "Ready"],
          ["Geographic Analytics", "Country demand, doctor supply, and emergency volume.", "Beta"],
        ].map(([title, copy, state]) => (
          <Card key={title} className="rounded-lg">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-slate-950">{title}</div>
                  <p className="mt-1 text-sm text-slate-500">{copy}</p>
                </div>
                <StatusPill tone={state === "Beta" ? "warning" : "success"}>{state}</StatusPill>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ModulePage>
  );
}
