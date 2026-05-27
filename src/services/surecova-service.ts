import {
  activityFeed,
  consultations,
  doctors,
  emergencyAlerts,
  hospitals,
  patients,
  pharmacies,
  platformMetrics,
  revenueSeries,
  specialties,
} from "@/mock/platform";

const wait = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const surecovaService = {
  async getCommandCenter() {
    await wait();
    return {
      metrics: platformMetrics,
      revenue: revenueSeries,
      consultations,
      emergencies: emergencyAlerts,
      activity: activityFeed,
      patients,
      doctors,
      hospitals,
      pharmacies,
      specialties,
    };
  },
  async getHospitals() {
    await wait();
    return hospitals;
  },
  async getPharmacies() {
    await wait();
    return pharmacies;
  },
  async getSpecialties() {
    await wait();
    return specialties;
  },
  async getPatients() {
    await wait();
    return patients;
  },
  async getDoctors() {
    await wait();
    return doctors;
  },
  async getConsultations() {
    await wait();
    return consultations;
  },
  async getEmergencies() {
    await wait();
    return emergencyAlerts;
  },
};
