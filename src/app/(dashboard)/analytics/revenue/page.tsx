import { DollarSign } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function RevenueAnalyticsPage() {
  return <SectionPage title="Revenue Analytics" description="MRR, ARPU, cohort trends, refunds, failed payments, and forecast exports." icon={DollarSign} items={["MRR trends", "Cohorts", "Forecasts"]} />;
}
