import { Table } from "@tanstack/react-table";
import React from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";

const PAGE_SIZES = [5, 10, 15, 20, 25, 30];

type Props<T> = {
  table: Table<T>;
};

type MyButtonProps = {
  disabled?: boolean;
  icon?: any;
  onClick?: () => void;
};

const NextButton: React.FC<MyButtonProps> = (props) => {
  return (
    <button className="!p-1 disabled:opacity-40 text-black" {...props}>
      <props.icon className="w-5 h-5" />
    </button>
  );
};

const Pagination = <T extends unknown>({ table }: Props<T>) => {
  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-2 p-3 md:justify-between bg-gray-50 rounded-b-lg border-t">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 text-sm gray-800">
          Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16 px-2 py-1 border-[1.5px] rounded-md"
            min="1"
            max={table.getPageCount()}
          />
        </span>

        <select
          className="text-sm bg-transparent outline-none"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {PAGE_SIZES.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <NextButton
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          icon={ChevronLeftIcon}
        />

        <span className="mx-4 text-sm text-gray-800">
          Page: <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
          <strong>{table.getPageCount()}</strong>
        </span>

        <NextButton
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          icon={ChevronRightIcon}
        />
      </div>
    </div>
  );
};

export default Pagination;
