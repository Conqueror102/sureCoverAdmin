"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function EmergencySimulator() {
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.error("Critical Escalation Triggered", {
        description: "Patient Carlos Mendez: Severe Chest Pain, HR 42 bps. Dispatching alerts.",
        duration: 10000,
        action: {
          label: "View Emergency",
          onClick: () => window.location.href = "/emergency"
        }
      });
    }, 5000); // Trigger after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return null;
}
