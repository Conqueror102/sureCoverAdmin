import { CreditCard } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function FailedPaymentsPage() {
  return <SectionPage title="Failed Payments" description="Dunning workflow, retry status, payment failures, and revenue recovery." icon={CreditCard} items={["Retry queue", "At-risk revenue", "Recovery actions"]} />;
}
