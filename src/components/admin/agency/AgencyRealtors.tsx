import { useMemo } from "react";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import type { ColumnDef } from "@tanstack/react-table";
import useGetAgencyById from "@/hooks/admin/useGetAgencyById";
import useRemoveAgencyRealtor from "@/hooks/admin/useRemoveAgencyRealtor";
import { Button } from "@/components/global/ui/button";

type RowType = { realtor_id: number };

const AgencyRealtorsTable = ({ agency_id }: { agency_id: number }) => {
  const { agency } = useGetAgencyById({ agency_id });
  const { handleRemoveAgencyRealtor, removeAgencyRealtor } = useRemoveAgencyRealtor();

  const rows: RowType[] = (agency?.realtors ?? [])
    .map((id) => Number(id))
    .filter((id) => !Number.isNaN(id))
    .map((id) => ({ realtor_id: id }));

  const columns: ColumnDef<RowType>[] = useMemo(
    () => [
      { accessorKey: "realtor_id", header: "معرّف الوسيط" },
      {
        id: "actions",
        header: "إجراءات",
        cell: ({ row }) => (
          <Button
            size="sm"
            variant="destructive"
            disabled={removeAgencyRealtor.isPending}
            onClick={() => handleRemoveAgencyRealtor({ agency_id, realtor_id: row.original.realtor_id })}
          >
            حذف
          </Button>
        ),
      },
    ],
    [agency_id, handleRemoveAgencyRealtor, removeAgencyRealtor.isPending]
  );


  return (
    <DataTable
      prefix={`${TABLE_PREFIXES.agencies}-realtors`}
      columns={columns}
      data={rows}
      query={undefined}
      totalPageCount={1}
      searchKey="realtor_id"
      searchPlaceholder="ابحث بمعرّف الوسيط."
      searchType="number"
      show={true}
    />
  );
};

export default AgencyRealtorsTable;


