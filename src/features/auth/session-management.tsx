"use client";

import { Laptop, LockKeyhole, MapPin, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";

const sessions = [
  ["MacBook Pro", "Lagos, NG", "Current session", "Active", "desktop"],
  ["iPhone 15", "London, UK", "2 hours ago", "MFA verified", "mobile"],
  ["Windows Workstation", "Austin, US", "Yesterday", "Revoked", "desktop"],
];

export function SessionManagement() {
  return (
    <ModulePage
      title="Session Management"
      description="Review active admin sessions, device history, MFA state, and revoke access from unknown devices."
      icon={LockKeyhole}
      primaryAction="Revoke all others"
      secondaryAction="Download device log"
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {sessions.map(([device, location, lastSeen, state, type]) => {
          const Icon = type === "mobile" ? Smartphone : Laptop;
          return (
            <Card key={device} className="rounded-lg">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="rounded-lg border bg-slate-50 p-2 text-teal-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <StatusPill tone={state === "Revoked" ? "danger" : state === "Active" ? "success" : "info"}>{state}</StatusPill>
                </div>
                <div className="mt-5 font-semibold text-slate-950">{device}</div>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="h-4 w-4" /> {location}
                </div>
                <div className="mt-1 text-sm text-slate-500">{lastSeen}</div>
                <Button variant="outline" size="sm" className="mt-5 w-full" disabled={state === "Revoked"}>
                  {state === "Revoked" ? "Already revoked" : "Revoke session"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>MFA Policy</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {["Authenticator app required", "Recovery codes rotated", "New device approval"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg border bg-slate-50/60 p-4">
              <ShieldCheck className="h-5 w-5 text-teal-700" />
              <span className="text-sm font-medium text-slate-700">{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </ModulePage>
  );
}
