import { MessagesSquare } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function LiveSupportPage() {
  return <SectionPage title="Live Support" description="Realtime support queue, active conversations, and response metrics." icon={MessagesSquare} items={["Live queue", "Active chats", "Response metrics"]} />;
}
