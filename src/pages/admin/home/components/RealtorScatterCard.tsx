import ReactApexChart from "react-apexcharts";
import { useMemo } from "react";
import useGetRealtorHistory from "@/hooks/admin/reports/useGetRealtorHistory";
import ScatterChartSkeleton from "@/components/admin/home/ScatterChartSkeleton";

function RealtorScatterCard() {
  const title = "تقرير الوسطاء العقاريين";

  const { getRealtorHistoryQuery, realtorHistory } = useGetRealtorHistory();

  const realtorsOnly = useMemo(() => {
    if (!realtorHistory) return [];
    const dataArray = Array.isArray(realtorHistory)
      ? realtorHistory
      : (realtorHistory as any)?.data?.data ||
        (realtorHistory as any)?.data ||
        [];
    return dataArray.filter((user: any) => user.role === "realtor");
  }, [realtorHistory]);

  const points = useMemo(() => {
    if (!Array.isArray(realtorsOnly)) return [];
    return realtorsOnly.slice(-10).map((realtor) => ({
      x: String(
        realtor.agent_name ||
          realtor.realtor_name ||
          `${realtor.first_name || ""} ${realtor.last_name || ""}`.trim() ||
          "غير معروف"
      ),
      y: Number(realtor.number_of_sales || realtor.total_properties_sold || 0),
    }));
  }, [realtorsOnly]);

  const series = [{ name: title, data: points }];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "scatter",
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: "#6b7280",
      background: "#fff",
    },
    xaxis: {
      type: "category",
      min: 0,
      labels: {
        rotate: -25,
        style: { fontSize: "12px", colors: "#374151" },
        offsetY: 4,
        offsetX: -10,
        maxHeight: 64,
      },
      axisBorder: { show: true, color: "#00000078", height: 1, offsetY: 1 },
      axisTicks: { show: false },
    },
    yaxis: {
      min: 0,
      tickAmount: 6,
      labels: {
        offsetX: -10,
      },
      axisBorder: { show: true, color: "#00000078", width: 1, offsetX: -3 },
      axisTicks: { show: false },
    },
    markers: {
      size: 8,
      colors: ["#c5b48a"],
      strokeColors: "#c5b48a",
      offsetX: -30,
    },
    grid: {
      borderColor: "#00000078",
      position: "back",
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      show: true,
      xaxis: {
        lines: { show: true },
      },
      yaxis: {
        lines: { show: true },
      },
    },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => `${val}` },
    },
    title: {
      text: "تقرير الوسطاء العقاريين",
      align: "center",
      style: { fontWeight: "700", fontSize: "20px", color: "#000" },
    },
  };

  if (getRealtorHistoryQuery.isLoading) {
    return <ScatterChartSkeleton />;
  }

  return (
    <div className="rounded-2xl shadow-md bg-white  p-6">
      <ReactApexChart
        options={options}
        series={series}
        type="scatter"
        height={350}
      />
    </div>
  );
}

export default RealtorScatterCard;
