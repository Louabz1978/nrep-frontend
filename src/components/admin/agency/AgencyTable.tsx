import { useMemo } from "react";
import { DataTable, type Filters } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { Checkbox } from "@/components/global/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import type { Agency } from "@/types/admin/agency";
import useGetAgencies from "@/hooks/admin/useGetAgencies";

const AgencyTable = () => {
  const { agencies, agenciesQuery } = useGetAgencies();
  const totalPages = agenciesQuery?.data?.pagination?.total_pages || 1;

  const columns: ColumnDef<Agency>[] = useMemo(
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
      { accessorKey: "name", header: "اسم الشركة" },
      { accessorKey: "email", header: "البريد الإلكتروني"},
      { accessorKey: "phone_number", header: "رقم الهاتف" },
      { accessorKey: "created_by", header: "أنشئت بواسطة" },
      { accessorKey: "address.city", header: "المدينة" },
    ],
    []
  );


  return (
    <DataTable
      prefix={TABLE_PREFIXES.agencies}
      columns={columns}
      data={agencies ?? []}
      query={agenciesQuery}
      totalPageCount={totalPages}
      searchKey="name"
      searchPlaceholder="بحث عن طريق اسم الشركة..."
      searchType="text"
      show={true}
      to="/admin/agencies/create"
      addLabel="إضافة شركة"
    />
  );
};

export default AgencyTable;


