import { BellRing } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function NotificationSettingsPage() {
  return <SectionPage title="Notification Settings" description="Routing rules, alert thresholds, SMS providers, and emergency notification policies." icon={BellRing} items={["Routing rules", "Alert thresholds", "SMS provider"]} />;
}
