import { useMemo } from "react";
import { DataTable, type Filters } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import useGetAllRealtors from "@/hooks/admin/useGetAllRealtors";
import { Checkbox } from "@/components/global/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";

const RealtorTable = () => {
  const { allRealtors, allRealtorsQuery } = useGetAllRealtors({ queryParams: { role: "realtor" } });
  const totalPages = allRealtorsQuery?.data?.pagination?.total_pages || 1;

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            className="ms-2 bg-white"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            className="ms-2 bg-white"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 4,
        minSize: 4,
      },
      {
        accessorKey: "first_name",
        header: "الاسم الأول",
        size: 15,
        minSize: 15,
      },
      {
        accessorKey: "last_name",
        header: "اسم العائلة",
        size: 15,
        minSize: 15,
      },
      {
        accessorKey: "email",
        header: "البريد الإلكتروني",
        size: 20,
        minSize: 20,
      },
      {
        accessorKey: "phone_number",
        header: "رقم الهاتف",
        size: 15,
        minSize: 15,
      },
    ],
    []
  );

  // Filter/search options
  const filters: Filters = useMemo(
    () => [
      {
        id: "1",
        type: "text",
        label: "الاسم الأول",
        title: "الاسم الأول",
        searchKey: "first_name",
      },
      {
        id: "2",
        type: "text",
        label: "اسم العائلة",
        title: "اسم العائلة",
        searchKey: "last_name",
      },
      {
        id: "3",
        type: "text",
        label: "البريد الإلكتروني",
        title: "البريد الإلكتروني",
        searchKey: "email",
      },
      {
        id: "4",
        type: "text",
        label: "رقم الهاتف",
        title: "رقم الهاتف",
        searchKey: "phone_number",
      }
    ],
    []
  );

  return (
    <DataTable
      prefix={TABLE_PREFIXES.realtors}
      columns={columns}
      filters={filters}
      data={allRealtors ?? []}
      query={allRealtorsQuery}
      totalPageCount={totalPages}
      searchKey="first_name"
      searchPlaceholder="بحث عن طريق الاسم..."
      searchType="text"
      show={true}
    />
  );
};

export default RealtorTable;
