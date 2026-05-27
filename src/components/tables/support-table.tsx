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
import { Ticket } from "@/mock/support";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, MessageSquare } from "lucide-react";

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "id",
    header: "Ticket ID",
    cell: ({ row }) => <span className="font-mono text-xs text-slate-500">{row.original.id}</span>
  },
  {
    accessorKey: "subject",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-4 h-8">
          Subject <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center text-slate-900 font-medium">
        <MessageSquare className="w-4 h-4 mr-2 text-slate-400" />
        {row.original.subject}
      </div>
    )
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge 
          variant="outline"
          className={
            status === "Open" ? "bg-amber-50 text-amber-700 border-amber-200" : 
            status === "In Progress" ? "bg-blue-50 text-blue-700 border-blue-200" : 
            "bg-emerald-50 text-emerald-700 border-emerald-200"
          }
        >
          {status}
        </Badge>
      )
    }
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const prio = row.original.priority;
      return (
        <span className={
          prio === "High" ? "text-red-600 font-semibold text-xs" :
          prio === "Medium" ? "text-amber-600 font-semibold text-xs" :
          "text-slate-500 font-semibold text-xs"
        }>{prio}</span>
      )
    }
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="text-slate-500 text-sm">{row.original.date}</span>
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

export function SupportTable({ data }: { data: Ticket[] }) {
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
      <div className="flex items-center justify-end space-x-2 py-4 px-6 border-t bg-slate-50/30">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}
