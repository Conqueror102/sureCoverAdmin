import { Siren } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function HighRiskPatientsPage() {
  return <SectionPage title="High Risk Patients" description="Critical patient watchlist, care owners, vitals context, and escalation readiness." icon={Siren} items={["Critical patients", "Care owners", "Escalation readiness"]} />;
}
