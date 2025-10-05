import { useMemo } from "react";
// @ts-ignore
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import Select from "@/components/global/form/select/Select";
import useMarketWatcher from "@/hooks/website/listing/useMarketWatcher";
import useGetArea from "@/hooks/website/listing/useGetArea";

import {
  FilterChartsSchema,
  FilterChartsInitialValues,
  type FilterChartsType,
} from "@/data/website/schema/FilterCharts";

import type { GetMarketWatcherProps } from "@/api/website/listings/getMarketWatcher";
import SkeltonPie from "@/components/global/ui/Skeltonpie";
import StatusManager from "@/components/global/statusManager/StatusManager";

const MarketStatusPie = () => {
  const form = useForm<FilterChartsType>({
    resolver: joiResolver(FilterChartsSchema),
    defaultValues: FilterChartsInitialValues,
    mode: "onChange",
  });

  const { Area } = useGetArea();
  const { date, area } = form.watch();

  const apiParams = useMemo<GetMarketWatcherProps | null>(() => {
    if (!date?.value || !area?.title) return null;
    return {
      queryParams: { period: String(date.value), area: String(area.title) },
    };
  }, [date, area]);

  const { marketWatcher, marketWatcherQuery } = useMarketWatcher(apiParams);

  const { labels, values } = useMemo(() => {
    const arr: Array<{ label: string; value: number }> = Array.isArray(
      marketWatcher
    )
      ? marketWatcher.map((x: any) => ({
          label: String(x.label ?? ""),
          value: Number(x.value ?? 0),
        }))
      : marketWatcher && typeof marketWatcher === "object"
      ? Object.entries(marketWatcher as Record<string, number>).map(
          ([k, v]) => ({
            label: k,
            value: Number(v),
          })
        )
      : [];

    return {
      labels: arr.map((a) => a.label),
      values: arr.map((a) => a.value),
    };
  }, [marketWatcher]);

  const arLabels = useMemo(() => {
    const translations: Record<string, string> = {
      new_listings_count: "معروضة للبيع",
      pending_count: "قيد البيع",
      closed_count: "مباعة",
      out_of_market: "مسحوبة من السوق",
      return_the_market: "معروضة مرة اخرى",
    };
    return labels.map((label) => {
      const key = label?.toLowerCase().trim().replace(/\s+/g, "_");
      return translations[key] || label;
    });
  }, [labels]);

  const statusColorMap: Record<string, string> = {
    new_listings_count: "#B9A779",
    pending_count: "#6CA69C",
    closed_count: "#6B1F2A",
    out_of_market: "#A9A18E",
    return_the_market: "#428177",
  };

  const colors = labels.map((raw) => {
    const key = raw?.toLowerCase().trim().replace(/\s+/g, "_");
    return statusColorMap[key] ?? "#6CA69C";
  });

  const options: ApexOptions = {
    chart: { type: "pie" },
    legend: { show: false },
    colors,
    dataLabels: {
      enabled: true,
      formatter: (_val, opts) => {
        const idx = opts.seriesIndex ?? 0;
        const text = arLabels[idx] ?? "";
        return text.length > 12 ? `...${text.slice(0, 12)}` : text;
      },
      style: { fontSize: "12px", fontWeight: 600, colors: ["#fff"] },
      dropShadow: { enabled: false },
    },
    plotOptions: {
      pie: {
        dataLabels: { offset: -20, minAngleToShowLabel: 15 },
      },
    },
    labels: arLabels,
  };

  return (
    <div className="bg-tertiary-bg rounded shadow-[var(--shadow-card)] h-[425px] text-[var(--card)] p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-size20 font-semibold">مراقب السوق</h3>
      </div>
      <StatusManager
        Loader={SkeltonPie}
        query={marketWatcherQuery}
        isEmpty={!values || values.length === 0}
        emptyContent={
          <div className="text-center text-gray-400 mt-20">
            لا توجد بيانات متاحة
          </div>
        }
      >
        <ReactApexChart
          options={options}
          series={values}
          type="pie"
          height={250}
        />
      </StatusManager>
      <form className="flex justify-between px-5 mb-4">
        <div className="max-w-40 min-w-30">
          <Select
            form={form}
            label="التاريخ"
            name="date"
            placeholder="التاريخ"
            choices={[
              { value: "1 month", label: "شهر" },
              { value: "3 months", label: "ثلاثة أشهر" },
              { value: "6 months", label: "ستة أشهر" },
              { value: "1 year", label: "سنة" },
            ]}
            showValue="label"
            keyValue="value"
          />
        </div>
        <div className="w-48">
          <Select
            form={form}
            label="المنطقة"
            name="area"
            placeholder="المنطقة"
            choices={Area}
            showValue="title"
            keyValue="title"
          />
        </div>
      </form>
    </div>
  );
};

export default MarketStatusPie;
