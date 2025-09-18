// Filename: MarketMonitorCard.tsx
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import type { ChartOptions, ScriptableContext } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useForm, type UseFormReturn } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Select from "@/components/global/form/select/Select";
import {
  FilterChartsSchema,
  FilterChartsInitialValues,
  type FilterChartsType,
} from "@/data/website/schema/FilterCharts";
import useMarketWatcher from "@/hooks/website/listing/useMarketWatcher";
import Loader from "@/components/global/loader/Loader";
import useGetArea from "@/hooks/website/listing/useGetArea";

// --- Types & Constants ---
type ChartSeries = { label: string; value: number };

const GRADIENT_COLORS = [
  ["#6dd875", "#c8eac948"], // Green
  ["#f8cd52", "#fceed54f"], // Yellow
  ["#ff6b6b", "#ffc9c94f"], // Red
  ["#94a3b8", "#e2e8f056"], // Grey
  ["#6caee0", "#c2dcf056"], // Blue
];
const BAR_THICKNESS = 42;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartDataLabels
);

// --- Utility Functions ---
const translateLabelToArabic = (label: string): string => {
  const translations: Record<string, string> = {
    new_listings_count: "عقارات معروضة للبيع",
    pending_count: "عقارات قيد البيع",
    closed_count: "عقارات مباعة",
    out_of_market: "عقارات مسحوبة من السوق",
    return_the_market: "عقارات معروضة مرة اخرى",
  };
  const key = label?.toLowerCase().trim().replace(/ /g, "_") ?? "";
  return translations[key] || label;
};

const normalizeMarketData = (data: unknown): ChartSeries[] => {
  if (Array.isArray(data)) {
    return (data as Array<{ label?: unknown; value?: unknown }>)
      .filter(
        (it) => typeof it?.label === "string" && typeof it?.value === "number"
      )
      .map((it) => ({
        label: translateLabelToArabic(it.label as string),
        value: it.value as number,
      }));
  }
  if (data && typeof data === "object") {
    return Object.entries(data as Record<string, number>)
      .filter(([, v]) => typeof v === "number")
      .map(([k, v]) => ({ label: translateLabelToArabic(k), value: v }));
  }
  return [];
};

const getChartData = (series: ChartSeries[]) => ({
  labels: series.map((item) => item.label),
  datasets: [
    {
      data: series.map((item) => item.value),
      backgroundColor: (context: ScriptableContext<"bar">) => {
        const {
          chart: { ctx, chartArea },
          dataIndex,
        } = context;
        if (!chartArea) return "transparent";
        const gradient = ctx.createLinearGradient(
          chartArea.right,
          0,
          chartArea.left,
          0
        );
        const colorPair = GRADIENT_COLORS[dataIndex % GRADIENT_COLORS.length];
        if (colorPair) {
          gradient.addColorStop(0, colorPair[0]);
          gradient.addColorStop(1, colorPair[1]);
        }
        return gradient;
      },
      borderRadius: 10,
      barThickness: BAR_THICKNESS,
    },
  ],
});

const getChartOptions = (hasData: boolean): ChartOptions<"bar"> => ({
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
    datalabels: {
      display: hasData,
      labels: {
        text: {
          anchor: "end",
          align: "end",
          offset: -7,
          color: "#333",
          font: { weight: "bold", size: 15 },
          formatter: (_, context) =>
            context.chart.data.labels?.[context.dataIndex] ?? "",
        },
        value: {
          anchor: "start",
          align: "start",
          offset: 150,
          color: "#555",
          font: { weight: "bold", size: 14 },
          formatter: (value) => value ?? "",
        },
      },
    },
  },
  scales: { x: { display: false, reverse: true }, y: { display: false } },
  layout: { padding: { left: 200, right: 20 } },
});

// --- Component Parts ---
const ChartContainer: React.FC<{
  isLoading: boolean;
  isError: boolean;
  hasData: boolean;
  isFetched: boolean;
  children: React.ReactNode;
}> = ({ isLoading, hasData, isFetched, children }) => {
  return (
    <div className="relative w-full h-[500px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader size={8} />
        </div>
      )}
      {!isLoading && isFetched && !hasData && (
        <StatusMessage>لا توجد بيانات مطابقة</StatusMessage>
      )}
      {!isLoading && hasData && children}
    </div>
  );
};

const StatusMessage: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div
    className={`absolute inset-0 flex items-center justify-center text-secondary-fg/70 ${className}`}
  >
    {children}
  </div>
);

const FilterForm = ({ form }: { form: UseFormReturn<FilterChartsType> }) => {
  const { Area } = useGetArea();

  return (
    <form>
      <div className="flex items-center justify-between gap-2">
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
          preventRemove
        />
        <Select
          form={form}
          label="المنطقة"
          name="area"
          placeholder="المنطقة"
          choices={Area}
          showValue="title"
          preventRemove
          keyValue="title"
        />
      </div>
    </form>
  );
};

// --- Main Component ---
const MarketMonitorCard = () => {
  const form = useForm<FilterChartsType>({
    resolver: joiResolver(FilterChartsSchema),
    defaultValues: FilterChartsInitialValues,
    mode: "onChange",
  });

  const { date, area } = form.watch();

  const apiParams = useMemo(() => {
    if (!date?.value || !area?.title) return null;
    return { queryParams: { period: date.value, area: area.title } };
  }, [date, area]);

  const { marketWatcher, isLoading, isError, isFetched } =
    useMarketWatcher(apiParams);

  const displaySeries = useMemo(
    () => normalizeMarketData(marketWatcher),
    [marketWatcher]
  );
  const hasData = displaySeries.length > 0;

  const chartData = useMemo(() => getChartData(displaySeries), [displaySeries]);
  const chartOptions = useMemo(() => getChartOptions(hasData), [hasData]);

  return (
    <div
      className="h-[500px] shadow-primary-shadow bg-tertiary-bg rounded-[var(--spacing-2xl)] p-[var(--spacing-xl)] min-h-[420px] flex flex-col justify-between"
      dir="rtl"
    >
      <h2 className="text-size28 font-bold text-right mb-[var(--spacing-lg)] text-secondary-fg">
        مراقب السوق
      </h2>
      <ChartContainer
        isLoading={isLoading}
        isError={isError}
        hasData={hasData}
        isFetched={isFetched}
      >
        <Bar data={chartData} options={chartOptions} />
      </ChartContainer>
      <FilterForm form={form} />
    </div>
  );
};

export default MarketMonitorCard;
