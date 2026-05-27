import { PanelsTopLeft } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function SubscriptionPlansPage() {
  return <SectionPage title="Subscription Plans" description="Pricing tiers, entitlements, care bundles, and plan availability." icon={PanelsTopLeft} items={["Basic", "Premium", "Enterprise"]} />;
}
