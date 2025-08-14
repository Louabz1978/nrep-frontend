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
} from "@/components/global/ui/table";
import { cn } from "@/utils/cn";
import { ChevronUp, ChevronDown, ListFilterPlus } from "lucide-react";
import {
  type Dispatch,
  Fragment,
  type SetStateAction,
  useEffect,
  useId,
  useState,
} from "react";
import { SideModal } from "../ui/side-modal";
import { Button } from "../form/button/Button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import type { ColumnSearchProps } from "./column-search";
import ColumnSearch from "./column-search";
import { DynamicPagination } from "./pagination";
import SettingsButton from "./settings-button";
import TableSearch from "./table-search";
import StatusManager from "../statusManager/StatusManager";
import { type UseQueryResult } from "@tanstack/react-query";
import RowSkeletonLoader from "./row-skeleton-loader";
import EmptyCell from "./empty-cell";
import AddButton from "./AddButton";

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
  to?:string;
  totalPageCount?: number;
  query?: UseQueryResult;
  prefix: string;
  initialSorting?: SortingState;
  searchKey?: string;
  searchPlaceholder?: string;
  searchType?: "text" | "number";
  show?:boolean ;
}

export function DataTable<TData, TValue, TRow>({
  columns,
  data,
  miw = 1200,
  filters,
  removeCollapseButton = false,
  onRowClick,
  selectedRows,
  setCheckedRows,
  to,
  totalPageCount = 0,
  query,
  prefix,
  initialSorting = [],
  searchKey = "search",
  searchPlaceholder = "بحث...",
  searchType = "text",
  show,
}: DataTableProps<TData, TValue, TRow>) {
  const id = useId();

  // Add sorting state
  const [sorting, setSorting] = useState<SortingState>(initialSorting);

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
    <div className="flex flex-col flex-1 gap-xl">
      <div className="flex justify-between items-start">
        <div className="flex gap-3xl flex-wrap items-center">
          <TableSearch
            prefix={prefix}
            wrapperClassName="w-fit min-w-[200px]"
            searchKey={searchKey}
            searchPlaceholder={searchPlaceholder}
            searchType={searchType}
          />
          {filters && filters.length > 0 ? (
            <Fragment>
              <Popover>
                <PopoverTrigger asChild>
                  <Button size={"sm"} className="!rounded-sm">
                    <ListFilterPlus className="size-2xl" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[220px] p-lg rounded-sm bg-tertiary-bg">
                  <p className="mb-lg">{"الفلتر"}</p>

                  {filters.map((f) => {
                    return (
                      <Label className="flex items-center" key={f.id}>
                        <Checkbox
                          className="capitalize me-md"
                          checked={allowedFilters.includes(f.id)}
                          onCheckedChange={(value) => {
                            setAllowedFilters((pre) =>
                              value
                                ? [...pre, f.id]
                                : pre.filter((id) => id !== f.id)
                            );
                          }}
                        />
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
        <div className="flex items-center justify-between gap-5">
       {show && <AddButton to={`${to}`}/>}
        <SettingsButton id={id} />
       </div>
      </div>
      <div
        className={cn(
          "relative flex-1 flex flex-col ease-out rounded-md transition-transform z-[1] bg-tertiary-bg",
          isCollapsed ? "-translate-y-14" : "translate-y-0"
        )}
      >
        {/* collapse button */}
        {removeCollapseButton && (
          <Button
            onClick={toggle}
            size={"icon"}
            className={
              "rounded-full !size-4xl absolute left-1/2 top-0 -translate-x-1/2 z-[1] -translate-y-1/2"
            }
            variant={"panel"}
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
        <ScrollArea className="rounded-md flex-1 border border-secondary w-full whitespace-nowrap">
          <Table
            style={{
              minWidth: miw,
              width: "100%",
              tableLayout: "fixed",
              direction: "rtl",
            }}
          >
            <colgroup>
              {table.getLeafHeaders().map((header) => (
                <col
                  key={header.id}
                  style={{ width: `${header.getSize()}px` }}
                />
              ))}
            </colgroup>

            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-secondary">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{ width: `${header.getSize()}px` }}
                        className="relative"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={cn(
                              "flex items-center gap-2 font-bold ",
                              header.column.getCanSort()
                                ? "cursor-pointer select-none text-primary-fg hover:text-primary-fg"
                                : "text-secondary-fg"
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
                                    "text-primary-fg",
                                    header.column.getIsSorted() === "asc"
                                      ? "text-primary-fg opacity-100"
                                      : "opacity-50"
                                  )}
                                />
                                <ChevronDown
                                  size={14}
                                  className={cn(
                                    "text-primary-fg -mt-sm",
                                    header.column.getIsSorted() === "desc"
                                      ? "text-primary-fg opacity-100"
                                      : "opacity-50"
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
                      className="h-9xl text-center text-secondary-fg"
                    >
                      {"لا يوجد نتائج"}
                    </TableCell>
                  </TableRow>
                }
              >
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => onRowClick?.(row as TRow)}
                    className={cn(
                      "!border-b border-secondary",
                      onRowClick ? "cursor-pointer" : "",
                      selectedRows?.find(
                        (ele) =>
                          (ele as { id: string })?.id ==
                          (row?.original as { id: string })?.id
                      )
                        ? "bg-primary-bg"
                        : "bg-tertiary-bg"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{ width: `${cell.column.getSize()}px` }}
                        className="border-t border-l last:border-l-0 border-secondary max-w-[150px]"
                      >
                        {(cell.getValue() !== undefined &&
                          cell.getValue() !== null &&
                          cell.getValue() !== "") ||
                        !cell.column.accessorFn ? (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        ) : (
                          <EmptyCell />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </StatusManager>
            </TableBody>
          </Table>
        </ScrollArea>

        <div className="flex items-center justify-end space-x-md py-lg px-lg">
          <div className="flex-1 text-sm text-secondary-fg">
            {`تم تحديد ${table.getFilteredSelectedRowModel().rows.length} من
            ${table.getFilteredRowModel().rows.length}`}
          </div>
          <div>
            <DynamicPagination
              prefix={prefix}
              totalPageCount={totalPageCount}
            />
          </div>
        </div>
      </div>
      <SideModal size="sm" title={"إعدادات الجدول"} id={`table-${id}`}>
        <div className="space-y-3xl">
          <p className="text-lg">{"الأعمدة المعروضة"}</p>
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <Label className="flex items-center" key={column.id}>
                  <Checkbox
                    className="capitalize me-md"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  />
                  <span>{column?.columnDef?.header?.toString() || ""}</span>
                </Label>
              );
            })}
        </div>
      </SideModal>
    </div>
  );
}
