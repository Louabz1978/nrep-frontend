import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { TopAgencyReport } from "@/types/admin/reports";
import useGetTopAgencies from "@/hooks/admin/reports/useGetTopAgencies";

const months = Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) }));
const currentYear = new Date().getFullYear();
const years = [currentYear - 1, currentYear, currentYear + 1].map((y) => ({ value: String(y), label: String(y) }));

const TopAgencies = () => {
  const [month, setMonth] = useState("9");
  const [year, setYear] = useState("2025");
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
        accessorKey: "total_properties_sold",
        header: "مجموع عدد العقارات المباعة",
        size: 20,
        cell: ({ getValue }) => (getValue() as number).toLocaleString(),
      },
      {
        accessorKey: "total_sales_amount",
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

            <div className="flex gap-2 items-center">
              <select
                className="bg-white h-8 p-1 rounded-xl border border-gray-300"
                value={month}
                onChange={e => setMonth(e.target.value)}
                title="اختر الشهر"
              >
                {months.map((m) => (
                  <option key={m.value} value={m.value}>{`الشهر: ${m.label}`}</option>
                ))}
              </select>
              <select
                className="bg-white h-8 p-1 rounded-xl border border-gray-300"
                value={year}
                onChange={e => setYear(e.target.value)}
                title="اختر السنة"
              >
                {years.map((y) => (
                  <option key={y.value} value={y.value}>{`السنة: ${y.label}`}</option>
                ))}
              </select>
            </div>
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
