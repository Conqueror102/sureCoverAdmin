import { HelpCircle } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function FaqCmsPage() {
  return <SectionPage title="FAQ CMS" description="Patient help content, categories, translations, and publishing workflow." icon={HelpCircle} items={["FAQ categories", "Answers", "Translations"]} />;
}
