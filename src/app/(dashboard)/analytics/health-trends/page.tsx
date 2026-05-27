import { Activity } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function HealthTrendsPage() {
  return <SectionPage title="Health Trends" description="Chronic condition distribution, vitals drift, adherence, and risk cohorts." icon={Activity} items={["Conditions", "Vitals drift", "Adherence"]} />;
}
