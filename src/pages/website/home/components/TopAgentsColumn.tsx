import { useMemo, useState } from "react";
// @ts-ignore: react-apexcharts types may be missing in this setup
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import useGetTopAgent from "@/hooks/website/reports/useGetTopAgent";
import Loader from "@/components/global/loader/Loader";

const TopAgentsColumn = () => {
  const { topAgent, getTopAgentQuery } = useGetTopAgent({
    month: "9",
    year: "2025",
  });
  const [showPrevious, setShowPrevious] = useState(false);

  const dataset = useMemo(() => {
    if (!topAgent) return [];
    const source = showPrevious ? topAgent.previous_results : topAgent.results;
    return Array.isArray(source) ? source.slice(0, 10) : [];
  }, [topAgent, showPrevious]);

  const categories = dataset.map((name) => name.full_name ?? "-");
  const data = dataset.map((r) => r.closed_count ?? 0);

  const barColors = [
    "#428177",
    "#000000c8",
    "#B9A779",
    "#6B1F2A",
    "#B9A779",
    "#428177",
    "#A9A18E",
    "#6CA69C",
    "#B9A779",
    "#428177",
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
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
    xaxis: { categories, labels: { rotate: -45  } },
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

  return (
    <div className="bg-tertiary-bg rounded shadow-[var(--shadow-card)] min-h-[420px] p-[var(--spacing-lg)] text-[var(--card)]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-size20 font-semibold">أفضل عشرة وسطاء العقارات</h3>
        {/* ✅ Checkbox toggle */}
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={showPrevious}
            onChange={() => setShowPrevious((prev) => !prev)}
          />
          عرض بيانات الشهر السابق
        </label>
      </div>

      {getTopAgentQuery.isLoading ? (
        <div className="flex items-center justify-center min-h-[320px]">
          <Loader size="lg" color="primary" />
        </div>
      ) : dataset.length > 0 ? (
        <ReactApexChart
          options={options}
          series={[{ name: "عدد العقارات المغلقة", data }]}
          type="bar"
          height={320}
        />
      ) : (
        <div className="text-center text-gray-400 mt-20">
          لا توجد بيانات متاحة
        </div>
      )}
    </div>
  );
};

export default TopAgentsColumn;
