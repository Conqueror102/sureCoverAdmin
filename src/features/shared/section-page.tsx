import type { LucideIcon } from "lucide-react";
import { ArrowRight, CheckCircle2, Clock, FileText, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModulePage } from "@/components/shared/module-page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/metrics/metric-card";
import { ActivityTimeline } from "@/components/timelines/activity-timeline";

export function SectionPage({
  title,
  description,
  icon = FileText,
  items,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
  items: string[];
}) {
  return (
    <ModulePage title={title} description={description} icon={icon} primaryAction="Create workflow" secondaryAction="Export">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Open Items" value={(items.length * 12).toString()} change="Across this workspace" icon={icon} />
        <MetricCard label="In Review" value={(items.length + 3).toString()} change="Needs admin action" icon={Clock} tone="amber" />
        <MetricCard label="Completed" value={(items.length * 28).toString()} change="Last 30 days" icon={CheckCircle2} />
        <MetricCard label="Audit Coverage" value="100%" change="All actions tracked" icon={FileText} tone="slate" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Operational Queue</CardTitle>
            <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.map((item, index) => (
              <div key={item} className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-semibold text-slate-950">{item}</div>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Backend-ready workflow with permission checks, audit capture, and contextual actions.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      index === 0
                        ? "border-teal-200 bg-teal-50 text-teal-700"
                        : index === 1
                          ? "border-amber-200 bg-amber-50 text-amber-700"
                          : "border-slate-200 bg-slate-50 text-slate-700"
                    }
                  >
                    {index === 0 ? "Live" : index === 1 ? "Review" : "Ready"}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    Open <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline
              items={[
                { title: `${items[0] || "Workflow"} updated`, description: "Admin action recorded and queued for backend sync.", time: "Today", tone: "success" },
                { title: `${items[1] || "Review"} requires attention`, description: "A reviewer or operator action is pending.", time: "2h", tone: "warning" },
                { title: "Audit event captured", description: "Change history is available for compliance review.", time: "Now", tone: "neutral" },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </ModulePage>
  );
}
