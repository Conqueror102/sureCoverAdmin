import { Users } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function UserAnalyticsPage() {
  return <SectionPage title="User Analytics" description="Patient acquisition, activation, retention, cohorts, and country-level trends." icon={Users} items={["Growth", "Retention", "Countries"]} />;
}
