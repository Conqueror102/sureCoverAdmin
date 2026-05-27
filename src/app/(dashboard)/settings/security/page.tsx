import { LockKeyhole } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function SecuritySettingsPage() {
  return <SectionPage title="Security Settings" description="MFA policy, session controls, device history, IP allowlists, and audit posture." icon={LockKeyhole} items={["MFA policy", "Session controls", "Device history"]} />;
}
