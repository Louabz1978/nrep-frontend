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
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import {
  MarketMovementFormSchema,
  type MarketMovementFormType,
  marketMovementFormInitialValues,
} from "@/data/website/schema/MarketMovementFormSchema";

type MarketMovementRow = {
  criteria: string;
  count: number;
};

const buildRows = (data: any): MarketMovementRow[] => {
  if (!data) return [];
  return [
    { criteria: "العقارات الجديدة", count: data.new_listings_count || 0 },
    { criteria: "العقارات قيد الانتظار", count: data.pending_count || 0 },
    { criteria: "العقارات المباعة", count: data.closed_count || 0 },
    { criteria: "العقارات الخارجة من السوق", count: data.out_of_market || 0 },
    { criteria: "العقارات العائدة للسوق", count: data.return_the_market || 0 },
  ];
};

const MarketMovement = () => {
  const form = useForm<MarketMovementFormType>({
    resolver: joiResolver(MarketMovementFormSchema),
    defaultValues: marketMovementFormInitialValues,
  });

  const { area, period } = form.watch();
  const { Area } = useGetArea();

  const { marketMovement, getMarketMovementQuery } = useGetMarketMovement({
    area: area || "الانشاءات",
    period: period || "1 month",
  });

  const rows: MarketMovementRow[] = useMemo(
    () => buildRows(marketMovement),
    [marketMovement]
  );

  const columns: ColumnDef<MarketMovementRow>[] = useMemo(
    () => [
      { accessorKey: "criteria", header: "معايير التقرير" },
      { accessorKey: "count", header: "العدد" },
    ],
    []
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
                label="الفترة"
                name="period"
                placeholder="اختر الفترة"
                choices={[
                  { label: "1 شهر", value: "1 month" },
                  { label: "3 أشهر", value: "3 months" },
                  { label: "6 أشهر", value: "6 months" },
                  { label: "12 شهر", value: "12 months" },
                ]}
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
