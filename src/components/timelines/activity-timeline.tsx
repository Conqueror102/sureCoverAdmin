import { CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export type TimelineItem = {
  title: string;
  description: string;
  time: string;
  tone?: "success" | "warning" | "danger" | "neutral";
};

export function ActivityTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const Icon = item.tone === "danger" ? ShieldAlert : item.tone === "success" ? CheckCircle2 : Clock;
        return (
          <div key={`${item.title}-${item.time}`} className="relative flex gap-3">
            {index < items.length - 1 ? <div className="absolute left-4 top-9 h-[calc(100%-1rem)] w-px bg-slate-200" /> : null}
            <div
              className={cn(
                "z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-white",
                item.tone === "danger" && "border-red-200 text-red-600",
                item.tone === "success" && "border-emerald-200 text-emerald-600",
                item.tone === "warning" && "border-amber-200 text-amber-600",
                (!item.tone || item.tone === "neutral") && "border-slate-200 text-slate-500"
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-slate-900">{item.title}</p>
                <span className="text-xs font-medium text-slate-400">{item.time}</span>
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-500">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
