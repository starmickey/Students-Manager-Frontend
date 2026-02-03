"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Child, updateChildField } from "@/lib/api/children";
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

import { EditableInput } from "@/components/ui/editable-input";
import {
  UpdateChildFieldInput,
  updateChildFieldSchema,
} from "../schemas/children.schema";
import { EditableCell } from "@/components/templates/tables/editable-cell";
import { useState } from "react";
import z from "zod";

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

  const [globalErrors, setGlobalErrors] = useState<string | undefined>(
    undefined
  );

  const sorting: SortingState = [{ id: sortBy, desc: order === "desc" }];

  const { data, pagination, loading, loadingTime, error } = useChildren({
    page,
    pageSize,
    sortBy,
    order,
  });

  const columns: ColumnDef<Child>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <EditableCell
          row={row.original}
          field="name"
          onSubmit={handleUpdateCell}
        />
      ),
    },
    {
      header: "Surname",
      accessorKey: "surname",
      cell: ({ row }) => (
        <EditableCell
          row={row.original}
          field="surname"
          onSubmit={handleUpdateCell}
        />
      ),
    },
    {
      header: "Birth Day",
      accessorKey: "birthDay",
      cell: ({ row }) => (
        <EditableCell
          row={row.original}
          field="birthDay"
          type="date"
          onSubmit={handleUpdateCell}
        />
      ),
    },
    {
      header: "DNI",
      accessorKey: "dni",
      cell: ({ row }) => (
        <EditableCell
          row={row.original}
          field="dni"
          type="number"
          onSubmit={handleUpdateCell}
        />
      ),
    },
  ];

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

  async function handleUpdateCell(data: UpdateChildFieldInput) {
    const result = updateChildFieldSchema.safeParse(data);

    if (!result.success) {
      setGlobalErrors(z.prettifyError(result.error));
      console.error(result.error);
      return;
    }

    updateChildField(result.data).catch((error) => {
      setGlobalErrors("There was an unexpected error. Try again later.");
      console.error(error);
    });
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-destructive">{error}</p>}
      {globalErrors && <p className="text-destructive">{globalErrors}</p>}

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
