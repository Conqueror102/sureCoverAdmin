import { ScrollText } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function AdminActivitiesPage() {
  return <SectionPage title="Admin Activities" description="Admin action history, affected records, actor attribution, and review filters." icon={ScrollText} items={["Clinical actions", "Billing actions", "Settings changes"]} />;
}
