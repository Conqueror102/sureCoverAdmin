import { HeartPulse } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function VitalsMonitoringPage() {
  return <SectionPage title="Vitals Monitoring" description="Remote patient vitals, wearable telemetry, thresholds, and clinical alerts." icon={HeartPulse} items={["Blood pressure", "Heart rate", "Glucose trends"]} />;
}
