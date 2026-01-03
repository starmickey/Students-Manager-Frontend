"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Child } from "@/lib/api/children";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useChildren } from "../hooks/use-children";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export const columns: ColumnDef<Child, Child>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Surname",
    accessorKey: "surname",
  },
  {
    header: "Birth Day",
    accessorKey: "birthDay",
    cell: ({ getValue }) => getValue<string>() ?? "—",
  },
  {
    header: "DNI",
    accessorKey: "dni",
    cell: ({ getValue }) => getValue<string>() ?? "—",
  },
];

interface ChildrenTableProps {
  page: number;
  pageSize: number;
  sortBy: string;
  order: "asc" | "desc";
}

export default function ChildrenTable({
  page,
  pageSize,
  sortBy,
  order,
}: ChildrenTableProps) {
  const router = useRouter();
  const pathname = usePathname();

  const sorting: SortingState = [{ id: sortBy, desc: order === "desc" }];

  const { data, pagination, loading, loadingTime, error } = useChildren({
    page,
    pageSize,
    sortBy,
    order,
  });

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    manualSorting: true,
    pageCount: pagination?.totalPages ?? -1,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize,
      },
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  function updateUrl(params: Record<string, string | number>) {
    const query = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sortBy,
      order,
      ...params,
    });

    router.push(`${pathname}?${query.toString()}`);
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-destructive">{error}</p>}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  onClick={() => {
                    const isDesc = sortBy === header.id && order === "asc";
                    updateUrl({
                      sortBy: header.id,
                      order: isDesc ? "desc" : "asc",
                      page: 1, // reset page on sort
                    });
                  }}
                  className="cursor-pointer select-none"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: " ↑",
                    desc: " ↓",
                  }[header.column.getIsSorted() as string] ?? null}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {loading && loadingTime > 100 ? (
            <TableRow>
              <TableCell colSpan={columns.length}>Loading...</TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>No results</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <span className="text-sm">
          Page {pagination?.page} of {pagination?.totalPages}
        </span>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => updateUrl({ page: page - 1 })}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={pagination ? page >= pagination.totalPages : true}
            onClick={() => updateUrl({ page: page + 1 })}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
