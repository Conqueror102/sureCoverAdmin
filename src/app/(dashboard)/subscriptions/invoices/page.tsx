import { ReceiptText } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function InvoicesPage() {
  return <SectionPage title="Invoices" description="Billing history, payment status, invoice exports, and reconciliation." icon={ReceiptText} items={["Paid invoices", "Pending invoices", "Reconciliation"]} />;
}
