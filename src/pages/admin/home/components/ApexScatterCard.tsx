import ReactApexChart from "react-apexcharts";
import { useMemo, useState } from "react";
import useGetBrokerHistory from "@/hooks/admin/reports/useGetBrokerHistory";
import ScatterChartSkeleton from "@/components/admin/home/ScatterChartSkeleton";
import Select from "@/components/global/form/select/Select";
import { PROPERTY_TYPE, type PropertyTypeOption } from "@/data/global/select";
import { useForm } from "react-hook-form";

function ApexScatterCard() {
  const title = "تقرير أصحاب الوكالات";
  const [selectedPropertyType] = useState("apartment");

  const { getBrokerHistoryQuery, brokerHistory } = useGetBrokerHistory();

  const filterForm = useForm<{ property_type: PropertyTypeOption | null }>({
    defaultValues: { property_type: PROPERTY_TYPE[0] },
    mode: "onChange",
  });
  const getPropertyFields = (propertyType: string) => {
    const fieldMap: Record<string, { totalPrice: string; soldCount: string }> =
      {
        apartment: {
          totalPrice: "apartments_total_price",
          soldCount: "apartments_sold",
        },
        villa: { totalPrice: "villas_total_price", soldCount: "villas_sold" },
        farm: { totalPrice: "farms_total_price", soldCount: "farms_sold" },
        store: { totalPrice: "stores_total_price", soldCount: "stores_sold" },
        land: { totalPrice: "lands_total_price", soldCount: "lands_sold" },
        building: {
          totalPrice: "buildings_total_price",
          soldCount: "buildings_sold",
        },
      };
    return (
      fieldMap[propertyType] || {
        totalPrice: "apartments_total_price",
        soldCount: "apartments_sold",
      }
    );
  };

  const brokersOnly = useMemo(() => {
    if (!brokerHistory) return [];
    const dataArray = Array.isArray(brokerHistory)
      ? brokerHistory
      : brokerHistory?.data || [];
    return dataArray.filter((user) => user.role === "broker");
  }, [brokerHistory]);

  const topBrokers = useMemo(() => {
    if (!Array.isArray(brokersOnly)) return [];
    const { totalPrice, soldCount } = getPropertyFields(selectedPropertyType);
    const validBrokers = brokersOnly.filter(
      (broker) =>
        Number(broker[totalPrice] || 0) > 0 &&
        Number(broker[soldCount] || 0) > 0
    );
    return validBrokers
      .sort((a, b) => Number(b[totalPrice]) - Number(a[totalPrice]))
      .slice(0, 10);
  }, [brokersOnly, selectedPropertyType]);

  const points = useMemo(() => {
    const { totalPrice, soldCount } = getPropertyFields(selectedPropertyType);
    return topBrokers.map((broker) => ({
      x:
        broker.agent_name ||
        broker.broker_name ||
        `${broker.first_name || ""} ${broker.last_name || ""}`.trim() ||
        "غير معروف",
      y: Number(broker[totalPrice] || 0),
      count: Number(broker[soldCount] || 0),
    }));
  }, [topBrokers, selectedPropertyType]);

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
      labels: { rotate: -25, style: { fontSize: "12px", colors: "#374151" } },
      axisBorder: { show: true, color: "#00000078" },
    },
    yaxis: {
      min: 0,
      labels: { offsetX: -1 },
      axisBorder: { show: true, color: "#00000078" },
    },
    markers: { size: 8, colors: ["#c5b48a"], strokeColors: "#c5b48a" },
    grid: {
      borderColor: "#00000078",
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    tooltip: {
      theme: "light",
      custom: ({ seriesIndex, dataPointIndex, w }) => {
        const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        return `<div style="padding:8px; text-align:right;">
          <strong>${point.x}</strong><br/>
          عدد العقارات: <b>${point.count}</b><br/>
          إجمالي المبيعات: <b>$${point.y.toLocaleString()}</b>
        </div>`;
      },
    },
    title: {
      text: title,
      align: "right",
      style: { fontWeight: "700", fontSize: "20px", color: "#000" },
    },
  };

  return (
    <div className="">
      <div className="mb-4 flex justify-end relative top-[70px] z-10 left-[50px]">
        <div className="w-[120px]">
          <Select
            form={filterForm}
            name="property_type"
            placeholder="اختر نوع العقار"
            choices={PROPERTY_TYPE}
            keyValue="value"
            showValue="label"
            addingInputStyle="!h-[40px] !text-[14px]"
            addingSelectStyle="!gap-0"
          />
        </div>
      </div>
      {getBrokerHistoryQuery.isLoading ? (
        <ScatterChartSkeleton />
      ) : (
        <div className="rounded-2xl shadow-md bg-white p-4">
          <ReactApexChart
            options={options}
            series={series}
            type="scatter"
            height={350}
          />
        </div>
      )}
    </div>
  );
}

export default ApexScatterCard;
