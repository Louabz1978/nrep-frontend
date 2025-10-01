import { useMemo } from "react";
// @ts-ignore: react-apexcharts types may be missing in this setup
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import useMarketWatcher from "@/hooks/website/listing/useMarketWatcher";
import type { GetMarketWatcherProps } from "@/api/website/listings/getMarketWatcher";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Select from "@/components/global/form/select/Select";
import { Skeleton } from "@/components/global/ui/skeleton";
import useGetArea from "@/hooks/website/listing/useGetArea";
import {
  FilterChartsSchema,
  FilterChartsInitialValues,
  type FilterChartsType,
} from "@/data/website/schema/FilterCharts";

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
    return { queryParams: { period: String(date.value), area: String(area.title) } };
  }, [date, area]);

  const { marketWatcher, isLoading } = useMarketWatcher(apiParams);

  const { labels, values } = useMemo(() => {
    const arr: Array<{ label: string; value: number }> = Array.isArray(marketWatcher)
      ? ((marketWatcher as unknown as Array<{ label?: unknown; value?: unknown }>).map((x) => ({
          label: String(x.label ?? ""),
          value: Number(x.value ?? 0),
        })) as Array<{ label: string; value: number }>)
      : marketWatcher && typeof marketWatcher === "object"
        ? Object.entries(marketWatcher as Record<string, number>).map(([k, v]) => ({ label: k, value: Number(v) }))
        : [];
    return {
      labels: arr.map((a) => a.label),
      values: arr.map((a) => a.value),
    };
  }, [marketWatcher]);

  const arLabels = useMemo(() => {
    const translate = (label: string) => {
      const translations: Record<string, string> = {
        new_listings_count: "عقارات معروضة للبيع",
        pending_count: "عقارات قيد البيع",
        closed_count: "عقارات مباعة",
        out_of_market: "عقارات مسحوبة من السوق",
        return_the_market: "عقارات معروضة مرة اخرى",
      };
      const key = label?.toLowerCase().trim().replace(/\s+/g, "_");
      return translations[key] || label;
    };
    return labels.map(translate);
  }, [labels]);

  const options: ApexOptions = {
    chart: { type: "pie" },
    legend: { show: false },
    colors: ["#428177", "#000000c8", "#B9A779", "#428177", "#6B1F2A"],
    dataLabels: {
      enabled: true,
      formatter: (val: number, opts) => {
        const idx = opts.seriesIndex ?? 0;
        const text = arLabels[idx] ?? "";
        return text.length > 12 ? `...${text.slice(0, 12)}` : text;
      },
      style: { fontSize: "12px", fontWeight: 600, colors: ["#fff"] },
      dropShadow: { enabled: false },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -20,
          minAngleToShowLabel: 15,
        },
      },
    },
    labels: arLabels,
  };

  return (
    <div className="bg-tertiary-bg rounded shadow-[var(--shadow-card)] h-[425px] text-[var(--card)] p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-size20 font-semibold">مراقب السوق</h3>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="relative">
              <Skeleton className="rounded-full" style={{ width: 300, height: 300 }} />
            </div>
          </div>
        </div>
      ) : values.length > 0 ? (
        <>
          <ReactApexChart options={options} series={values} type="pie" height={280} />
          <form className="flex justify-between px-5">
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
        </>
      ) : (
        <div className="text-center text-gray-400 mt-20">لا توجد بيانات متاحة</div>
      )}
    </div>
  );
};

export default MarketStatusPie;