import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { TopAgencyReport } from "@/types/admin/reports";
import useGetTopAgencies from "@/hooks/admin/reports/useGetTopAgencies";

const TopAgencies = () => {
  const month = "9";
  const year = "2025";
  const { topAgencies } = useGetTopAgencies({ month, year });

  const columns: ColumnDef<TopAgencyReport>[] = useMemo(
    () => [
      {
        accessorKey: "agency_id",
        header: "معرف الشركة العقارية",
        size: 20,
      },
      {
        accessorKey: "agency_name",
        header: "اسم الشركة العقارية",
        size: 35,
      },
      {
        accessorKey: "total_sales",
        header: "مجموع عدد العقارات المباعة",
        size: 20,
        cell: ({ getValue }) => (getValue() as number).toLocaleString(),
      },
      {
        accessorKey: "total_revenue",
        header: "مجموع أسعار المبيعات",
        size: 25,
        cell: ({ getValue }) => (getValue() as number).toLocaleString(),
      },
    ],
    []
  );

  return (
    <AnimateContainer>
      <PageContainer>
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-end sm:justify-between gap-4 border-b-1 pb-2">
            <h1 className="text-size24 sm:text-size30 font-medium text-center sm:text-right">
              تقرير أفضل عشر وكالات عقارية
            </h1>

            <input
              name="agency_id"
              placeholder="البحث عن طريق معرف الشركة العقارية"
              type="search"
              className="bg-white w-[400px] h-8 p-2 rounded-xl border-none outline-none focus:outline-none focus:border-none focus:ring-0 placeholder:text-size14"
              />
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-x-auto">
          <DataTable
            report={true}
            prefix={TABLE_PREFIXES.top_agencies}
            columns={columns}
            data={topAgencies}
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default TopAgencies;
