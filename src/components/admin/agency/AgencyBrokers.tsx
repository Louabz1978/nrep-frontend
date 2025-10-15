import { useMemo } from "react";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import type { ColumnDef } from "@tanstack/react-table";
import useGetAgencyById from "@/hooks/admin/useGetAgencyById";

type RowType = { broker_id: number };

const AgencyBrokersTable = ({ agency_id }: { agency_id: number }) => {
  const { agency } = useGetAgencyById({ agency_id });

  const rows: RowType[] = (agency?.brokers ?? [])
    .map((id) => Number(id))
    .filter((id) => !Number.isNaN(id))
    .map((id) => ({ broker_id: id }));

  const columns: ColumnDef<RowType>[] = useMemo(
    () => [{ accessorKey: "broker_id", header: "معرّف السمسار" }],
    []
  );


  return (
    <DataTable
      prefix={`${TABLE_PREFIXES.agencies}-brokers`}
      columns={columns}
      data={rows}
      query={undefined}
      totalPageCount={1}
      searchKey="broker_id"
      searchPlaceholder="ابحث بمعرّف السمسار..."
      searchType="number"
      show={true}
    />
  );
};

export default AgencyBrokersTable;


