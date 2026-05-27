import { BarChart3 } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function DoctorAnalyticsPage() {
  return <SectionPage title="Doctor Performance Analytics" description="Consultation volume, ratings, response time, retention, and clinical outcomes." icon={BarChart3} items={["Volume trends", "Ratings", "Response times"]} />;
}
