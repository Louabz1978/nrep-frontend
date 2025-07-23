import Chart from "react-apexcharts";

const MarketMonitorCard = () => {
  const chartData = [
    { label: "اعلان جديد", value: 500, color: "#b0e3b4" },
    { label: "العودة الى السوق", value: 180, color: "#f8cd52" },
    { label: "تغير السعر", value: 270, color: "#6caee0" },
    { label: "نشط بموجب عقد", value: 450, color: "#c9e5f8" },
    { label: "معلق", value: 340, color: "#aad1f1" },
    { label: "منتهي الصلاحية", value: 60, color: "#f9a46c" },
    { label: "مسحوب", value: 150, color: "#e3e3e3" },
    { label: "ملغي", value: 425, color: "#e67a7a" },
  ];

  const series = [
    {
      name: "القيمة",
      data: chartData.map((item) => item.value),
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 300,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "80%",
        borderRadius: 6,
        distributed: true,
        dataLabels: {
          position: "left",
        },
      },
    },
    colors: chartData.map((item) => item.color),
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return val;
      },
      textAnchor: "start",
      offsetX: 0,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        colors: ["#000"],
      },
    },
    xaxis: {
      categories: chartData.map((item) => item.label),
      labels: {
        show: true,
      },
      axisBorder: { show: true },
      axisTicks: { show: true },
    },
    yaxis: {
      labels: {
        show: false,
        align: "right",
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: "#333",
          left:"100px",
          
        },
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  };

  return (
    <div className="bg-white rounded-[var(--spacing-2xl)] shadow p-[var(--spacing-lg)] min-h-[300px] flex flex-col ">
      <h2 className="text-[24px] font-semibold text-right  text-black">
        مراقب السوق
      </h2>
      <div dir="rtl">
        <Chart options={options} series={series} type="bar" height={300} />
      </div>
    </div>
  );
};

export default MarketMonitorCard;
