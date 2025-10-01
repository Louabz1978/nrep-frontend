import { useMemo, useState } from "react";
// @ts-ignore: react-apexcharts types may be missing in this setup
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import useGetTopAgent from "@/hooks/website/reports/useGetTopAgent";
import { Skeleton } from "@/components/global/ui/skeleton";

const TopAgentsColumn = () => {
  const [showPrevious, setShowPrevious] = useState(false);
  const { topAgent, getTopAgentQuery } = useGetTopAgent({
    month: showPrevious ? 8 : 9,
    year: 2025,
  });

  const dataset = useMemo(() => {
    if (!topAgent || !topAgent.results) return [];
    const source = topAgent.results; 
    return Array.isArray(source) ? source.slice(0, 10) : [];
  }, [topAgent]);

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
    xaxis: {
      categories,
      tickPlacement: "on",
      labels: {
        rotate: -45,
        trim: true,
        hideOverlappingLabels: false,
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

  return (
    <div className="bg-tertiary-bg rounded shadow-[var(--shadow-card)] h-[425px] p-[var(--spacing-lg)] text-[var(--card)]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-size20 font-semibold mb-6">أفضل عشرة وسطاء العقارات</h3>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={showPrevious}
            onChange={() => setShowPrevious((prev) => !prev)}
          />
          عرض بيانات الشهر السابق
        </label>
      </div>
      {(getTopAgentQuery.isLoading || getTopAgentQuery.isFetching) ? (
        <div className="space-y-4">
          <div className="h-[300px] w-full flex items-end gap-3">
            <div className="flex-1 h-full flex items-end justify-between gap-2">
              {[20, 100, 30, 90, 40, 80, 50, 70, 60, 10].map((h, idx) => (
                <Skeleton
                  key={idx}
                  className={`w-16 ${idx >= 5 ? "hidden lg:block" : ""}`} // Show only 5 bars on mobile, all 10 on lg+
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="h-full flex flex-col justify-between py-3 mx-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-10" />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pl-19">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton
                key={i}
                className={`h-4 w-16 ${i >= 5 ? "hidden lg:block" : ""}`} // Show only 5 labels on mobile, all 10 on lg+
              />
            ))}
          </div>
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