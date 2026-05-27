import { ClipboardList } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function MedicalHistoryPage() {
  return <SectionPage title="Medical History" description="Conditions, allergies, medications, lab notes, and prior consultation records." icon={ClipboardList} items={["Diagnoses", "Medication history", "Clinical notes"]} />;
}
