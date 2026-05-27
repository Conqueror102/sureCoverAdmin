import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ModulePage({
  title,
  description,
  icon: Icon,
  eyebrow,
  primaryAction,
  secondaryAction,
  children,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
  eyebrow?: string;
  primaryAction?: string;
  secondaryAction?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          {Icon ? (
            <div className="mt-1 rounded-lg border border-teal-100 bg-teal-50 p-2 text-teal-700">
              <Icon className="h-5 w-5" />
            </div>
          ) : null}
          <div>
            {eyebrow ? <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-teal-700">{eyebrow}</p> : null}
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950 lg:text-3xl">{title}</h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-500">{description}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {secondaryAction ? <Button variant="outline">{secondaryAction}</Button> : null}
          {primaryAction ? <Button>{primaryAction}</Button> : null}
        </div>
      </div>
      {children}
    </div>
  );
}
