import { Newspaper } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function BlogCmsPage() {
  return <SectionPage title="Blog CMS" description="Clinical education posts, editorial workflow, SEO metadata, and review states." icon={Newspaper} items={["Draft posts", "Medical review", "Published articles"]} />;
}
