"use client";

import { ArrowUpDown, MoreHorizontal, UserPlus, Users } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/tables/data-table";
import { RiskBadge } from "@/components/health/risk-badge";
import { MetricsSkeleton } from "@/components/loaders/skeleton";
import { ModulePage } from "@/components/shared/module-page";
import { usePatients } from "@/hooks/use-platform-data";
import type { Patient } from "@/types/domain";

const columns: ColumnDef<Patient>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(event) => table.toggleAllPageRowsSelected(event.target.checked)}
        aria-label="Select all patients"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={(event) => row.toggleSelected(event.target.checked)}
        aria-label={`Select ${row.original.name}`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-3 h-8">
        Patient <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={`https://avatar.vercel.sh/${row.original.name}.png`} />
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <Link href={`/users/${row.original.id}`} className="font-medium text-teal-700 hover:underline">{row.original.name}</Link>
          <div className="text-xs text-slate-500">{row.original.email}</div>
        </div>
      </div>
    ),
  },
  { accessorKey: "condition", header: "Condition" },
  { accessorKey: "assignedDoctor", header: "Assigned Doctor" },
  {
    accessorKey: "riskLevel",
    header: "Risk",
    cell: ({ row }) => <RiskBadge level={row.original.riskLevel} />,
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => <Badge variant="outline">{row.original.plan}</Badge>,
  },
  {
    accessorKey: "healthScore",
    header: "Health Score",
    cell: ({ row }) => <span className="font-medium">{row.original.healthScore}/100</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button asChild variant="ghost" size="icon">
        <Link href={`/users/${row.original.id}`}>
          <MoreHorizontal className="h-4 w-4" />
        </Link>
      </Button>
    ),
  },
];

export function UsersWorkspace() {
  const { data, isLoading } = usePatients();

  return (
    <ModulePage
      title="Patients"
      description="Manage patient records, care plans, subscriptions, risk monitoring, and proxy caregivers."
      icon={Users}
      primaryAction="Add patient"
      secondaryAction="Export CSV"
    >
      {isLoading || !data ? (
        <MetricsSkeleton />
      ) : (
        <DataTable columns={columns} data={data} searchPlaceholder="Search patients, conditions, doctors..." />
      )}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border bg-white p-5">
          <UserPlus className="mb-3 h-5 w-5 text-teal-700" />
          <div className="font-semibold text-slate-950">Assign Doctor Modal</div>
          <p className="mt-1 text-sm text-slate-500">Assign patients by specialty, region, doctor load, risk tier, and continuity of care.</p>
        </div>
        <div className="rounded-lg border bg-white p-5">
          <div className="font-semibold text-slate-950">Risk Badge System</div>
          <p className="mt-1 text-sm text-slate-500">Risk levels are typed and centralized for high-trust clinical visual language.</p>
        </div>
        <div className="rounded-lg border bg-white p-5">
          <div className="font-semibold text-slate-950">Bulk Operations</div>
          <p className="mt-1 text-sm text-slate-500">Selected rows can be extended into exports, assignments, and status changes.</p>
        </div>
      </div>
    </ModulePage>
  );
}
