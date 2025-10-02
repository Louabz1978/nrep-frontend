import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { TopAgentReport } from "@/types/website/reports";
import useGetTopAgent from "@/hooks/website/reports/useGetTopAgent";
import { useState } from "react";

const TopAgent = () => {
  // Default values for month and year as 9 and 2025
  const month = "9";
  const year = "2025";
  const { topAgent, getTopAgentQuery } = useGetTopAgent({
    month,
    year,
  });

  const [period, setPeriod] = useState<"current" | "previous">("current");

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

  type TopAgentResponse = {
    results?: TopAgentReport[];
    previous_results?: TopAgentReport[];
  };

  const response = topAgent as Partial<TopAgentResponse> | undefined;

  const currentResults: TopAgentReport[] = Array.isArray(response?.results)
    ? (response!.results as TopAgentReport[])
    : [];

  const previousResults: TopAgentReport[] = Array.isArray(
    response?.previous_results
  )
    ? (response!.previous_results as TopAgentReport[])
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

                <label className="flex items-center gap-2 sm:gap-4 cursor-pointer select-none">
                  <input
                    type="radio"
                    className="sr-only peer"
                    name="period"
                    value="current"
                    checked={period === "current"}
                    onChange={() => setPeriod("current")}
                    aria-label="الشهر الحالي"
                  />
                  <span className="relative grid place-items-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-tertiary-bg shadow-md after:content-[''] after:w-3 after:h-3 sm:after:w-3.5 sm:after:h-3.5 after:rounded-full after:bg-primary after:transition-transform after:duration-150 after:ease-out after:scale-0 peer-checked:after:scale-100" />
                  <span className="text-base sm:text-xl text-primary">الشهر الحالي</span>
                </label>
                <label className="flex items-center gap-2 sm:gap-4 cursor-pointer select-none">
                  <input
                    type="radio"
                    className="sr-only peer"
                    name="period"
                    value="previous"
                    checked={period === "previous"}
                    onChange={() => setPeriod("previous")}
                    aria-label="الشهر السابق"
                  />
                  <span className="relative grid place-items-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-tertiary-bg shadow-md after:content-[''] after:w-3 after:h-3 sm:after:w-3.5 sm:after:h-3.5 after:rounded-full after:bg-primary after:transition-transform after:duration-150 after:ease-out after:scale-0 peer-checked:after:scale-100" />
                  <span className="text-base sm:text-xl text-primary">الشهر السابق</span>
                </label>
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
