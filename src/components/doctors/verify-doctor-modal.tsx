"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export function VerifyDoctorModal() {
  const [open, setOpen] = useState(false);

  const handleVerify = () => {
    toast.success("Doctor Verified", {
      description: "Dr. Sarah Jenkins has been granted platform access."
    });
    setOpen(false);
  };

  const handleReject = () => {
    toast.error("Verification Rejected", {
        description: "The applicant has been notified of the rejection."
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Verification Queue</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Verification Queue
          </DialogTitle>
          <DialogDescription>
            Review pending medical credentials before granting platform access.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div className="flex items-start gap-4 p-4 border rounded-lg bg-slate-50/50">
            <Avatar className="h-10 w-10">
                <AvatarImage src="https://avatar.vercel.sh/SJ.png" />
                <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
                <h4 className="font-semibold text-slate-800">Dr. Sarah Jenkins</h4>
                <p className="text-sm text-slate-500">Cardiology • 12 Years Experience</p>
                <div className="mt-3 text-sm space-y-2">
                    <div className="flex justify-between border-b pb-1">
                        <span className="text-slate-500">Medical License:</span>
                        <span className="font-medium text-slate-700">MD-8923145</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                        <span className="text-slate-500">Status:</span>
                        <span className="text-amber-600 font-medium">Pending Review</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex sm:justify-between items-center w-full sm:w-auto">
          <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleReject}>
             <XCircle className="w-4 h-4 mr-2" />
             Reject
          </Button>
          <Button onClick={handleVerify} className="bg-emerald-600 hover:bg-emerald-700">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Approve Credentials
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
