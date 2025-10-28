import ReactApexChart from "react-apexcharts";

type ScatterPoint = { x: string | number; y: number };

function RealtorScatterCard() {
  const title = "تقرير تاريخ الوكلاء العقاريين";
  const points: ScatterPoint[] = [
    { x: "العام السادس", y: 90 },
    { x: "العام الخامس", y: 76 },
    { x: "العام الرابع", y: 58 },
    { x: "العام الثالث", y: 45 },
    { x: "العام الثاني", y: 28 },
    { x: "العام الحالي", y: 12 },
  ];

  const series = [
    {
      name: title,
      data: points,
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "scatter",
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: "#6b7280",
    },
    xaxis: { tickAmount: 6, labels: { rotate: 0 } },
    yaxis: { min: 0, max: 100, tickAmount: 5 },
    markers: { size: 8, colors: ["#c5b48a"], strokeColors: "#c5b48a" },
    grid: { borderColor: "#e5e7eb" },
    tooltip: { theme: "light", y: { formatter: (val) => `${val}` } },
    noData: { text: "لا توجد بيانات" },
    legend: { show: false },
    title: { text: title, align: "right", style: { fontWeight: 700, color: "#111827",fontSize:20 } },
  };

  return (
    <div className="rounded-2xl shadow-md bg-white p-4 ">
      <div className=" rounded-xl">
        <ReactApexChart options={options} series={series} type="scatter" height={300} />
      </div>
    </div>
  );
}

export default RealtorScatterCard;


