import ReactApexChart from "react-apexcharts";
import { useMemo } from "react";
import useGetBrokerHistory from "@/hooks/admin/reports/useGetBrokerHistory";
import ScatterChartSkeleton from "@/components/admin/home/ScatterChartSkeleton";

function ApexScatterCard() {
  const title = "تقرير أصحاب الوكالات";

  const { getBrokerHistoryQuery, brokerHistory } = useGetBrokerHistory();

  const brokersOnly = useMemo(() => {
    if (!brokerHistory) return [];
    const dataArray = Array.isArray(brokerHistory)
      ? brokerHistory
      : (brokerHistory as any)?.data?.data ||
        (brokerHistory as any)?.data ||
        [];
    return dataArray.filter((user: any) => user.role === "broker");
  }, [brokerHistory]);

  const points = useMemo(() => {
    if (!Array.isArray(brokersOnly)) return [];
    return brokersOnly.slice(-10).map((broker: any) => ({
      x: String(
        broker.agent_name ||
          broker.broker_name ||
          `${broker.first_name || ""} ${broker.last_name || ""}`.trim() ||
          "غير معروف"
      ),
      y: Number(broker.total_sales_amount || broker.total_sales || 0),
    }));
  }, [brokersOnly]);

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
      labels: { offsetX: -10 },
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
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
      show: true,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => `$${val.toLocaleString()}` },
    },
    title: {
      text: title,
      align: "center",
      style: { fontWeight: "700", fontSize: "20px",color:"#000" },
    },
  };

  if (getBrokerHistoryQuery.isLoading) {
    return <ScatterChartSkeleton />;
  }

  return (
    <div className="rounded-2xl shadow-md bg-white p-6">
      <ReactApexChart
        options={options}
        series={series}
        type="scatter"
        height={350}
      />
    </div>
  );
}

export default ApexScatterCard;
