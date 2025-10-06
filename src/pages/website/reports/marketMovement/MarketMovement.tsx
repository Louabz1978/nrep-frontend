import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import type { ColumnDef } from "@tanstack/react-table";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import Select from "@/components/global/form/select/Select";
import { DataTable } from "@/components/global/table2/table";
import useGetMarketMovement from "@/hooks/website/reports/useGetMarketMovement";
import useGetArea from "@/hooks/website/listing/useGetArea";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import MONTHS from "@/data/global/months";
import YEARS from "@/data/global/years";
import {
  marketMovementFormInitialValues,
  MarketMovementFormSchema,
  type MarketMovementFormType,
} from "@/data/website/schema/MarketMovementFormSchema";
import type { PropertyStatsResponse } from "@/types/website/reports";
type MarketMovementRow = {
  criteria: string;
  year2025: string | number;
  year2024: string | number;
  changeRate: string | number;
};
const buildRows = (response?: PropertyStatsResponse): MarketMovementRow[] => {
  if (!response) return [];

  const currentYearData = response.current_year || [];
  const previousYearData = response.previous_year || [];

  const rows: MarketMovementRow[] = [];

  const currentSold = currentYearData.reduce(
    (sum, item) => sum + item.number_of_closed,
    0
  );
  const previousSold = previousYearData.reduce(
    (sum, item) => sum + item.number_of_closed,
    0
  );
  const soldChangeRate =
    previousSold > 0
      ? (((currentSold - previousSold) / previousSold) * 100).toFixed(0)
      : "0";

  rows.push({
    criteria: "عدد العقارات المباعة",
    year2025: currentSold,
    year2024: previousSold,
    changeRate: `${soldChangeRate}%`,
  });

  // Average prices
  const currentAvgPrice =
    currentYearData.length > 0
      ? currentYearData.reduce(
          (sum, item) => sum + (item.avg_closed_price || 0),
          0
        ) / currentYearData.length
      : 0;
  const previousAvgPrice =
    previousYearData.length > 0
      ? previousYearData.reduce(
          (sum, item) => sum + (item.avg_closed_price || 0),
          0
        ) / previousYearData.length
      : 0;
  const priceChangeRate =
    previousAvgPrice > 0
      ? (
          ((currentAvgPrice - previousAvgPrice) / previousAvgPrice) *
          100
        ).toFixed(0)
      : "0";

  rows.push({
    criteria: "متوسط الأسعار",
    year2025: currentAvgPrice > 0 ? currentAvgPrice.toFixed(0) : "0",
    year2024: previousAvgPrice > 0 ? previousAvgPrice.toFixed(0) : "0",
    changeRate: `${priceChangeRate}%`,
  });

  // Property type
  const currentType = currentYearData[0]?.property_type || "لا يوجد";
  const previousType = previousYearData[0]?.property_type || "لا يوجد";
  const typeChangeRate = "25";

  rows.push({
    criteria: "نوع العقار",
    year2025: currentType,
    year2024: previousType,
    changeRate: `${typeChangeRate}%`,
  });

  return rows;
};

const MarketMovement = () => {
  const form = useForm<MarketMovementFormType>({
    resolver: joiResolver(MarketMovementFormSchema),
    defaultValues: marketMovementFormInitialValues,
  });

  const { area, year, month } = form.watch();
  const { Area } = useGetArea();

  const { marketMovement, getMarketMovementQuery } = useGetMarketMovement({
    city: "حمص",
    area: area?.title,
    year: year?.value,
    month: month?.value,
  });

  const rows = useMemo(() => buildRows(marketMovement), [marketMovement]);

  const columns: ColumnDef<MarketMovementRow>[] = useMemo(
    () => [
      { accessorKey: "criteria", header: "معايير التقرير" },
      { accessorKey: "year2025", header: "2025" },
      { accessorKey: "year2024", header: "2024" },
      { accessorKey: "changeRate", header: "معدل التغير %" },
    ],
    []
  );

  // if (getMarketMovementQuery.isError) {
  //   return (
  //     <AnimateContainer>
  //       <FormSectionHeader>تقرير حركة السوق</FormSectionHeader>
  //       <PageContainer>
  //         <div className="text-center text-red-600 py-8">
  //           <p>حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.</p>
  //         </div>
  //       </PageContainer>
  //     </AnimateContainer>
  //   );
  // }

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="flex xl:flex-nowrap flex-wrap border-b mb-8 pb-2">
          <FormSectionHeader className="text-right">
            تقرير حركة السوق
          </FormSectionHeader>

          <form>
            <div className="flex justify-center items-center gap-10">
              <Select
                form={form}
                label="السنة"
                name="year"
                placeholder="اختر السنة"
                choices={YEARS}
                showValue="label"
                keyValue="value"
              />
              <Select
                form={form}
                label="الشهر"
                name="month"
                placeholder="اختر الشهر"
                choices={MONTHS}
                showValue="label"
                keyValue="value"
              />
              <Select
                form={form}
                label="اسم المنطقة"
                name="area"
                placeholder="اختر المنطقة"
                choices={Area}
                showValue="title"
                keyValue="title"
                labelStyle="w-[120px]"
              />
            </div>
          </form>
        </div>

        <DataTable
          report={true}
          prefix={TABLE_PREFIXES.market_movement}
          columns={columns}
          data={rows}
          query={getMarketMovementQuery}
        />
      </PageContainer>
    </AnimateContainer>
  );
};

export default MarketMovement;
