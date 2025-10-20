import { useMemo, useState } from "react";
// @ts-ignore: react-apexcharts types may be missing
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import useGetTopAgent from "@/hooks/website/reports/useGetTopAgent";
import StatusManager from "@/components/global/statusManager/StatusManager";
import TopAgentSkeleton from "@/components/global/ui/SkeltonTopagentCol";
import { Radio } from "@/components/global/ui/radio";
import type { TopAgentReport } from "@/types/website/reports";

const TopAgentsColumn = () => {
  const [period, setPeriod] = useState<"current" | "previous">("current");

  const month = "9";
  const year = "2025";
  const { topAgent, getTopAgentQuery } = useGetTopAgent({
    month,
    year,
  });

  type TopAgentResponse = {
    results?: TopAgentReport[];
    previous_results?: TopAgentReport[];
  };

  const response = topAgent as Partial<TopAgentResponse> | undefined;

  const dataset = useMemo(() => {
    const currentResults: TopAgentReport[] = Array.isArray(response?.results)
      ? response.results.slice(0, 10)
      : [];

    const previousResults: TopAgentReport[] = Array.isArray(
      response?.previous_results
    )
      ? response.previous_results.slice(0, 10)
      : [];

    return period === "current" ? currentResults : previousResults;
  }, [period, response?.results, response?.previous_results]);

  const categories = useMemo(() => {
    const actualCategories = dataset.map((item) => item.full_name ?? "-");

    // If we have less than 10 items, fill the rest with placeholder labels
    if (actualCategories.length < 10) {
      return [
        ...actualCategories,
        ...Array(10 - actualCategories.length).fill("-"),
      ];
    }

    return actualCategories.slice(0, 10); // Ensure exactly 10 items
  }, [dataset]);

  const data = useMemo(() => {
    const actualData = dataset.map((item) => item.closed_count ?? 0);

    // If we have less than 10 items, fill the rest with zeros
    if (actualData.length < 10) {
      return [...actualData, ...Array(10 - actualData.length).fill(0)];
    }

    return actualData.slice(0, 10); // Ensure exactly 10 items
  }, [dataset]);

  const baseColors = ["#B9A779", "#428177", "#988561", "#054239", "#002623"];

  const barColors = Array.from({ length: 10 }).map((_, idx) => {
    if (idx < 5) return baseColors[idx];
    const repeatCount = idx - 4;
    return baseColors
      .slice(0, repeatCount)
      .reduce((prev, curr) => prev + curr, baseColors[0]);
  });

  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "inherit",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 0,
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      tickPlacement: "on",
      labels: { rotate: -45, style: { fontSize: "12px" }, offsetY: 4 },
      axisTicks: { show: true, color: "#333333" },
      axisBorder: { show: true, color: "#000000" },
    },
    yaxis: {
      labels: { show: true },
      axisBorder: { show: true, color: "#000000" },
    },
    grid: { show: false },
    colors: barColors,
    legend: { show: false },
    tooltip: { y: { formatter: (val: number) => `${val} عقار مغلق` } },
  };

  return (
    <div className="bg-tertiary-bg rounded shadow-[var(--shadow-card)] md:h-[425px] h-max p-[var(--spacing-lg)] text-[var(--card)]">
      <div className="flex items-center justify-center mb-3">
        <h3 className="text-size20 text-center font-semibold mb-6">
          أفضل عشرة وسطاء العقارات
        </h3>
      </div>

      <div className="flex md:flex-row flex-col">
        <div
          className={`flex flex-col items-start justify-end ${
            getTopAgentQuery.isLoading ? "mb-37 me-5" : "mb-15"
          }`}
        >
          <div className="flex flex-col items-center gap-4 sm:gap-10 w-full sm:w-auto justify-center">
            <Radio
              name="period"
              value="current"
              label="الشهر الحالي"
              checked={period === "current"}
              onChange={() => setPeriod("current")}
              ariaLabel="الشهر الحالي"
              className="!gap-0"
              labelClassName="!text-size12 w-[85px]"
              radioClassName="!bg-quinary-bg peer-checked:!bg-primary after:!bg-tertiary-bg"
            />
            <Radio
              name="period"
              value="previous"
              label="الشهر السابق"
              checked={period === "previous"}
              onChange={() => setPeriod("previous")}
              ariaLabel="الشهر السابق"
              className="!gap-0"
              labelClassName="!text-size12  w-[85px]"
              radioClassName="!bg-quinary-bg peer-checked:!bg-primary after:!bg-tertiary-bg"
            />
          </div>
        </div>

        {/* Chart content */}
        <div className="flex-1">
          <StatusManager
            query={getTopAgentQuery}
            Loader={TopAgentSkeleton}
            isEmpty={!dataset || dataset.length === 0}
            emptyContent={
              <div className="text-center text-gray-400 mt-20">
                لا توجد بيانات متاحة
              </div>
            }
          >
            <div className="flex-1">
              <ReactApexChart
                key={period}
                options={options}
                series={[{ name: "عدد العقارات المغلقة", data }]}
                type="bar"
                height={320}
              />
            </div>
          </StatusManager>
        </div>
      </div>
    </div>
  );
};

export default TopAgentsColumn;