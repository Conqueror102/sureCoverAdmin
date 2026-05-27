"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Doctor } from "@/mock/doctors";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpDown, MoreHorizontal, Star } from "lucide-react";

export const columns: ColumnDef<Doctor>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-4 h-8">
          Doctor <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={`https://avatar.vercel.sh/${row.original.name}.png`} />
          <AvatarFallback>{row.original.name.charAt(4)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-slate-900">{row.original.name}</span>
          <span className="text-xs text-slate-500">{row.original.id}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "specialty",
    header: "Specialty",
  },
  {
    accessorKey: "status",
    header: "Verification",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge 
          variant="outline"
          className={
            status === "Verified" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : 
            status === "Pending Review" ? "bg-amber-50 text-amber-700 border-amber-200" : 
            "bg-red-50 text-red-700 border-red-200"
          }
        >
          {status}
        </Badge>
      )
    }
  },
  {
    accessorKey: "patients",
    header: "Active Patients",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex items-center text-slate-700">
        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 mr-1.5" />
        <span className="font-medium text-sm">{row.original.rating > 0 ? row.original.rating : 'N/A'}</span>
      </div>
    )
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" className="h-8 w-8 p-0">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
  },
];

export function DoctorsTable({ data }: { data: Doctor[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  return (
    <div>
      <Table>
        <TableHeader className="bg-slate-50/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
