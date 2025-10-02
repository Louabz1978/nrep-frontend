import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import type { ColumnDef } from "@tanstack/react-table";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import Select from "@/components/global/form/select/Select";
import { DataTable } from "@/components/global/table2/table";
import Loader from "@/components/global/loader/Loader";
import useGetMarketMovement from "@/hooks/website/reports/useGetMarketMovement";
import useGetCities from "@/hooks/website/listing/useGetCities";
import useGetArea from "@/hooks/website/listing/useGetArea";
import MONTHS from "@/data/global/months";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import {
  MarketMovementFormSchema,
  marketMovementFormInitialValues,
  type MarketMovementFormType,
} from "@/data/website/schema/MarketMovementFormSchema";

type MarketMovementReport = {
  criteria: string;
  year2024: string | number;
  year2025: string | number;
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

const transformMarketData = (apiData: any): MarketMovementReport[] => {
  if (
    !apiData ||
    !apiData.current_year ||
    !Array.isArray(apiData.current_year)
  ) {
    return [];
  }

  const currentYearData = apiData.current_year[0] ?? {};
  const previousYearData = apiData.previous_year?.[0] ?? {};

  const closedCount2025 = currentYearData.number_of_closed || 0;
  const closedCount2024 = previousYearData.number_of_closed || 0;

  const avgPrice2025 = currentYearData.avg_closed_price || 0;
  const avgPrice2024 = previousYearData.avg_closed_price || 0;
  const type25 = currentYearData.property_type || 0;
  const type24 = previousYearData.property_type || 0;

  return [
    {
      criteria: "عدد العقارات المغلقة",
      year2025: closedCount2025,
      year2024: closedCount2024,
      changeRate: calculateChangeRate(closedCount2025, closedCount2024),
    },
    {
      criteria: "متوسط الأسعار ",
      year2025: avgPrice2025,
      year2024: avgPrice2024,
      changeRate: calculateChangeRate(avgPrice2025, avgPrice2024),
    },
    {
      criteria: "نوع العقار",
      year2025: type25,
      year2024: type24,
      changeRate: calculateChangeRate(type25, type24),
    },
  ];
};

const MarketMovement = () => {
  // Initialize form with schema validation
  const form = useForm<MarketMovementFormType>({
    resolver: joiResolver(MarketMovementFormSchema),
    defaultValues: marketMovementFormInitialValues,
  });

  // Watch form values, providing fallback values for initial API call
  const { city, area, month: monthLabel, year } = form.watch();

  // Convert month label to numeric value for API
  const month = useMemo(() => {
    return MONTHS.find((m) => m.label === monthLabel)?.value || "9";
  }, [monthLabel]);

  // Get cities and areas data from hooks
  const { cities } = useGetCities();
  const { Area } = useGetArea();

  // Fetch market movement data based on form values
  const { marketMovement, getMarketMovementQuery } = useGetMarketMovement({
    city: "حمص",
    area: area || "الانشاءات",
    month: parseInt(month),
    year: parseInt(year || "2025"),
  });

  const reportData: MarketMovementReport[] = useMemo(() => {
    if (marketMovement) {
      return transformMarketData(marketMovement);
    }
    return [];
  }, [marketMovement]);

  // Define the columns for the DataTable
  const columns: ColumnDef<MarketMovementReport>[] = useMemo(
    () => [
      {
        accessorKey: "criteria",
        header: "معايير التقرير",
        headerClassName: "bg-white",
      },
      {
        accessorKey: "year2025",
        header: "2025",
      },
      {
        accessorKey: "year2024",
        header: "2024",
      },
    ],
    []
  );

  // Show loading state
  if (getMarketMovementQuery.isLoading) {
    return (
      <AnimateContainer>
        <FormSectionHeader>تقرير حركة السوق</FormSectionHeader>
        <PageContainer>
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        </PageContainer>
      </AnimateContainer>
    );
  }

  // Show error state
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
        <div className="mb-5xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-size24 sm:text-size30 font-medium text-center sm:text-right">
              تقرير حركة السوق
            </h1>

            {/* Filter Section */}
            <form className="mb-xl w-full sm:w-auto">
              <div className="flex flex-row gap-3 sm:gap-4 w-full">
                <div className="flex-1">
                  <Select
                    form={form}
                    label="المنطقة"
                    name="area"
                    placeholder="اختر المنطقة"
                    choices={Area}
                    showValue="title"
                    keyValue="title"
                    addingSelectStyle="w-full"
                  />
                </div>
                <div className="flex-1">
                  <Select
                    form={form}
                    label="الشهر"
                    name="month"
                    placeholder="اختر الشهر"
                    choices={MONTHS}
                    showValue="label"
                    keyValue="value"
                    addingSelectStyle="w-full"
                  />
                </div>
              </div>
            </form>
          </div>
          <hr className="my-2" />
        </div>
        {/* Subtitle */}
        <p className="text-center text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
          محافظة {city || "حمص"}
        </p>

        {/* Report Table */}
        <div className="overflow-x-auto">
          <DataTable
            report={true}
            prefix={TABLE_PREFIXES.market_movement}
            columns={columns}
            data={reportData}
            query={getMarketMovementQuery}
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default MarketMovement;
