import { WalletCards } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function WithdrawalRequestsPage() {
  return <SectionPage title="Withdrawal Requests" description="Doctor withdrawals, fraud checks, approval flow, and transfer status." icon={WalletCards} items={["Pending requests", "Fraud checks", "Transfer status"]} />;
}
