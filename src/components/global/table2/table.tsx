"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type Row,
  useReactTable,
  getSortedRowModel,
  type SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, ListFilterPlus } from "lucide-react";
import {
  type Dispatch,
  Fragment,
  type SetStateAction,
  useEffect,
  useId,
  useState,
} from "react";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ColumnSearchProps } from "./column-search";
import ColumnSearch from "./column-search";
import { DynamicPagination } from "./pagination";
import TableSearch from "./table-search";
import StatusManager from "../statusManager/StatusManager";
import { type UseQueryResult } from "@tanstack/react-query";
import RowSkeletonLoader from "./row-skeleton-loader";
import EmptyCell from "./empty-cell";
import { useTranslations } from "next-intl";

type FilterItem = Omit<ColumnSearchProps, "state">;
export type Filters = FilterItem[];

interface DataTableProps<TData, TValue, TRow> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  miw?: number;
  removeCollapseButton?: boolean;
  filters?: Filters;
  onRowClick?: (row: TRow) => void;
  selectedRows?: ({ id: string } | undefined | null)[];
  checkedRows?: Row<TData>[];
  setCheckedRows?: Dispatch<SetStateAction<Row<TData>[]>>;
  totalPageCount?: number;
  query?: UseQueryResult;
  prefix: string;
  initialSorting?: SortingState;
}

export function DataTable<TData, TValue, TRow>({
  columns,
  data,
  miw = 1200,
  filters,
  removeCollapseButton,
  onRowClick,
  selectedRows,
  setCheckedRows,
  totalPageCount = 0,
  query,
  prefix,
  initialSorting = [],
}: DataTableProps<TData, TValue, TRow>) {
  const id = useId();
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const t = useTranslations();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  useEffect(() => {
    setCheckedRows?.(table.getFilteredSelectedRowModel().rows);
  }, [table.getFilteredSelectedRowModel().rows.length, setCheckedRows, table]);

  // collapse
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggle = () => {
    setIsCollapsed((pre) => !pre);
  };

  // allowed filters
  const [allowedFilters, setAllowedFilters] = useState(
    filters?.map((f) => f.id) || []
  );

  return (
    <div className="space-y-4 p-6">
      <div className="flex justify-between items-start">
        <div className="flex gap-2 flex-wrap">
          <TableSearch prefix={prefix} wrapperclassname="w-fit min-w-[200px]" />
          {filters && filters.length > 0 ? (
            <Fragment>
              <Popover>
                <PopoverTrigger asChild>
                  <Button size={"sm"} className="rounded-xs !px-2">
                    <ListFilterPlus />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[220px] p-3 rounded-sm bg-white">
                  {/* <p className="mb-3">{t("table.view-filters")}</p> */}
                  <p className="mb-3">{"table.view-filters"}</p>

                  {filters.map((f) => {
                    return (
                      <Label className="flex items-center">
                        <Checkbox
                          key={f.id}
                          className="capitalize me-2"
                          checked={allowedFilters.includes(f.id)}
                          onCheckedChange={(value) => {
                            setAllowedFilters((pre) =>
                              value
                                ? [...pre, f.id]
                                : pre.filter((id) => id !== f.id)
                            );
                          }}
                        />
                        {/* <span>{t(f.label)}</span> */}
                        <span>{f.label}</span>
                      </Label>
                    );
                  })}
                </PopoverContent>
              </Popover>
              {filters.map((filter) => {
                return (
                  <ColumnSearch
                    state={[allowedFilters, setAllowedFilters]}
                    {...filter}
                    key={filter.id}
                    prefix={prefix}
                  />
                );
              })}
            </Fragment>
          ) : null}
        </div>
      </div>
      <div
        className={cn(
          "relative ease-out transition-transform z-[1] bg-white",
          isCollapsed ? "-translate-y-14" : "translate-y-0"
        )}
      >
        {/* collapse button */}
        {removeCollapseButton && (
          <Button
            onClick={toggle}
            size={"icon"}
            className={
              "rounded-full size-8 absolute left-1/2 top-0 -translate-x-1/2 z-[1] -translate-y-1/2"
            }
            variant={"default"}
          >
            <ChevronUp
              strokeWidth={1.2}
              className={cn(
                "transition-transform",
                isCollapsed ? "rotate-180" : ""
              )}
            />
          </Button>
        )}
        <ScrollArea className="rounded-md border w-full whitespace-nowrap">
          <Table
            style={{
              minWidth: miw,
              width: "100%",
            }}
          >
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className="bg-table-header" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div
                            className={cn(
                              "flex items-center gap-2",
                              header.column.getCanSort()
                                ? "cursor-pointer select-none hover:text-foreground"
                                : ""
                            )}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <span className="flex flex-col">
                                <ChevronUp
                                  size={14}
                                  className={cn(
                                    "text-muted-foreground",
                                    header.column.getIsSorted() === "asc"
                                      ? "text-foreground"
                                      : "opacity-30"
                                  )}
                                />
                                <ChevronDown
                                  size={14}
                                  className={cn(
                                    "text-muted-foreground -mt-1",
                                    header.column.getIsSorted() === "desc"
                                      ? "text-foreground"
                                      : "opacity-30"
                                  )}
                                />
                              </span>
                            )}
                          </div>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              <StatusManager
                Loader={() => <RowSkeletonLoader table={table} />}
                loaderCount={10}
                isEmpty={!table.getRowModel().rows?.length}
                query={query}
                emptyContent={
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      {/* {t("general.No results")} */}
                      {"general.No results"}
                    </TableCell>
                  </TableRow>
                }
              >
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => onRowClick?.(row as TRow)}
                    className={`${onRowClick ? "cursor-pointer" : ""} ${
                      selectedRows?.find(
                        (ele) =>
                          (ele as { id: string })?.id ==
                          (row?.original as { id: string })?.id
                      )
                        ? "bg-table-selected-background"
                        : ""
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        ) ?? <EmptyCell />}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </StatusManager>
            </TableBody>
          </Table>
        </ScrollArea>

        <div className="flex items-center justify-end space-x-2 py-3 px-3">
          <div>
            <DynamicPagination
              prefix={prefix}
              totalPageCount={totalPageCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
