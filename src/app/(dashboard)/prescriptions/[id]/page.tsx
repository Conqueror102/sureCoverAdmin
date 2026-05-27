import { Pill } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function PrescriptionDetailsPage() {
  return <SectionPage title="Prescription Details" description="Medication, dosage, physician signature, interactions, and audit trail." icon={Pill} items={["Medication order", "Dosage instructions", "Audit trail"]} />;
}
