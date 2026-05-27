"use client";

import { Activity, AlertTriangle, DollarSign, ShieldAlert, Stethoscope, Users, Video } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/metrics/metric-card";
import { MetricsSkeleton } from "@/components/loaders/skeleton";
import { RiskBadge } from "@/components/health/risk-badge";
import { ModulePage } from "@/components/shared/module-page";
import { useCommandCenter } from "@/hooks/use-platform-data";
import { Button } from "@/components/ui/button";

export function CommandCenter() {
  const { data, isLoading } = useCommandCenter();

  if (isLoading || !data) {
    return (
      <ModulePage
        title="Command Center"
        description="Operational overview for revenue, clinical capacity, patient risk, and platform incidents."
        primaryAction="Download report"
      >
        <MetricsSkeleton />
      </ModulePage>
    );
  }

  const { metrics } = data;

  return (
    <ModulePage
      title="Command Center"
      description="Operational overview for revenue, clinical capacity, patient risk, and platform incidents."
      primaryAction="Download report"
      secondaryAction="Customize view"
      icon={Activity}
      eyebrow="SureCova Admin"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Monthly Revenue" value={`$${metrics.monthlyRevenue.toLocaleString()}`} change="+18.4% from last month" trend="up" icon={DollarSign} />
        <MetricCard label="Active Patients" value={metrics.activePatients.toLocaleString()} change="+642 new patients" trend="up" icon={Users} />
        <MetricCard label="Online Doctors" value={metrics.onlineDoctors.toString()} change="43 in consultation" icon={Stethoscope} />
        <MetricCard label="Emergency Escalations" value={metrics.emergencyEscalations.toString()} change="Requires immediate review" icon={ShieldAlert} tone="red" />
      </div>

      <div className="grid gap-4 xl:grid-cols-7">
        <Card className="rounded-lg xl:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue Analytics</CardTitle>
              <p className="mt-1 text-sm text-slate-500">Subscriptions, consultations, and doctor payout exposure.</p>
            </div>
            <Button variant="outline" size="sm">Export</Button>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.revenue} margin={{ left: -16, right: 12, top: 10 }}>
                <defs>
                  <linearGradient id="tealRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D9488" stopOpacity={0.26} />
                    <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Area type="monotone" dataKey="subscriptions" stroke="#0D9488" fill="url(#tealRevenue)" strokeWidth={2} />
                <Area type="monotone" dataKey="consultations" stroke="#2563eb" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-lg xl:col-span-3">
          <CardHeader>
            <CardTitle>Emergency Watchlist</CardTitle>
            <p className="text-sm text-slate-500">Live escalations needing clinical coordination.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.emergencies.map((alert) => (
              <div key={alert.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-950">{alert.patient}</div>
                    <p className="mt-1 text-sm text-slate-500">{alert.condition}</p>
                  </div>
                  <RiskBadge level={alert.riskLevel} />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>{alert.vitals}</span>
                  <span>{alert.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <MetricCard label="Consultations Today" value={metrics.consultationsToday.toString()} change="Avg wait time 4.2 min" icon={Video} tone="slate" />
        <MetricCard label="High Risk Patients" value={metrics.highRiskPatients.toString()} change="22 require check-ins" icon={AlertTriangle} tone="amber" />
        <MetricCard label="Doctor Verification Queue" value={metrics.verificationQueue.toString()} change="Credentials pending review" icon={Stethoscope} tone="slate" />
      </div>
    </ModulePage>
  );
}
