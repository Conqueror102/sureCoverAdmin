import { MessageCircle } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function LiveConsultationPage() {
  return <SectionPage title="Live Consultation View" description="Realtime chat, voice session controls, notes, patient context, and moderation tools." icon={MessageCircle} items={["Patient context", "Chat transcript", "Voice controls"]} />;
}
