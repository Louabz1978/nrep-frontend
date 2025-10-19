import { useMemo } from "react";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { Checkbox } from "@/components/global/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import type { Area } from "@/types/admin/location";
import useGetAreas from "@/hooks/admin/locations/useGetAreas";
import useGetUserById from "@/hooks/admin/useGetUserById";

// Component to display user info for each row
const CreatedByCell = ({ userId }: { userId: number }) => {
  const { user } = useGetUserById({ user_id: userId });

  return `${user?.first_name} ${user?.last_name}`;
};

const AreaTable = () => {
  const { areas, areasQuery } = useGetAreas();
  const totalPages = areasQuery?.data?.pagination?.total_pages || 1;

  const columns: ColumnDef<Area>[] = useMemo(
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
      { accessorKey: "title", header: "اسم المنطقة" },
      {
        accessorKey: "created_by",
        header: "أنشئت بواسطة",
        cell: ({ getValue }) => {
          const userId = getValue() as number;
          return <CreatedByCell userId={userId} />;
        },
      },
      {
        accessorKey: "created_at",
        header: "تاريخ الإنشاء",
        cell: ({ getValue }) => {
          const date = getValue() as string;
          return new Date(date).toLocaleDateString("en-US");
        },
      },
    ],
    []
  );

  return (
    <DataTable
      prefix={TABLE_PREFIXES.areas}
      columns={columns}
      data={areas ?? []}
      query={areasQuery}
      totalPageCount={totalPages}
      searchKey="title"
      searchPlaceholder="بحث عن طريق اسم المنطقة..."
      searchType="text"
      show={true}
      to="/admin/areas/create"
      addLabel="إضافة منطقة"
    />
  );
};

export default AreaTable;
