import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { TopAgentReport } from "@/types/website/reports";
import useGetTopAgent from "@/hooks/website/reports/useGetTopAgent";

const TopAgent = () => {
  const { totalPages, topAgent, getTopAgentQuery } = useGetTopAgent();

  const columns: ColumnDef<TopAgentReport>[] = useMemo(
    () => [
      {
        accessorKey: "rank",
        header: "#",
        size: 10,
      },
      {
        accessorKey: "broker_license",
        header: "رخصة الوسيط العقاري",
        size: 20,
      },
      {
        accessorKey: "broker_name",
        header: "اسم الوسيط العقاري",
        size: 30,
      },
      {
        accessorKey: "closed_properties",
        header: "عدد العقارات المغلقة",
        size: 10,
      },
      {
        accessorKey: "sold_rented_total",
        header: "مجموع المباع و المؤجر",
        size: 10,
      },
    ],
    []
  );

  return (
    <AnimateContainer>
      <PageContainer>
        <h2 className="text-center text-2xl font-bold mb-4">تقرير الشهر الحالي</h2>
        <DataTable
          prefix={TABLE_PREFIXES.top_agent}
          columns={columns}
          data={topAgent || []}
          totalPageCount={totalPages}
          query={getTopAgentQuery}
        />

        <h2 className="text-center text-2xl font-bold mt-8 mb-4">تقرير الشهر السابق</h2>
        <DataTable
          prefix={TABLE_PREFIXES.top_agent}
          columns={columns}
          data={topAgent || []}
          totalPageCount={totalPages}
          query={getTopAgentQuery}
        />
      </PageContainer>
    </AnimateContainer>
  );
};

export default TopAgent;
