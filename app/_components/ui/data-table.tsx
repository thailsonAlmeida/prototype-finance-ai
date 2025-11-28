"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Cria um mapa de columnId -> label usando os headers (com contexto correto)
  const headerLabelMap = (() => {
    const map = new Map<string, React.ReactNode>();
    // usa o primeiro headerGroup (normalmente o header superior)
    const headerGroups = table.getHeaderGroups();
    if (headerGroups.length > 0) {
      const headers = headerGroups[0].headers;
      headers.forEach((h) => {
        // renderiza o header com o context correto
        const label = h.isPlaceholder
          ? null
          : flexRender(h.column.columnDef.header, h.getContext());
        map.set(h.id, label);
        // também armazena com key column.id (mais seguro para busca por column id)
        map.set(h.column.id, label);
      });
    }
    return map;
  })();

  return (
    <div className="rounded-md border">
      {/* Desktop/tablet: tabela (md+) */}
      <div className="hidden overflow-x-auto md:block">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile: cards (smaller screens) */}
      <div className="p-2 md:hidden">
        {table.getRowModel().rows?.length ? (
          <div className="flex flex-col gap-3">
            {table.getRowModel().rows.map((row) => (
              <div
                key={row.id}
                className="rounded-lg border bg-background p-3 shadow-sm"
                data-state={row.getIsSelected() && "selected"}
              >
                <div className="flex flex-col gap-2">
                  {row.getVisibleCells().map((cell) => {
                    // tenta achar o label no mapa: primeiro por column id, se não achar usa a coluna.id
                    const label =
                      headerLabelMap.get(cell.column.id) ??
                      headerLabelMap.get(cell.column.id) ??
                      null;
                    return (
                      <div key={cell.id} className="flex w-full flex-col">
                        {label ? (
                          <span className="text-xs font-medium text-muted-foreground">
                            {label}
                          </span>
                        ) : null}
                        <span className="mt-1 text-sm">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-24 text-center">No results.</div>
        )}
      </div>
    </div>
  );
}
