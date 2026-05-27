import { Landmark } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function PaymentSettingsPage() {
  return <SectionPage title="Payment Integrations" description="Payment processors, payout providers, webhooks, currencies, and tax settings." icon={Landmark} items={["Processors", "Webhooks", "Currencies"]} />;
}
