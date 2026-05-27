import { Globe2 } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function GeographicAnalyticsPage() {
  return <SectionPage title="Geographic Analytics" description="Regional patient demand, doctor supply, emergency volume, and revenue map." icon={Globe2} items={["Demand map", "Doctor supply", "Regional revenue"]} />;
}
