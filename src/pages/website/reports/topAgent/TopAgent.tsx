import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { TopAgentReport } from "@/types/website/reports";
import useGetTopAgent from "@/hooks/website/reports/useGetTopAgent";
import { useState } from "react";
import { Radio } from "@/components/global/ui/radio";

const TopAgent = () => {
  // Default values for month and year as 9 and 2025
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const { topAgent, getTopAgentQuery } = useGetTopAgent({
    month,
    year,
  });

  const [period, setPeriod] = useState<"current" | "previous">("current");

  const columns: ColumnDef<TopAgentReport>[] = useMemo(
    () => [
      {
        id: "rank",
        header: "#",
        cell: ({ row }) => {
          return row?.index + 1;
        },
        size: 10,
      },
      {
        accessorKey: "license_number",
        header: "رخصة الوسيط العقاري",
        size: 20,
      },
      {
        accessorKey: "full_name",
        header: "اسم الوسيط العقاري",
        size: 30,
      },
      {
        accessorKey: "closed_count",
        header: "عدد العقارات المغلقة",
        size: 10,
      },
      {
        accessorKey: "total_price",
        header: "مجموع المباع و المؤجر",
        size: 10,
      },
    ],
    []
  );

  type TopAgentResponse = {
    current_month?: TopAgentReport[];
    previous_month?: TopAgentReport[];
  };

  const response = topAgent as Partial<TopAgentResponse> | undefined;

  const currentResults: TopAgentReport[] = Array.isArray(
    response?.current_month
  )
    ? (response!.current_month as TopAgentReport[])
    : [];

  const previousResults: TopAgentReport[] = Array.isArray(
    response?.previous_month
  )
    ? (response!.previous_month as TopAgentReport[])
    : [];

  return (
    <AnimateContainer>
      <PageContainer>
        {/* Responsive controls for month/year can be added here if needed */}
        <div className="mb-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-size24 sm:text-size30 font-medium mb-md sm:mb-xl text-center sm:text-right">
              تقرير أفضل عشر وسطاء عقاريين
            </h1>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-12 mb-2 sm:mb-4">
              <div className="flex flex-row items-center gap-4 sm:gap-10 w-full sm:w-auto justify-center">
                <Radio
                  name="period"
                  value="current"
                  label="الشهر الحالي"
                  checked={period === "current"}
                  onChange={() => setPeriod("current")}
                  ariaLabel="الشهر الحالي"
                />
                <Radio
                  name="period"
                  value="previous"
                  label="الشهر السابق"
                  checked={period === "previous"}
                  onChange={() => setPeriod("previous")}
                  ariaLabel="الشهر السابق"
                />
              </div>
            </div>
          </div>
          <hr className="mt-2" />
        </div>
        <div className="w-full overflow-x-auto">
          {period === "current" ? (
            <DataTable
              report={true}
              prefix={TABLE_PREFIXES.top_agent}
              columns={columns}
              data={currentResults}
              query={getTopAgentQuery}
            />
          ) : (
            <DataTable
              report={true}
              prefix={TABLE_PREFIXES.top_agent}
              columns={columns}
              data={previousResults}
              query={getTopAgentQuery}
            />
          )}
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default TopAgent;
