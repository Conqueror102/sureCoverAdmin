"use client";

import { AlertTriangle, CheckCircle2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminMutations } from "@/hooks/use-admin-mutations";
import { useUIStore } from "@/store/ui-store";

export function ModalManager() {
  const activeModal = useUIStore((state) => state.activeModal);
  const closeModal = useUIStore((state) => state.closeModal);
  const mutations = useAdminMutations();

  const runAction = () => {
    if (!activeModal) return;
    const payload = { entityId: activeModal.entityId, entityName: activeModal.entityName };

    if (activeModal.type === "approve-doctor") mutations.approveDoctor.mutate(payload);
    if (activeModal.type === "reject-doctor") mutations.rejectDoctor.mutate(payload);
    if (activeModal.type === "assign-doctor") mutations.assignDoctor.mutate(payload);
    if (activeModal.type === "resolve-ticket") mutations.resolveTicket.mutate(payload);
    if (activeModal.type === "approve-payout") mutations.approvePayout.mutate(payload);
    if (activeModal.type === "approve-refund") mutations.approveRefund.mutate(payload);
    closeModal();
  };

  return (
    <Dialog open={Boolean(activeModal)} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {activeModal?.type === "assign-doctor" ? <UserPlus className="h-5 w-5 text-teal-700" /> : activeModal?.type.includes("reject") ? <AlertTriangle className="h-5 w-5 text-red-600" /> : <CheckCircle2 className="h-5 w-5 text-teal-700" />}
            {activeModal?.title}
          </DialogTitle>
          <DialogDescription>{activeModal?.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="rounded-lg border bg-slate-50/60 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Target</div>
            <div className="mt-1 font-medium text-slate-900">{activeModal?.entityName || activeModal?.entityId || "Selected record"}</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="modal-note">Internal note</Label>
            <Input id="modal-note" placeholder="Add an audit note for this action" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeModal}>Cancel</Button>
          <Button onClick={runAction}>Confirm action</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
