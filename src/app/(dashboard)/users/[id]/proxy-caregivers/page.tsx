import { Users } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function ProxyCaregiversPage() {
  return <SectionPage title="Proxy Caregivers" description="Authorized family members, permissions, communication history, and consent status." icon={Users} items={["Authorized proxies", "Consent records", "Caregiver alerts"]} />;
}
