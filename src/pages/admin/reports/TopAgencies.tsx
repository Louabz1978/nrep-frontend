import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { TopAgencyReport } from "@/types/admin/reports";
import useGetTopAgencies from "@/hooks/admin/reports/useGetTopAgencies";
import { Input } from "@/components/global/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/global/ui/select";

const months = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: `الشهر: ${i + 1}`,
}));

const currentYear = new Date().getFullYear();
const years = [currentYear - 1, currentYear, currentYear + 1].map((y) => ({
  value: String(y),
  label: `السنة: ${y}`,
}));

const TopAgencies = () => {
  const now = new Date();
  const [month, setMonth] = useState(String(now.getMonth() + 1));
  const [year, setYear] = useState(String(now.getFullYear()));

  const { topAgenciesQuery, topAgencies } = useGetTopAgencies({ month, year });

  const columns: ColumnDef<TopAgencyReport>[] = useMemo(
    () => [
      { accessorKey: "agency_id", header: "معرف الشركة العقارية", size: 20 },
      { accessorKey: "agency_name", header: "اسم الشركة العقارية", size: 35 },
      {
        accessorKey: "total_properties_sold",
        header: "مجموع العقارات المباعة",
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
        <div className="mb-6">
          <div className="flex sm:flex-row items-end sm:justify-between gap-4 border-b pb-2">
            <div className="flex w-full items-end justify-between gap-4">
              <h1 className="text-size24 sm:text-size30 font-medium mb-md sm:mb-xl text-center sm:text-right">
                تقرير أفضل عشر شركات عقارية
              </h1>
              <div>
                <Input
                  placeholder="البحث عن طريق معرف الشركة"
                  type="search"
                  variant="white"
                  iconClassName="text-gray-400/50 h-[18px] w-[18px]"
                  className="w-90 bg-white !h-2lg !text-size16 !border-gray-400 !rounded-[10px] placeholder:text-xs leading-tight py-sm px-md !text-sm"
                />
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <Select value={month} onValueChange={(val) => setMonth(val)}>
                <SelectTrigger className="bg-white h-9 p-1 rounded-xl border border-gray-300 w-[110px]">
                  <SelectValue placeholder="اختر الشهر" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={year} onValueChange={(val) => setYear(val)}>
                <SelectTrigger className="bg-white h-9 p-1 rounded-xl border border-gray-300 w-[110px]">
                  <SelectValue placeholder="اختر السنة" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y.value} value={y.value}>
                      {y.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            query={topAgenciesQuery}
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default TopAgencies;
