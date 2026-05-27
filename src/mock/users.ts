export type User = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "High Risk";
  plan: "Basic" | "Premium" | "Enterprise";
  lastVisit: string;
};

export const UserData: User[] = [
  {
    id: "P-1001",
    name: "Eleanor Richards",
    email: "eleanor.r@example.com",
    status: "Active",
    plan: "Premium",
    lastVisit: "2023-10-24",
  },
  {
    id: "P-1002",
    name: "Marcus Johnson",
    email: "mjohnson88@example.com",
    status: "High Risk",
    plan: "Premium",
    lastVisit: "2023-10-25",
  },
  {
    id: "P-1003",
    name: "Sophia Martinez",
    email: "smartinez.dev@example.com",
    status: "Active",
    plan: "Basic",
    lastVisit: "2023-10-20",
  },
  {
    id: "P-1004",
    name: "Liam O'Connor",
    email: "liam.oconnor.11@example.com",
    status: "Inactive",
    plan: "Basic",
    lastVisit: "2023-08-14",
  },
  {
    id: "P-1005",
    name: "Ava Patel",
    email: "avathegreat@example.com",
    status: "Active",
    plan: "Enterprise",
    lastVisit: "2023-10-26",
  },
  {
    id: "P-1006",
    name: "Noah Kim",
    email: "nkim_design@example.com",
    status: "High Risk",
    plan: "Premium",
    lastVisit: "2023-10-26",
  },
  {
    id: "P-1007",
    name: "Isabella Rossi",
    email: "bella.rossi@example.com",
    status: "Active",
    plan: "Basic",
    lastVisit: "2023-10-22",
  },
  {
    id: "P-1008",
    name: "William Davis",
    email: "wdavis1970@example.com",
    status: "Active",
    plan: "Premium",
    lastVisit: "2023-10-18",
  },
];
