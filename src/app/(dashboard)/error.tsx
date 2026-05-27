"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="max-w-md rounded-xl border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-red-600">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-xl font-semibold text-slate-950">This module failed to load</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {error.message || "Refresh this module or return to another workspace."}
        </p>
        <Button className="mt-6" onClick={reset}>Retry module</Button>
      </div>
    </div>
  );
}
