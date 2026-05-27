"use client";

import Link from "next/link";
import { ArrowUpDown, BadgeDollarSign, MoreHorizontal, Pill, ReceiptText, Store } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/tables/data-table";
import { MetricCard } from "@/components/metrics/metric-card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";
import { usePharmacies } from "@/hooks/use-platform-data";
import type { Pharmacy } from "@/types/domain";

const columns: ColumnDef<Pharmacy>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-3 h-8">
        Pharmacy <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Link href={`/pharmacies/${row.original.id}`} className="font-medium text-teal-700 hover:underline">
        {row.original.name}
      </Link>
    ),
  },
  { accessorKey: "city", header: "City" },
  { accessorKey: "country", header: "Country" },
  {
    accessorKey: "partnerTier",
    header: "Tier",
    cell: ({ row }) => <StatusPill tone={row.original.partnerTier === "Enterprise" ? "success" : row.original.partnerTier === "Preferred" ? "info" : "neutral"}>{row.original.partnerTier}</StatusPill>,
  },
  { accessorKey: "prescriptionsFilled", header: "Filled" },
  {
    accessorKey: "referralBonusRate",
    header: "Bonus Rate",
    cell: ({ row }) => `${row.original.referralBonusRate}%`,
  },
  {
    accessorKey: "pendingPayout",
    header: "Pending Payout",
    cell: ({ row }) => `$${row.original.pendingPayout.toLocaleString()}`,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button asChild variant="ghost" size="icon">
        <Link href={`/pharmacies/${row.original.id}`}>
          <MoreHorizontal className="h-4 w-4" />
        </Link>
      </Button>
    ),
  },
];

export function PharmaciesWorkspace() {
  const { data = [] } = usePharmacies();
  const filled = data.reduce((sum, pharmacy) => sum + pharmacy.prescriptionsFilled, 0);
  const paid = data.reduce((sum, pharmacy) => sum + pharmacy.referralBonusesPaid, 0);
  const pending = data.reduce((sum, pharmacy) => sum + pharmacy.pendingPayout, 0);

  return (
    <ModulePage
      title="Pharmacy Management"
      description="Partner pharmacies, prescription fulfillment, referral bonuses, partner tiers, and pharmacy payout operations."
      icon={Pill}
      primaryAction="Add pharmacy"
      secondaryAction="Run referral payouts"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Partner Pharmacies" value={data.length.toString()} change="1 under review" icon={Store} />
        <MetricCard label="Prescriptions Filled" value={filled.toLocaleString()} change="Current cycle" icon={ReceiptText} />
        <MetricCard label="Bonuses Paid" value={`$${paid.toLocaleString()}`} change="Referral program total" icon={BadgeDollarSign} />
        <MetricCard label="Pending Payout" value={`$${pending.toLocaleString()}`} change="Awaiting finance approval" icon={BadgeDollarSign} tone="amber" />
      </div>

      <DataTable columns={columns} data={data} searchPlaceholder="Search pharmacies, countries, partner tiers..." />

      <div className="grid gap-4 lg:grid-cols-3">
        {data.map((pharmacy) => (
          <Card key={pharmacy.id} className="rounded-lg">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-base">{pharmacy.name}</CardTitle>
                <StatusPill tone={pharmacy.status === "Active" ? "success" : "warning"}>{pharmacy.status}</StatusPill>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">{pharmacy.city}, {pharmacy.country}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="text-slate-500">Bonus rate</div>
                  <div className="font-semibold text-slate-900">{pharmacy.referralBonusRate}%</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="text-slate-500">Pending</div>
                  <div className="font-semibold text-slate-900">${pharmacy.pendingPayout.toLocaleString()}</div>
                </div>
              </div>
              <Button asChild variant="outline" size="sm" className="mt-5">
                <Link href={`/pharmacies/${pharmacy.id}`}>View details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </ModulePage>
  );
}
