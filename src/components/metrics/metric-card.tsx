import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "flat";
  icon: LucideIcon;
  tone?: "teal" | "red" | "amber" | "slate";
};

const toneClasses = {
  teal: "bg-teal-50 text-teal-700 border-teal-100",
  red: "bg-red-50 text-red-700 border-red-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  slate: "bg-slate-50 text-slate-700 border-slate-100",
};

export function MetricCard({ label, value, change, trend = "flat", icon: Icon, tone = "teal" }: MetricCardProps) {
  const TrendIcon = trend === "down" ? ArrowDownRight : ArrowUpRight;

  return (
    <Card className="rounded-lg border-slate-200/80 shadow-sm shadow-slate-200/40">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{value}</div>
          </div>
          <div className={cn("rounded-lg border p-2.5", toneClasses[tone])}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        {change ? (
          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-500">
            {trend !== "flat" ? <TrendIcon className="h-3.5 w-3.5 text-teal-600" /> : null}
            <span>{change}</span>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
