import { Bell } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function NotificationTemplatesPage() {
  return <SectionPage title="Notification Templates" description="Push, in-app, SMS, and email notification templates for operations workflows." icon={Bell} items={["Push templates", "SMS templates", "In-app templates"]} />;
}
