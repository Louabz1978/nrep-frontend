import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { TopAgentReport } from "@/types/website/reports";
import useGetTopAgent from "@/hooks/website/reports/useGetTopAgent";
import { Input } from "@/components/global/ui/input";
import { Label } from "@/components/global/ui/label";
import { useState } from "react";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";

const TopAgent = () => {
  // Set default values for month and year as 9 and 2025
  const [month, setMonth] = useState("9");
  const [year, setYear] = useState("2025");
  const { topAgent, getTopAgentQuery } = useGetTopAgent({
    month,
    year,
  });

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

  // Defensive: fallback to empty array if topAgent or its properties are missing
  const currentResults = (
    topAgent &&
    "results" in topAgent &&
    Array.isArray((topAgent as any).results)
      ? (topAgent as any).results
      : []
  ) as TopAgentReport[];

  const previousResults = (
    topAgent &&
    "previous_results" in topAgent &&
    Array.isArray((topAgent as any).previous_results)
      ? (topAgent as any).previous_results
      : []
  ) as TopAgentReport[];

  return (
    <AnimateContainer>
      <FormSectionHeader>أفضل عشرة وكلاء</FormSectionHeader>
      <PageContainer>
        <div className="flex gap-4 mb-4">
          <div>
            <Label htmlFor="month">الشهر</Label>
            <Input
              id="month"
              type="number"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="الشهر"
            />
          </div>
          <div>
            <Label htmlFor="year">السنة</Label>
            <Input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="السنة"
            />
          </div>
        </div>
        <h2 className="text-center text-2xl font-bold mb-4 mt-4xl">
          تقرير الشهر الحالي
        </h2>
        <DataTable
          prefix={TABLE_PREFIXES.top_agent}
          columns={columns}
          data={currentResults}
          query={getTopAgentQuery}
        />

        <h2 className="text-center text-2xl font-bold mt-8 mb-4">
          تقرير الشهر السابق
        </h2>
        <DataTable
          prefix={TABLE_PREFIXES.top_agent}
          columns={columns}
          data={previousResults}
          query={getTopAgentQuery}
        />
      </PageContainer>
    </AnimateContainer>
  );
};

export default TopAgent;
