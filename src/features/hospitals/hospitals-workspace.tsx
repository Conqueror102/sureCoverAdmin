"use client";

import Link from "next/link";
import { ArrowUpDown, Building2, HeartPulse, MoreHorizontal, Stethoscope, Users } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/tables/data-table";
import { MetricCard } from "@/components/metrics/metric-card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";
import { useHospitals } from "@/hooks/use-platform-data";
import type { Hospital } from "@/types/domain";

const columns: ColumnDef<Hospital>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-3 h-8">
        Hospital <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Link href={`/hospitals/${row.original.id}`} className="font-medium text-teal-700 hover:underline">
        {row.original.name}
      </Link>
    ),
  },
  { accessorKey: "city", header: "City" },
  { accessorKey: "country", header: "Country" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusPill tone={row.original.status === "Active" ? "success" : row.original.status === "Onboarding" ? "warning" : "danger"}>{row.original.status}</StatusPill>,
  },
  { accessorKey: "doctors", header: "Doctors" },
  { accessorKey: "patients", header: "Patients" },
  { accessorKey: "emergencyCapacity", header: "Emergency Slots" },
  {
    accessorKey: "monthlyRevenue",
    header: "MRR",
    cell: ({ row }) => `$${row.original.monthlyRevenue.toLocaleString()}`,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button asChild variant="ghost" size="icon">
        <Link href={`/hospitals/${row.original.id}`}>
          <MoreHorizontal className="h-4 w-4" />
        </Link>
      </Button>
    ),
  },
];

export function HospitalsWorkspace() {
  const { data = [] } = useHospitals();
  const doctors = data.reduce((sum, hospital) => sum + hospital.doctors, 0);
  const patients = data.reduce((sum, hospital) => sum + hospital.patients, 0);
  const capacity = data.reduce((sum, hospital) => sum + hospital.emergencyCapacity, 0);

  return (
    <ModulePage
      title="Hospital Management"
      description="Manage partner hospitals, hospital-owned doctors, assigned patients, specialties, and emergency capacity."
      icon={Building2}
      primaryAction="Add hospital"
      secondaryAction="Export network"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Partner Hospitals" value={data.length.toString()} change="1 onboarding" icon={Building2} />
        <MetricCard label="Hospital Doctors" value={doctors.toLocaleString()} change="Across active hospitals" icon={Stethoscope} />
        <MetricCard label="Assigned Patients" value={patients.toLocaleString()} change="Hospital-linked care" icon={Users} />
        <MetricCard label="Emergency Capacity" value={capacity.toString()} change="Available escalation slots" icon={HeartPulse} tone="red" />
      </div>

      <DataTable columns={columns} data={data} searchPlaceholder="Search hospitals, countries, specialties..." />

      <div className="grid gap-4 lg:grid-cols-3">
        {data.map((hospital) => (
          <Card key={hospital.id} className="rounded-lg">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-base">{hospital.name}</CardTitle>
                <StatusPill tone={hospital.status === "Active" ? "success" : "warning"}>{hospital.status}</StatusPill>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">{hospital.city}, {hospital.country}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {hospital.specialties.map((specialty) => (
                  <StatusPill key={specialty} tone="neutral">{specialty}</StatusPill>
                ))}
              </div>
              <Button asChild variant="outline" size="sm" className="mt-5">
                <Link href={`/hospitals/${hospital.id}`}>View details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </ModulePage>
  );
}
