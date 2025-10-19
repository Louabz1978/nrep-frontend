import { useMemo } from "react";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import useGetAllBrokers from "@/hooks/admin/useGetAllBrokers";
import type { ColumnDef } from "@tanstack/react-table";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";

const BrokerTable = () => {
  const { allBrokers, allBrokersQuery } = useGetAllBrokers({ queryParams: { role: "broker" } });
  const totalPages = allBrokersQuery?.data?.pagination?.total_pages || 1;

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "index",
        header: "#",
        cell: ({ row }) => row.index + 1,
        size: 5,
        minSize: 5,
      },
      {
        accessorKey: "first_name",
        header: "الأسم الأول",
        size: 20,
        minSize: 20,
      },
      {
        accessorKey: "last_name",
        header: "إسم العائلة",
        size: 20,
        minSize: 20,
      },
      {
        accessorKey: "email",
        header: "البريد الإلكتروني",
        size: 25,
        minSize: 25,
      },
      {
        accessorKey: "phone_number",
        header: "رقم الهاتف",
        size: 20,
        minSize: 20,
      },
    ],
    []
  );


  return (
    <AnimateContainer>
      <PageContainer>
        <div className="space-y-6">
          {/* Page Header */}
          <div className="mb-5xl">
          <h1 className="text-size30 font-medium">أصحاب الشركات العقارية</h1>
          <hr />
        </div>

          {/* Data Table */}
          <DataTable
            prefix={TABLE_PREFIXES.brokers}
            columns={columns}
            data={allBrokers ?? []}
            query={allBrokersQuery}
            totalPageCount={totalPages}
            searchKey="first_name"
            searchPlaceholder="البحث عن طريق الإسم"
            searchType="text"
            show={true}
            to="/admin/brokers/add"
            addLabel="إضافة صاحب شركة عقارية"
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default BrokerTable;
