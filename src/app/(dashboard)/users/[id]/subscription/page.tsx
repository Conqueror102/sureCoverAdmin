import { CreditCard } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function UserSubscriptionPage() {
  return <SectionPage title="Patient Subscription" description="Plan status, invoices, failed payment recovery, and subscription entitlements." icon={CreditCard} items={["Active plan", "Billing timeline", "Entitlements"]} />;
}
