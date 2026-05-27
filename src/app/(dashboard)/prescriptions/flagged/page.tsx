import { Flag } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function FlaggedPrescriptionsPage() {
  return <SectionPage title="Flagged Prescriptions" description="High-risk prescription review queue with interaction and dosage warnings." icon={Flag} items={["Interaction warnings", "Dosage exceptions", "Reviewer decisions"]} />;
}
