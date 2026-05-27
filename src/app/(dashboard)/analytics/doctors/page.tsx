import { Stethoscope } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function DoctorAnalyticsRoutePage() {
  return <SectionPage title="Doctor Analytics" description="Doctor capacity, utilization, ratings, response times, and earnings trends." icon={Stethoscope} items={["Capacity", "Utilization", "Ratings"]} />;
}
