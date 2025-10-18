import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { TopAgencyReport } from "@/types/admin/reports";
import useGetTopAgencies from "@/hooks/admin/reports/useGetTopAgencies";
import { Radio } from "@/components/global/ui/radio";

const TopAgencies = () => {
  const month = "9";
  const year = "2025";
  const { topAgencies, topAgenciesQuery } = useGetTopAgencies({
    month,
    year,
  });

  const [period, setPeriod] = useState<"current" | "previous">("current");

  const columns: ColumnDef<TopAgencyReport>[] = useMemo(
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
        accessorKey: "agency_name",
        header: "اسم الوكالة",
        size: 25,
      },
      {
        accessorKey: "total_sales",
        header: "عدد المبيعات",
        size: 15,
        cell: ({ getValue }) => {
          const value = getValue() as number;
          return value.toLocaleString();
        },
      },
      {
        accessorKey: "total_revenue",
        header: "إجمالي الإيرادات",
        size: 20,
        cell: ({ getValue }) => {
          const value = getValue() as number;
          return `$${value.toLocaleString()}`;
        },
      },
      {
        accessorKey: "active_brokers",
        header: "الوسطاء النشطين",
        size: 15,
      },
      {
        accessorKey: "active_realtors",
        header: "الوسطاء العقاريين",
        size: 15,
      },
      {
        accessorKey: "success_rate",
        header: "معدل النجاح %",
        size: 15,
        cell: ({ getValue }) => {
          const value = getValue() as number;
          return `${value}%`;
        },
      },
    ],
    []
  );

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="mb-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-size24 sm:text-size30 font-medium mb-md sm:mb-xl text-center sm:text-right">
              تقرير أفضل عشر وكالات عقارية
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
          <DataTable
            report={true}
            prefix={TABLE_PREFIXES.top_agencies}
            columns={columns}
            data={topAgencies}
            // query={topAgenciesQuery}
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default TopAgencies;
