import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import cx from "clsx";
import Pagination from "./Pagination";

type Props<T> = {
  columns: ColumnDef<T>[];
  data: T[];
};

const DataTable = <T extends unknown>({ columns, data }: Props<T>) => {
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <>
      <div className="w-full overflow-auto">
        <table className="min-w-full overflow-hidden divide-y divide-gray-300 rounded-t-lg">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-center text-sm sm:text-base font-semibold text-gray-900 sm:pl-6 capitalize"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={cx(
                          "flex items-center justify-center group select-none",
                          header.column.getCanSort() && "cursor-pointer"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {{
                          asc: (
                            <ChevronUpIcon
                              className="w-5 h-5 mt-1"
                              aria-hidden="true"
                            />
                          ),
                          desc: (
                            <ChevronDownIcon
                              className="w-5 h-5 mt-1"
                              aria-hidden="true"
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-4 pl-4 pr-3 text-center text-sm sm:text-base text-gray-900 whitespace-nowrap sm:pl-6"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination table={table} />
    </>
  );
};

export default DataTable;
