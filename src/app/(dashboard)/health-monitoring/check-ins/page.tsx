import { ClipboardCheck } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function CheckInsPage() {
  return <SectionPage title="Monthly Check-ins" description="Chronic care check-ins, symptom responses, adherence, and follow-up workflows." icon={ClipboardCheck} items={["Due check-ins", "Symptom responses", "Follow-up tasks"]} />;
}
