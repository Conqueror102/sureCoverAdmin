"use client";

import { AlertTriangle, Bell, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui-store";

const notifications = [
  {
    title: "Critical risk escalation",
    body: "Marcus Johnson has vitals outside emergency thresholds.",
    time: "2 min ago",
    tone: "danger",
  },
  {
    title: "Doctor verification ready",
    body: "7 credential packets are waiting for review.",
    time: "18 min ago",
    tone: "warning",
  },
  {
    title: "Payout batch approved",
    body: "May cycle payouts were approved by Finance.",
    time: "42 min ago",
    tone: "success",
  },
];

export function NotificationCenter() {
  const { notificationOpen, setNotificationOpen } = useUIStore();

  if (!notificationOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-[130] w-full max-w-md border-l bg-white shadow-2xl shadow-slate-950/20">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-950">Notification Center</h2>
          <p className="text-sm text-slate-500">Clinical and operational updates</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setNotificationOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3 p-4">
        {notifications.map((item) => {
          const Icon = item.tone === "danger" ? AlertTriangle : item.tone === "success" ? CheckCircle2 : Bell;
          return (
            <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex gap-3">
                <div className="rounded-lg bg-slate-50 p-2 text-teal-700">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">{item.title}</div>
                  <p className="mt-1 text-sm text-slate-500">{item.body}</p>
                  <p className="mt-2 text-xs font-medium text-slate-400">{item.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
