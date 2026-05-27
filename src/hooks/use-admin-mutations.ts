"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "@/services/api-client";
import { queryKeys } from "@/hooks/use-platform-data";

type MutationPayload = {
  entityId?: string;
  entityName?: string;
  note?: string;
};

function useAdminAction(action: string, successMessage: string, invalidate: readonly unknown[]) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: MutationPayload) =>
      apiClient(`/api/admin-actions/${action}`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onMutate: (payload) => {
      toast.loading(`${successMessage}...`, {
        id: action,
        description: payload.entityName,
      });
    },
    onSuccess: (_result, payload) => {
      toast.success(successMessage, {
        id: action,
        description: payload.entityName || "Action completed.",
      });
      queryClient.invalidateQueries({ queryKey: invalidate });
    },
    onError: (error) => {
      toast.error("Action failed", {
        id: action,
        description: error instanceof Error ? error.message : "Please try again.",
      });
    },
  });
}

export function useAdminMutations() {
  return {
    approveDoctor: useAdminAction("approve-doctor", "Doctor approved", queryKeys.doctors),
    rejectDoctor: useAdminAction("reject-doctor", "Doctor rejected", queryKeys.doctors),
    assignDoctor: useAdminAction("assign-doctor", "Doctor assigned", queryKeys.patients),
    resolveTicket: useAdminAction("resolve-ticket", "Ticket resolved", ["support"]),
    approvePayout: useAdminAction("approve-payout", "Payout approved", ["payouts"]),
    approveRefund: useAdminAction("approve-refund", "Refund approved", ["subscriptions"]),
  };
}
