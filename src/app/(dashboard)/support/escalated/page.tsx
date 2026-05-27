import { AlertCircle } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function EscalatedSupportPage() {
  return <SectionPage title="Escalated Cases" description="Support issues requiring medical, billing, or operations intervention." icon={AlertCircle} items={["Medical escalations", "Billing escalations", "Operations tasks"]} />;
}
