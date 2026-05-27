import type { LucideIcon } from "lucide-react";
import { Activity, CheckCircle2, Filter, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/metrics/metric-card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";
import { ActivityTimeline } from "@/components/timelines/activity-timeline";

type WorkflowPageProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  primaryAction?: string;
  secondaryAction?: string;
  metrics: Array<{ label: string; value: string; change: string; icon?: LucideIcon; tone?: "teal" | "red" | "amber" | "slate" }>;
  queueTitle: string;
  queue: Array<{ title: string; subtitle: string; status: string; tone?: "success" | "warning" | "danger" | "neutral" | "info" }>;
  timeline: Array<{ title: string; description: string; time: string; tone?: "success" | "warning" | "danger" | "neutral" }>;
};

export function WorkflowPage({
  title,
  description,
  icon,
  primaryAction = "Create workflow",
  secondaryAction = "Export",
  metrics,
  queueTitle,
  queue,
  timeline,
}: WorkflowPageProps) {
  return (
    <ModulePage title={title} description={description} icon={icon} primaryAction={primaryAction} secondaryAction={secondaryAction}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            change={metric.change}
            icon={metric.icon || Activity}
            tone={metric.tone}
          />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{queueTitle}</CardTitle>
            <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {queue.map((item) => (
              <div key={`${item.title}-${item.subtitle}`} className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-semibold text-slate-950">{item.title}</div>
                  <div className="mt-1 text-sm text-slate-500">{item.subtitle}</div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusPill tone={item.tone || "neutral"}>{item.status}</StatusPill>
                  <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Workflow Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline items={timeline} />
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-lg">
        <CardContent className="grid gap-3 p-5 md:grid-cols-3">
          {["Permission scoped", "Audit captured", "Backend-ready actions"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg border bg-slate-50/60 p-4">
              <CheckCircle2 className="h-4 w-4 text-teal-700" />
              <span className="text-sm font-medium text-slate-700">{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </ModulePage>
  );
}
