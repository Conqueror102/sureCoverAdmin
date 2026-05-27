import { ShieldAlert } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function SecurityEventsPage() {
  return <SectionPage title="Security Events" description="Login events, MFA failures, permission changes, and suspicious access tracking." icon={ShieldAlert} items={["MFA failures", "Permission changes", "Suspicious access"]} />;
}
