import { useMemo } from "react";
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
import MONTHS from "@/data/global/months";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import {
  MarketMovementFormSchema,
  marketMovementFormInitialValues,
  type MarketMovementFormType,
} from "@/data/website/schema/MarketMovementFormSchema";
import YEARS from "@/data/global/years";

// ---------------- Helpers ----------------

type MarketMovementRow = {
  criteria: string;
  year2025: string | number;
  year2024: string | number;
  changeRate: string;
};

const calculateChangeRate = (
  currentValue: number,
  previousValue: number
): string => {
  if (previousValue === 0) return "+0%";
  const change = ((currentValue - previousValue) / previousValue) * 100;
  return `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;
};

const translatePropertyType = (type: string): string => {
  switch (type) {
    case "apartment":
      return "شقة";
    case "villa":
    case "house":
      return "فيلا";
    case "farm":
      return "مزرعة";
    case "store":
      return "محل تجاري";
    case "land":
      return "ارض";
    case "building":
      return "بناء";
    default:
      return "-";
  }
};

const buildRows = (current: any, previous: any): MarketMovementRow[] => {
  const c = Array.isArray(current) ? current[0] ?? {} : {};
  const p = Array.isArray(previous) ? previous[0] ?? {} : {};

  const closedCurr = Number(c.number_of_closed || 0);
  const closedPrev = Number(p.number_of_closed || 0);

  const avgCurr = Number(c.avg_closed_price || 0);
  const avgPrev = Number(p.avg_closed_price || 0);

  const typeCurr = translatePropertyType(String(c.property_type || "-"));
  const typePrev = translatePropertyType(String(p.property_type || "-"));

  return [
    {
      criteria: "عدد العقارات المباعة",
      year2025: closedCurr,
      year2024: closedPrev,
      changeRate: calculateChangeRate(closedCurr, closedPrev),
    },
    {
      criteria: "متوسط الأسعار",
      year2025: avgCurr,
      year2024: avgPrev,
      changeRate: calculateChangeRate(avgCurr, avgPrev),
    },
    {
      criteria: "نوع العقار",
      year2025: typeCurr,
      year2024: typePrev,
      changeRate: "-",
    },
  ];
};

// ---------------- Component ----------------

const MarketMovement = () => {
  const form = useForm<MarketMovementFormType>({
    resolver: joiResolver(MarketMovementFormSchema),
    defaultValues: marketMovementFormInitialValues,
  });

  const { area, month, year } = form.watch();

  const selectedMonth = useMemo(() => Number(month || 9), [month]);
  const selectedYear = useMemo(() => Number(year || 2025), [year]);

  const { Area } = useGetArea();

  const { marketMovement, getMarketMovementQuery } = useGetMarketMovement({
    city: "حمص",
    area: area || "الانشاءات",
    month: selectedMonth,
    year: selectedYear,
  });

  const rows: MarketMovementRow[] = useMemo(
    () =>
      buildRows(marketMovement?.current_year, marketMovement?.previous_year),
    [marketMovement]
  );

  const columns: ColumnDef<MarketMovementRow>[] = useMemo(
    () => [
      { accessorKey: "criteria", header: "معايير التقرير" },
      { accessorKey: "year2025", header: selectedYear.toString() },
      { accessorKey: "year2024", header: (selectedYear - 1).toString() },
      { accessorKey: "changeRate", header: "% معدل التغير" },
    ],
    [selectedYear]
  );

  if (getMarketMovementQuery.isError) {
    return (
      <AnimateContainer>
        <FormSectionHeader>تقرير حركة السوق</FormSectionHeader>
        <PageContainer>
          <div className="text-center text-red-600 py-8">
            <p>حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.</p>
          </div>
        </PageContainer>
      </AnimateContainer>
    );
  }

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="flex xl:flex-nowrap flex-wrap border-b mb-8 pb-2">
          <FormSectionHeader className="text-right">
            تقرير حركة السوق
          </FormSectionHeader>

          <form>
            <div className="flex justify-center items-center gap-10">
              {/* <Select
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
              /> */}
              <Select
                form={form}
                label="المنطقة"
                name="area"
                placeholder="اختر المنطقة"
                choices={Area}
                showValue="title"
                keyValue="title"
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
