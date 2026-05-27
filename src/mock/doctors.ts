export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  status: "Verified" | "Pending Review" | "Suspended";
  patients: number;
  rating: number;
};

export const DoctorData: Doctor[] = [
  { id: "D-801", name: "Dr. Sarah Jenkins", specialty: "Cardiology", status: "Verified", patients: 142, rating: 4.9 },
  { id: "D-802", name: "Dr. Michael Chen", specialty: "General Practice", status: "Verified", patients: 320, rating: 4.7 },
  { id: "D-803", name: "Dr. Emily Taylor", specialty: "Pediatrics", status: "Verified", patients: 215, rating: 4.9 },
  { id: "D-804", name: "Dr. William Smith", specialty: "Neurology", status: "Pending Review", patients: 0, rating: 0.0 },
  { id: "D-805", name: "Dr. Avery Davis", specialty: "Psychiatry", status: "Verified", patients: 98, rating: 4.6 },
  { id: "D-806", name: "Dr. Lucas Garcia", specialty: "Dermatology", status: "Suspended", patients: 12, rating: 3.2 },
];
