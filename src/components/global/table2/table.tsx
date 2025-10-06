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
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

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
  to?: string;
  totalPageCount?: number;
  query?: UseQueryResult;
  prefix: string;
  initialSorting?: SortingState;
  searchKey?: string;
  searchPlaceholder?: string;
  searchType?: "text" | "number";
  show?: boolean;
  addLabel?: string;
  showActionButtons?: boolean;
  report?: boolean;
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
  addLabel,
  showActionButtons = false,
  report = false,
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
  const [allowedFilters, setAllowedFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1 gap-xl">
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
        <ScrollArea className="rounded-md flex-1 w-full whitespace-nowrap">
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

            <TableHeader report={report}>
              {table.getHeaderGroups().map((headerGroup) =>
                !report ? (
                  <TableRow key={headerGroup.id} className="bg-white">
                    <TableHead
                      colSpan={table.getCenterLeafHeaders().length}
                      className="relative"
                    >
                      <div className="flex justify-between items-center p-2xl">
                        <div className="flex items-center justify-between gap-lg">
                          <SettingsButton id={id} />
                          {show && (
                            <AddButton to={`${to}`} addLabel={addLabel} />
                          )}
                          {showActionButtons && (
                            <>
                              <Link
                                to=""
                                className="flex items-center justify-between gap-xl bg-umber-light p-sm rounded-md text-tertiary-bg "
                              >
                                <p>حذف عقار</p>
                                <FaRegTrashAlt />
                              </Link>
                            </>
                          )}
                        </div>
                        <div className="flex gap-lg flex-wrap items-center flex-row-reverse">
                          <TableSearch
                            prefix={prefix}
                            wrapperClassName="w-fit min-w-[150px]"
                            searchKey={searchKey}
                            searchPlaceholder={searchPlaceholder}
                            searchType={searchType}
                          />
                          {filters && filters.length > 0 ? (
                            <Fragment>
                              <Popover
                                open={isFilterOpen}
                                onOpenChange={setIsFilterOpen}
                              >
                                <PopoverTrigger asChild>
                                  <Button
                                    className={`!rounded-md bg-transparent !text-primary-fg flex items-center gap-xs ml-4xl px-lg py-sm  border border-transparent  ${
                                      isFilterOpen
                                        ? "border-primary"
                                        : "hover:border-primary"
                                    }`}
                                  >
                                    <p className="font-medium text-size16">
                                      الفلتر
                                    </p>
                                    <ListFilterPlus className="size-xl ml-xs" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[180px] p-md rounded-sm bg-tertiary-bg border-0 shadow-[#00000040] shadow-2xl">
                                  <p className="mb-lg">{"الفلتر"}</p>

                                  {filters.map((f) => {
                                    return (
                                      <Label
                                        className="flex items-center"
                                        key={f.id}
                                      >
                                        <Checkbox
                                          className="capitalize me-md"
                                          checked={allowedFilters.includes(
                                            f.id
                                          )}
                                          onCheckedChange={(value) => {
                                            setAllowedFilters((pre) =>
                                              value
                                                ? [...pre, f.id]
                                                : pre.filter(
                                                    (id) => id !== f.id
                                                  )
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
                      </div>
                    </TableHead>
                  </TableRow>
                ) : null
              )}
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className={cn(report ? "bg-primary" : "bg-tertiary-bg")}
                >
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
                              "flex items-center justify-center gap-2 font-bold ",
                              header.column.getCanSort()
                                ? `cursor-pointer select-none ${
                                    report
                                      ? "text-inverse-fg"
                                      : "text-primary-fg hover:text-primary-fg"
                                  } `
                                : `${
                                    report
                                      ? "text-inverse-fg"
                                      : "text-secondary-fg"
                                  }`
                            )}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && !report && (
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

            <TableBody className="">
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
                {table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => onRowClick?.(row as TRow)}
                    className={cn(
                      onRowClick ? "cursor-pointer" : "",
                      report ? "border-b border-gray-300 last:border-b-0" : "",
                      selectedRows?.find(
                        (ele) =>
                          (ele as { id: string })?.id ==
                          (row?.original as { id: string })?.id
                      )
                        ? "bg-primary-bg"
                        : report
                        ? "bg-tertiary-bg"
                        : index % 2 === 0
                        ? "bg-[#edebe0]"
                        : "bg-tertiary-bg"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{ width: `${cell.column.getSize()}px` }}
                        className="max-w-[150px] text-center"
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

        {!report && (
          <div className="flex items-center justify-between space-x-md py-lg px-lg">
            <div className="flex-1 text-sm text-secondary-fg">
              <span className="hidden sm:inline">
                {`تم تحديد ${
                  table.getFilteredSelectedRowModel().rows.length
                } من ${table.getFilteredRowModel().rows.length}`}
              </span>
              <span className="inline sm:hidden">
                {`${table.getFilteredSelectedRowModel().rows.length} من ${
                  table.getFilteredRowModel().rows.length
                }`}
              </span>
            </div>
            <div className="flex-1 flex justify-center">
              <DynamicPagination
                prefix={prefix}
                totalPageCount={totalPageCount}
              />
            </div>
            <div className="flex-1" />
          </div>
        )}
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
