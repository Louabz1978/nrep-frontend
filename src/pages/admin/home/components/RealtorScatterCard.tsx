import ReactApexChart from "react-apexcharts";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import useGetRealtorHistory from "@/hooks/admin/reports/useGetRealtorHistory";
import ScatterChartSkeleton from "@/components/admin/home/ScatterChartSkeleton";
import Select from "@/components/global/form/select/Select";
import type { PropertyTypeOption } from "@/data/global/select";
import { PROPERTY_TYPE } from "@/data/global/select";

function RealtorScatterCard() {
  const title = "تقرير الوسطاء العقاريين";

  const filterForm = useForm<{ property_type: PropertyTypeOption | null }>({
    defaultValues: { property_type: PROPERTY_TYPE[0] },
    mode: "onChange",
  });

  const selectedPropertyType =
    filterForm.watch("property_type")?.value ?? "apartment";

  const { getRealtorHistoryQuery, realtorHistory } = useGetRealtorHistory();

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

  const realtorsOnly = useMemo(() => {
    if (!realtorHistory) return [];
    const dataArray = Array.isArray(realtorHistory)
      ? realtorHistory
      : (realtorHistory as any)?.data?.data ||
        (realtorHistory as any)?.data ||
        [];
    return dataArray.filter((user) => user.role === "realtor");
  }, [realtorHistory]);

  const filteredRealtors = useMemo(() => {
    if (!Array.isArray(realtorsOnly)) return [];
    const { totalPrice } = getPropertyFields(selectedPropertyType);

    return realtorsOnly
      .filter((realtor) => Number(realtor[totalPrice] || 0) > 0)
      .sort((a, b) => Number(b[totalPrice] || 0) - Number(a[totalPrice] || 0))
      .slice(0, 10);
  }, [realtorsOnly, selectedPropertyType]);

  const points = useMemo(() => {
    const { totalPrice, soldCount } = getPropertyFields(selectedPropertyType);
    return filteredRealtors.map((realtor) => ({
      x:
        realtor.agent_name ||
        realtor.realtor_name ||
        `${realtor.first_name || ""} ${realtor.last_name || ""}`.trim() ||
        "غير معروف",
      y: Number(realtor[totalPrice] || 0),
      count: Number(realtor[soldCount] || 0),
    }));
  }, [filteredRealtors, selectedPropertyType]);

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
      <div className="mb-4 flex justify-end relative top-[70px] z-10 left-[80px]">
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

      {getRealtorHistoryQuery.isLoading ? (
        <ScatterChartSkeleton />
      ) : (
        <div className="rounded-2xl shadow-md bg-white p-6">
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

export default RealtorScatterCard;
