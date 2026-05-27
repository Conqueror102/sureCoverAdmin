import { AlertTriangle } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function RiskEscalationsPage() {
  return <SectionPage title="Risk Escalations" description="AI-triggered health risks, clinician handoff, and escalation timelines." icon={AlertTriangle} items={["AI risk flags", "Clinician handoff", "Escalation history"]} />;
}
