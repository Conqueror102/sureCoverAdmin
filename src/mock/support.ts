export type Ticket = {
  id: string;
  subject: string;
  customer: string;
  status: "Open" | "In Progress" | "Resolved";
  priority: "High" | "Medium" | "Low";
  date: string;
};

export const TicketData: Ticket[] = [
  { id: "T-8091", subject: "Unable to access consultation video", customer: "Sophia Martinez", status: "Open", priority: "High", date: "10 mins ago" },
  { id: "T-8092", subject: "Billing question - double charge", customer: "David Rodriguez", status: "In Progress", priority: "High", date: "1 hour ago" },
  { id: "T-8093", subject: "How to update medical history?", customer: "William Davis", status: "Open", priority: "Medium", date: "3 hours ago" },
  { id: "T-8094", subject: "Dr. Jenkins did not show up", customer: "Emma Thompson", status: "Resolved", priority: "Low", date: "1 day ago" },
  { id: "T-8095", subject: "Subscription refund request", customer: "Jackson Lee", status: "Open", priority: "Medium", date: "1 day ago" },
];
