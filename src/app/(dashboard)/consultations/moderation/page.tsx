import { Flag } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function ConsultationModerationPage() {
  return <SectionPage title="Moderation Queue" description="Flagged consultation transcripts, policy review, escalation, and audit outcomes." icon={Flag} items={["Flagged sessions", "Review actions", "Audit outcome"]} />;
}
