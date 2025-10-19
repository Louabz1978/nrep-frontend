import { useMemo, useState } from "react";
// @ts-ignore: react-apexcharts types may be missing
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import useGetTopAgent from "@/hooks/website/reports/useGetTopAgent";
import StatusManager from "@/components/global/statusManager/StatusManager";
import TopAgentSkeleton from "@/components/global/ui/SkeltonTopagentCol";
const TopAgentsColumn = () => {
  const [showPrevious, setShowPrevious] = useState(false);

  const { topAgent, getTopAgentQuery } = useGetTopAgent({
    month: showPrevious ? 8 : 9,
    year: 2025,
  });

  /** ===============================
   *   Derived Data
   *  =============================== */
  const dataset = useMemo(() => {
    const results = topAgent?.results;
    return Array.isArray(results) ? results.slice(0, 10) : [];
  }, [topAgent]);

  const categories = dataset.map((item) => item.full_name ?? "-");
  const data = dataset.map((item) => item.closed_count ?? 0);

  /** ===============================
   *   Chart Configuration
   *  =============================== */
  const baseColors = ["#B9A779", "#428177", "#988561", "#054239", "#002623"];
  const barColors = Array.from(
    { length: 10 },
    (_, i) => baseColors[i % baseColors.length]
  );

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
        borderRadius: 6,
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      tickPlacement: "on",
      labels: {
        rotate: -45,
        style: { fontSize: "12px" },
        offsetY: 4,
      },
      axisTicks: { show: true },
      axisBorder: { show: true },
    },
    yaxis: { labels: { show: true } },
    grid: { strokeDashArray: 4 },
    colors: barColors,
    legend: { show: false },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} عقار مغلق`,
      },
    },
  };

  /** ===============================
   *   Render
   *  =============================== */
  return (
    <div className="bg-tertiary-bg rounded shadow-[var(--shadow-card)] h-[425px] p-[var(--spacing-lg)] text-[var(--card)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-size20 font-semibold mb-6">
          أفضل عشرة وسطاء العقارات
        </h3>
      </div>

      {/* Content */}
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
        <div className="flex ">
          <div className="flex flex-col items-start justify-end mb-14 ">
            <label className="flex items-center gap-2 text-size10 w-fit cursor-pointer select-none">
              <input
                type="radio"
                checked={showPrevious}
                onChange={() => setShowPrevious((prev) => !prev)}
                className="cursor-pointer accent-[var(--primary)]"
              />
              الشهر الحالي
            </label>
            <label className="flex items-center gap-2 text-size10 w-fit cursor-pointer select-none">
              <input
                type="radio"
                checked={showPrevious}
                onChange={() => setShowPrevious((prev) => !prev)}
                className="cursor-pointer accent-[var(--primary)]"
              />
              الشهر السابق
            </label>
          </div>
          <div className="flex-1">
            <ReactApexChart
              options={options}
              series={[{ name: "عدد العقارات المغلقة", data }]}
              type="bar"
              height={320}
            />
          </div>
        </div>
      </StatusManager>
    </div>
  );
};

export default TopAgentsColumn;
