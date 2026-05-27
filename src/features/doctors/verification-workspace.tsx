"use client";

import { CheckCircle2, FileCheck2, ShieldCheck, Stethoscope, XCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";
import { useUIStore } from "@/store/ui-store";

export function VerificationWorkspace() {
  const openModal = useUIStore((state) => state.openModal);

  return (
    <ModulePage
      title="Doctor Verification Queue"
      description="Credential packets, license checks, approval/rejection workflow, and reviewer notes."
      icon={ShieldCheck}
      primaryAction="Approve selected"
      secondaryAction="Request documents"
    >
      <div className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Pending Credential Packet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 rounded-lg border bg-slate-50/60 p-4">
              <Avatar className="h-12 w-12 border">
                <AvatarImage src="https://avatar.vercel.sh/DrWilliamSmith.png" />
                <AvatarFallback>WS</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="font-semibold text-slate-950">Dr. William Smith</div>
                  <StatusPill tone="warning">Pending Review</StatusPill>
                </div>
                <p className="mt-1 text-sm text-slate-500">Neurology / United States / submitted 4 hours ago</p>
              </div>
            </div>

            {["Government ID", "Medical license", "Board certification", "Insurance certificate"].map((doc, index) => (
              <div key={doc} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <FileCheck2 className="h-5 w-5 text-teal-700" />
                  <div>
                    <div className="font-medium text-slate-900">{doc}</div>
                    <div className="text-sm text-slate-500">{index === 3 ? "Expires in 42 days" : "Verified against source"}</div>
                  </div>
                </div>
                <StatusPill tone={index === 3 ? "warning" : "success"}>{index === 3 ? "Review" : "Passed"}</StatusPill>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Reviewer Decision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-slate-50/60 p-4">
              <div className="font-semibold text-slate-950">Medical reviewer notes</div>
              <p className="mt-2 text-sm leading-6 text-slate-500">License is valid. Insurance is active but close to renewal threshold. Recommend conditional approval with renewal reminder.</p>
            </div>
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              onClick={() => openModal({
                type: "approve-doctor",
                title: "Approve doctor credentials",
                description: "This grants platform access and publishes the doctor to scheduling workflows.",
                entityId: "D-804",
                entityName: "Dr. William Smith",
              })}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" /> Approve credentials
            </Button>
            <Button
              variant="outline"
              className="w-full text-red-700 hover:bg-red-50 hover:text-red-800"
              onClick={() => openModal({
                type: "reject-doctor",
                title: "Reject doctor application",
                description: "This records a rejection decision and notifies the applicant.",
                entityId: "D-804",
                entityName: "Dr. William Smith",
              })}
            >
              <XCircle className="mr-2 h-4 w-4" /> Reject application
            </Button>
            <div className="rounded-lg border p-4">
              <Stethoscope className="mb-3 h-5 w-5 text-teal-700" />
              <div className="font-semibold text-slate-950">Post-approval workflow</div>
              <p className="mt-1 text-sm text-slate-500">Create provider profile, enable scheduling, and assign onboarding checklist.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModulePage>
  );
}
