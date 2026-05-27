export type Prescription = {
  id: string;
  patient: string;
  medication: string;
  dosage: string;
  status: "Active" | "Pending Refill" | "Expired";
  date: string;
};

export const PrescriptionData: Prescription[] = [
  { id: "Rx-001", patient: "Olivia Martin", medication: "Lisinopril", dosage: "10mg daily", status: "Active", date: "2023-10-20" },
  { id: "Rx-002", patient: "Jackson Lee", medication: "Atorvastatin", dosage: "20mg daily", status: "Pending Refill", date: "2023-09-15" },
  { id: "Rx-003", patient: "William Kim", medication: "Albuterol", dosage: "90mcg as needed", status: "Active", date: "2023-10-25" },
  { id: "Rx-004", patient: "Sofia Davis", medication: "Metformin", dosage: "500mg twice daily", status: "Expired", date: "2023-05-10" },
  { id: "Rx-005", patient: "Eleanor Richards", medication: "Amlodipine", dosage: "5mg daily", status: "Active", date: "2023-10-24" },
];
