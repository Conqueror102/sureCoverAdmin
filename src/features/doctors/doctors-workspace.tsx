"use client";

import { ArrowUpDown, BookOpenCheck, CalendarClock, CheckCircle2, DollarSign, FileCheck2, MoreHorizontal, Star, Stethoscope, UserPlus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/tables/data-table";
import { MetricsSkeleton } from "@/components/loaders/skeleton";
import { MetricCard } from "@/components/metrics/metric-card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";
import { useDoctors } from "@/hooks/use-platform-data";
import type { DoctorProfile } from "@/types/domain";
import { AddSpecialtyModal } from "@/components/doctors/add-specialty-modal";
import { specialties } from "@/mock/platform";

const columns: ColumnDef<DoctorProfile>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-3 h-8">
        Doctor <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={`https://avatar.vercel.sh/${row.original.name}.png`} />
          <AvatarFallback>{row.original.name.slice(4, 5)}</AvatarFallback>
        </Avatar>
        <div>
          <Link href={`/doctors/${row.original.id}`} className="font-medium text-teal-700 hover:underline">{row.original.name}</Link>
          <div className="text-xs text-slate-500">{row.original.country}</div>
        </div>
      </div>
    ),
  },
  { accessorKey: "specialty", header: "Specialty" },
  {
    accessorKey: "status",
    header: "Verification",
    cell: ({ row }) => (
      <StatusPill tone={row.original.status === "Verified" ? "success" : row.original.status === "Pending Review" ? "warning" : "danger"}>
        {row.original.status}
      </StatusPill>
    ),
  },
  {
    accessorKey: "availability",
    header: "Availability",
    cell: ({ row }) => (
      <StatusPill tone={row.original.availability === "Online" ? "success" : row.original.availability === "In Consultation" ? "info" : "neutral"}>
        {row.original.availability}
      </StatusPill>
    ),
  },
  { accessorKey: "patients", header: "Patients" },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex items-center gap-1 font-medium">
        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        {row.original.rating || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "earnings",
    header: "Earnings",
    cell: ({ row }) => `$${row.original.earnings.toLocaleString()}`,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button asChild variant="ghost" size="icon">
        <Link href={`/doctors/${row.original.id}`}>
          <MoreHorizontal className="h-4 w-4" />
        </Link>
      </Button>
    ),
  },
];

export function DoctorsWorkspace() {
  const { data, isLoading } = useDoctors();
  const verified = data?.filter((doctor) => doctor.status === "Verified").length ?? 0;
  const pending = data?.filter((doctor) => doctor.status === "Pending Review").length ?? 0;

  return (
    <ModulePage
      title="Doctors & Medical Staff"
      description="Verification, credential review, availability, ratings, and earnings for global medical professionals."
      icon={Stethoscope}
      primaryAction="Invite doctor"
      secondaryAction="Upload specialty"
    >
      <div className="flex flex-wrap justify-end gap-2">
        <AddSpecialtyModal />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Verified Doctors" value={verified.toString()} change="Credentialed for care delivery" icon={CheckCircle2} />
        <MetricCard label="Verification Queue" value={pending.toString()} change="Requires medical reviewer action" icon={FileCheck2} tone="amber" />
        <MetricCard label="Online Capacity" value="186" change="43 currently in consultations" icon={CalendarClock} tone="slate" />
        <MetricCard label="Doctor Earnings" value="$40.6k" change="This payout cycle" icon={DollarSign} />
      </div>

      {isLoading || !data ? <MetricsSkeleton /> : <DataTable columns={columns} data={data} searchPlaceholder="Search doctors, specialties, countries..." />}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-lg">
          <CardHeader><CardTitle className="text-base">Credential Review</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-500">
            <p>Medical license, board status, identity checks, and specialty documents are grouped into one review workflow.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/doctors/verification-queue">Open verification queue</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardHeader><CardTitle className="text-base">Availability Tracking</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-500">
            <p>Operational teams can see who is online, already in session, or unavailable before assigning cases.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/doctors/analytics">Review schedules</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="rounded-lg">
          <CardHeader><CardTitle className="text-base">Patient Assignment</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-500">
            <p>Match doctors by specialty, load, patient risk, region, and continuity of care requirements.</p>
            <Button asChild size="sm">
              <Link href="/users"><UserPlus className="mr-2 h-4 w-4" /> Assign patients</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BookOpenCheck className="h-5 w-5 text-teal-700" /> Specialties Doctors Can See</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {specialties.map((specialty) => (
            <div key={specialty.id} className="rounded-lg border bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-slate-950">{specialty.name}</div>
                  <div className="mt-1 text-sm text-slate-500">{specialty.doctors} doctors / {specialty.protocolVersion}</div>
                </div>
                <StatusPill tone={specialty.visibleToDoctors ? "success" : "warning"}>
                  {specialty.visibleToDoctors ? "Visible" : "Hidden"}
                </StatusPill>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </ModulePage>
  );
}
