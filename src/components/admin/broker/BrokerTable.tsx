import { useMemo } from "react";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import useGetAllBrokers from "@/hooks/admin/useGetAllBrokers";
import type { ColumnDef } from "@tanstack/react-table";

const BrokerTable = () => {
  const { allBrokers, allBrokersQuery } = useGetAllBrokers({ queryParams: { role: "broker" } });
  const totalPages = allBrokersQuery?.data?.pagination?.total_pages || 1;

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      
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


  return (
    <DataTable
      prefix={TABLE_PREFIXES.brokers}
      columns={columns}
      data={allBrokers ?? []}
      query={allBrokersQuery}
      totalPageCount={totalPages}
      searchKey="first_name"
      searchPlaceholder="بحث عن طريق الاسم..."
      searchType="text"
      show={true}
    />
  );
};

export default BrokerTable;
