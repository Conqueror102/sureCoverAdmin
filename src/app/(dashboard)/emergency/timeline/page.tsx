import { ListTree } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function EscalationTimelinePage() {
  return <SectionPage title="Escalation Timeline" description="End-to-end emergency event history, handoffs, alerts, and resolution evidence." icon={ListTree} items={["Alert created", "Clinical handoff", "Resolution evidence"]} />;
}
