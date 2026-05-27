import { Activity } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function UserRiskMonitoringPage() {
  return <SectionPage title="Patient Risk Monitoring" description="AI risk indicators, vitals thresholds, symptom check-ins, and escalation rules." icon={Activity} items={["Risk score", "Vitals thresholds", "Escalation rules"]} />;
}
