import { useMemo } from "react";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { Checkbox } from "@/components/global/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import type { City } from "@/types/admin/location";
import useGetCities from "@/hooks/admin/locations/useGetCities";
import useGetUserById from "@/hooks/admin/useGetUserById";

// Component to display user info for each row
const CreatedByCell = ({ userId }: { userId: number }) => {
  const { user } = useGetUserById({ user_id: userId });

  return `${user?.first_name} ${user?.last_name}`;
};

const CityTable = () => {
  const { cities, citiesQuery } = useGetCities();
  const totalPages = citiesQuery?.data?.pagination?.total_pages || 1;

  const columns: ColumnDef<City>[] = useMemo(
    () => [
      {
        id: "select",
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
      { accessorKey: "title", header: "اسم المدينة" },
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
      prefix={TABLE_PREFIXES.cities}
      columns={columns}
      data={cities ?? []}
      query={citiesQuery}
      totalPageCount={totalPages}
      searchKey="title"
      searchPlaceholder="بحث عن طريق اسم المدينة..."
      searchType="text"
      show={true}
      to="/admin/cities/create"
      addLabel="إضافة مدينة"
    />
  );
};

export default CityTable;
