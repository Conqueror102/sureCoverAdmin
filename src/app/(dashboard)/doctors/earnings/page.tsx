import { DollarSign } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function DoctorEarningsPage() {
  return <SectionPage title="Doctor Earnings" description="Earnings summaries, payout eligibility, withholding, and payout reconciliation." icon={DollarSign} items={["Earnings summary", "Pending payouts", "Reconciliation"]} />;
}
