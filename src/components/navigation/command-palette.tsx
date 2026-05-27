"use client";

import Link from "next/link";
import { Building2, FileText, Pill, ReceiptText, Search, Ticket, UserRound, X } from "lucide-react";
import { useMemo, useState } from "react";
import { dashboardRoutes } from "@/constants/routes";
import { canAccess } from "@/config/permissions";
import { useUIStore } from "@/store/ui-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const searchableRecords = [
  { label: "Marcus Johnson", meta: "High-risk patient / P-1002", href: "/users/P-1002", icon: UserRound },
  { label: "Eleanor Richards", meta: "Premium patient / P-1001", href: "/users/P-1001", icon: UserRound },
  { label: "Dr. Sarah Jenkins", meta: "Verified cardiologist / D-801", href: "/doctors/D-801", icon: UserRound },
  { label: "SureCova London Heart Institute", meta: "Hospital / H-1001", href: "/hospitals/H-1001", icon: Building2 },
  { label: "CarePlus Rx Network", meta: "Pharmacy partner / PH-2402", href: "/pharmacies/PH-2402", icon: Pill },
  { label: "Consultation C-1092", meta: "Live emergency session", href: "/consultations/C-1092", icon: FileText },
  { label: "Invoice INV-48292", meta: "Failed payment retrying", href: "/subscriptions/invoices", icon: ReceiptText },
  { label: "Ticket T-4092", meta: "Escalated billing support", href: "/support/tickets/T-4092", icon: Ticket },
];

export function CommandPalette() {
  const { commandOpen, setCommandOpen, role } = useUIStore();
  const [query, setQuery] = useState("");
  const routes = dashboardRoutes.filter((route) => canAccess(role, route.permission));
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return searchableRecords;

    return searchableRecords.filter((record) =>
      `${record.label} ${record.meta}`.toLowerCase().includes(normalized)
    );
  }, [query]);

  if (!commandOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/30 p-4 backdrop-blur-sm" onClick={() => setCommandOpen(false)}>
      <div
        className="mx-auto mt-16 max-w-2xl overflow-hidden rounded-xl border bg-white shadow-2xl shadow-slate-950/20"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <Search className="h-4 w-4 text-slate-400" />
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search patients, doctors, prescriptions, invoices..."
            className="h-9 border-none bg-transparent px-0 shadow-none focus-visible:ring-0"
          />
          <Button variant="ghost" size="icon" onClick={() => setCommandOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="max-h-[420px] overflow-y-auto p-2">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Results</p>
          {results.map((record) => (
            <Link
              key={`${record.href}-${record.label}`}
              href={record.href}
              onClick={() => setCommandOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-slate-50"
            >
              <record.icon className="h-4 w-4 text-teal-600" />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-slate-700">{record.label}</span>
                <span className="block truncate text-xs text-slate-400">{record.meta}</span>
              </span>
            </Link>
          ))}
          {!results.length ? <div className="px-3 py-6 text-center text-sm text-slate-500">No matching records.</div> : null}

          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Modules</p>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setCommandOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm hover:bg-slate-50"
            >
              <span className="flex items-center gap-3 font-medium text-slate-700">
                <route.icon className={cn("h-4 w-4", route.tone === "danger" ? "text-red-500" : "text-teal-600")} />
                {route.label}
              </span>
              <span className="text-xs text-slate-400">{route.group}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
