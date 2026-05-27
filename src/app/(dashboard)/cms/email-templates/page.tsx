import { Mail } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function EmailTemplatesPage() {
  return <SectionPage title="Email Templates" description="Transactional and lifecycle email templates with preview and approval states." icon={Mail} items={["MFA emails", "Billing emails", "Care reminders"]} />;
}
