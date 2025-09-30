// Standalone MarketStatusPie component for HomeReports and other uses
import { useMemo } from "react";
// @ts-ignore: react-apexcharts types may be missing in this setup
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import useMarketWatcher from "@/hooks/website/listing/useMarketWatcher";

const MarketStatusPie = () => {
  const { marketWatcher } = useMarketWatcher({ queryParams: { period: "1 month", area: "الانشاءات" } });

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

  const options: ApexOptions = {
    chart: { type: "pie" },
    legend: { position: "left", labels: { colors: undefined } },
    labels: labels,
    colors: ["#428177", 
      "#000000c8", 
      "#B9A779", 
      "#6B1F2A",]
  };

  return (
    <div className="bg-tertiary-bg rounded shadow-[var(--shadow-card)] min-h-[420px] text-[var(--card)] p-3">
      <h3 className=" text-size20 font-semibold mb-3">مراقب السوق</h3>
      <ReactApexChart options={options} series={values} type="pie" height={320} />
    </div>
  );
};

export default MarketStatusPie;
