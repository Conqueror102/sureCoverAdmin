"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export function RecentConsultations() {
  const consultations = [
    {
      id: "1",
      patient: "Olivia Martin",
      doctor: "Dr. Sarah Jenkins",
      time: "10 min ago",
      type: "Video Call",
      status: "Completed",
      initials: "OM"
    },
    {
      id: "2",
      patient: "Jackson Lee",
      doctor: "Dr. Michael Chen",
      time: "45 min ago",
      type: "Prescription Renewal",
      status: "Pending Review",
      initials: "JL"
    },
    {
      id: "3",
      patient: "Isabella Nguyen",
      doctor: "Dr. William Smith",
      time: "2 hours ago",
      type: "Follow-up",
      status: "Completed",
      initials: "IN"
    },
    {
      id: "4",
      patient: "William Kim",
      doctor: "Dr. Sarah Jenkins",
      time: "3 hours ago",
      type: "Initial Consult",
      status: "Ongoing",
      initials: "WK"
    },
    {
      id: "5",
      patient: "Sofia Davis",
      doctor: "Dr. Emily Taylor",
      time: "5 hours ago",
      type: "Video Call",
      status: "Completed",
      initials: "SD"
    }
  ];

  return (
    <div className="space-y-4">
      {consultations.map((consult, index) => (
        <motion.div 
          key={consult.id} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ x: 4, backgroundColor: "var(--color-slate-50)" }}
          className="flex items-center p-2 rounded-lg cursor-pointer transition-colors"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://avatar.vercel.sh/${consult.initials}.png`} alt="Avatar" />
            <AvatarFallback>{consult.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{consult.patient}</p>
            <p className="text-sm text-muted-foreground">
              with {consult.doctor}
            </p>
          </div>
          <div className="ml-auto font-medium text-sm text-right">
             <div className="text-slate-900">{consult.type}</div>
             <div className="text-xs text-slate-500 font-normal">{consult.time}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
