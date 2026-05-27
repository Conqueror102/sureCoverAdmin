import { Database } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function MedicationDatabasePage() {
  return <SectionPage title="Medication Database" description="Approved medications, dosage rules, contraindications, and prescribing controls." icon={Database} items={["Medication catalog", "Contraindications", "Approval rules"]} />;
}
