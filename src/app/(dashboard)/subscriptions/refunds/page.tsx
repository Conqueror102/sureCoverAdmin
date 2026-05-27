import { Undo2 } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function RefundsPage() {
  return <SectionPage title="Refund Requests" description="Refund approvals, policy checks, and payment processor handoff." icon={Undo2} items={["Pending refunds", "Approved refunds", "Policy checks"]} />;
}
