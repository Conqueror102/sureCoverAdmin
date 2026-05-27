"use client";

import { useQuery } from "@tanstack/react-query";
import { surecovaService } from "@/services/surecova-service";

export const queryKeys = {
  commandCenter: ["command-center"] as const,
  patients: ["patients"] as const,
  doctors: ["doctors"] as const,
  consultations: ["consultations"] as const,
  emergencies: ["emergencies"] as const,
  hospitals: ["hospitals"] as const,
  pharmacies: ["pharmacies"] as const,
  specialties: ["specialties"] as const,
};

export function useCommandCenter() {
  return useQuery({
    queryKey: queryKeys.commandCenter,
    queryFn: surecovaService.getCommandCenter,
  });
}

export function usePatients() {
  return useQuery({
    queryKey: queryKeys.patients,
    queryFn: surecovaService.getPatients,
  });
}

export function useDoctors() {
  return useQuery({
    queryKey: queryKeys.doctors,
    queryFn: surecovaService.getDoctors,
  });
}

export function useConsultations() {
  return useQuery({
    queryKey: queryKeys.consultations,
    queryFn: surecovaService.getConsultations,
  });
}

export function useEmergencies() {
  return useQuery({
    queryKey: queryKeys.emergencies,
    queryFn: surecovaService.getEmergencies,
  });
}

export function useHospitals() {
  return useQuery({
    queryKey: queryKeys.hospitals,
    queryFn: surecovaService.getHospitals,
  });
}

export function usePharmacies() {
  return useQuery({
    queryKey: queryKeys.pharmacies,
    queryFn: surecovaService.getPharmacies,
  });
}

export function useSpecialties() {
  return useQuery({
    queryKey: queryKeys.specialties,
    queryFn: surecovaService.getSpecialties,
  });
}
