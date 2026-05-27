import { History } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function PayoutHistoryPage() {
  return <SectionPage title="Payout History" description="Completed payouts, provider reconciliation, failed transfers, and exports." icon={History} items={["Completed payouts", "Failed transfers", "Exports"]} />;
}
