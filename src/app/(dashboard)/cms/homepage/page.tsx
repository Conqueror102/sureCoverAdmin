import { LayoutTemplate } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function HomepageCmsPage() {
  return <SectionPage title="Homepage CMS" description="Block-based homepage content, publishing controls, and localization readiness." icon={LayoutTemplate} items={["Hero content", "Care blocks", "Publishing state"]} />;
}
