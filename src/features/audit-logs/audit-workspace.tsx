import { Download, Filter, LockKeyhole, Search, ShieldAlert, ShieldCheck, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MetricCard } from "@/components/metrics/metric-card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";
import { ActivityTimeline } from "@/components/timelines/activity-timeline";

const logs = [
  ["LOG-9921", "admin@surecova.com", "Updated patient record", "Eleanor Richards", "10 min ago", "Info"],
  ["LOG-9920", "system", "Failed payout attempt", "Dr. Sarah Jenkins", "1 hour ago", "Warning"],
  ["LOG-9919", "support_tier2", "Escalated ticket", "Ticket #4092", "2 hours ago", "Info"],
  ["LOG-9918", "admin@surecova.com", "Changed role permissions", "Medical Reviewer", "3 hours ago", "Critical"],
  ["LOG-9917", "dr.smith@surecova.com", "Downloaded medical history", "James Wei", "5 hours ago", "Warning"],
];

export function AuditWorkspace() {
  return (
    <ModulePage
      title="Audit & Security Logs"
      description="Security events, admin activities, PHI access, permission changes, and compliance review workflows."
      icon={ShieldCheck}
      primaryAction="Export logs"
      secondaryAction="Create saved filter"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Events Today" value="1,284" change="All systems captured" icon={ShieldCheck} />
        <MetricCard label="Security Events" value="14" change="2 require review" icon={ShieldAlert} tone="amber" />
        <MetricCard label="PHI Access" value="428" change="Scoped by role policy" icon={LockKeyhole} tone="slate" />
        <MetricCard label="Admin Changes" value="36" change="Settings and workflow updates" icon={UserCog} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="rounded-lg">
          <div className="flex flex-col gap-3 border-b bg-slate-50/60 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input placeholder="Search user, action, target..." className="bg-white pl-9" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
              <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Export</Button>
            </div>
          </div>
          <CardContent className="overflow-x-auto p-0">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b bg-white text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Log ID</th>
                  <th className="px-5 py-3">Actor</th>
                  <th className="px-5 py-3">Action</th>
                  <th className="px-5 py-3">Target</th>
                  <th className="px-5 py-3">Time</th>
                  <th className="px-5 py-3">Severity</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(([id, actor, action, target, time, severity]) => (
                  <tr key={id} className="border-b last:border-0">
                    <td className="px-5 py-4 font-mono text-xs text-slate-500">{id}</td>
                    <td className="px-5 py-4 font-medium text-slate-800">{actor}</td>
                    <td className="px-5 py-4 text-slate-600">{action}</td>
                    <td className="px-5 py-4 text-slate-600">{target}</td>
                    <td className="px-5 py-4 text-slate-500">{time}</td>
                    <td className="px-5 py-4">
                      <StatusPill tone={severity === "Critical" ? "danger" : severity === "Warning" ? "warning" : "neutral"}>{severity}</StatusPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Security Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline
              items={[
                { title: "Permission changed", description: "Medical Reviewer role granted prescription review access.", time: "3h", tone: "danger" },
                { title: "PHI export requested", description: "Medical history downloaded by authorized clinician.", time: "5h", tone: "warning" },
                { title: "MFA challenge passed", description: "Finance admin approved payout batch after MFA.", time: "8h", tone: "success" },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </ModulePage>
  );
}
