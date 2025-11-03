import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { BrokerHistoryReport } from "@/types/admin/reports";
import { Input } from "@/components/global/ui/input";
import useGetBrokerHistory from "@/hooks/admin/reports/useGetBrokerHistory";
import { useForm, useWatch } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Select from "@/components/global/form/select/Select";
import {
  brokerHistoryReportFormSchema,
  brokerHistoryReportInitialValues,
  type BrokerHistoryReportFormType,
} from "@/data/admin/schema/BrokerHistoryReportSchema";
import { useLocation, useNavigate } from "react-router-dom";

type RawBrokerHistory = {
  agent_id: number;
  agent_name: string;
  license_number: string | null;
  role: string;
  apartments_sold: number;
  apartments_total_price: number;
  buildings_sold: number;
  buildings_total_price: number;
  farms_sold: number;
  farms_total_price: number;
  lands_sold: number;
  lands_total_price: number;
  stores_sold: number;
  stores_total_price: number;
  villas_sold: number;
  villas_total_price: number;
  total_properties_sold: number;
  total_sales_amount: number;
  [key: string]: any;
};

const BrokerHistory = () => {
  const { brokerHistory, brokerHistoryQuery } = useGetBrokerHistory();

  const [activeTab, setActiveTab] = useState("apartments");

  const TABS = [
    { key: "properties", label: "عقارات" },
    { key: "buildings", label: "مباني" },
    { key: "lands", label: "أراضي" },
    { key: "farms", label: "مزارع" },
    { key: "shops", label: "محلات" },
    { key: "villas", label: "فيلات" },
    { key: "apartments", label: "شقق" },
  ];

  const keyMap: {
    [tabKey: string]: { sales: keyof RawBrokerHistory; total: keyof RawBrokerHistory };
  } = useMemo(
    () => ({
      properties: {
        sales: "total_properties_sold",
        total: "total_sales_amount",
      },
      buildings: {
        sales: "buildings_sold",
        total: "buildings_total_price",
      },
      lands: { sales: "lands_sold", total: "lands_total_price" },
      farms: { sales: "farms_sold", total: "farms_total_price" },
      shops: { sales: "stores_sold", total: "stores_total_price" },
      villas: { sales: "villas_sold", total: "villas_total_price" },
      apartments: {
        sales: "apartments_sold",
        total: "apartments_total_price",
      },
    }),
    []
  );

  const filteredData: BrokerHistoryReport[] = useMemo(() => {
    if (!Array.isArray(brokerHistory)) return [];

    const currentKeys = keyMap[activeTab];
    if (!currentKeys) return [];
    return (brokerHistory as RawBrokerHistory[])
      .filter((user) => user.role === "broker")
      .map((broker) => ({
        broker_id: broker.agent_id,
        broker_name: broker.agent_name,
        license_number: broker.license_number ?? "",
        action_type: "",
        action_date: "",
        number_of_sales: Number(broker[currentKeys.sales] ?? 0),
        total_sales: Number(broker[currentKeys.total] ?? 0),
      }));
  }, [brokerHistory, activeTab, keyMap]); 

  // keep original query for loading/error, pass transformed data separately

  const columns: ColumnDef<BrokerHistoryReport>[] = useMemo(
    () => [
      {
        accessorKey: "broker_id",
        header: "معرف الوسيط",
        size: 20,
      },
      {
        accessorKey: "broker_name",
        header: "اسم الوسيط",
        size: 20,
      },
      {
        accessorKey: "license_number",
        header: "رقم الرخصة",
        size: 15,
      },
      {
        accessorKey: "number_of_sales",
        header: "عدد المبيعات",
        size: 15,
      },
      {
        accessorKey: "total_sales",
        header: "إجمالي المبيعات",
        size: 15,
      },
    ],
    []
  );

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="mb-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-size24 sm:text-size30 font-medium mb-md sm:mb-xl text-center sm:text-right">
              تقرير تاريخ الوسطاء العقاريين
            </h1>
            <div>
              <Input
                placeholder="ابحث عن اسم الوسيط أو رقم الرخصة أو نوع العملية"
                type="search"
                variant="white"
                iconClassName="text-gray-400/50 h-[18px] w-[18px] "
                className="w-90 bg-white !h-2lg !text-size16 !border-gray-400 !rounded-[10px] placeholder:text-xs leading-tight py-sm px-md !text-sm "
              />
            </div>
          </div>
          <hr className="mt-2" />
          {/* Filters: From/To month & year */}
          <BrokerHistoryFilters />
        </div>
        {/* Tabs */}
        <div
          className="flex gap-5xl items-center justify-center my-5xl"
          style={{ direction: "ltr" }}
        >
          <div className="flex overflow-auto gap-5xl">
            {TABS.map((tab) => (
              <div className="flex items-center justify-center" key={tab.key}>
                <button
                  className={`flex items-center justify-around gap-3 px-6xl py-3 rounded-full font-medium cursor-pointer ${
                    activeTab === tab.key
                      ? "bg-golden-medium text-layout-bg"
                      : "bg-layout-bg text-tertiary-bg"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <div>{tab.label}</div>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <DataTable
            report={true}
            prefix={TABLE_PREFIXES.broker_history}
            columns={columns}
            query={brokerHistoryQuery}
            data={filteredData}
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default BrokerHistory;

// --- Filters subcomponent ---
function BrokerHistoryFilters() {
  const monthsChoices = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1),
    label: `الشهر: ${i + 1}`,
  }));
  const now = new Date();
  const baseYear = now.getFullYear();
  const yearsChoices = [baseYear - 1, baseYear].map((y) => ({
    value: String(y),
    label: `السنة: ${y}`,
  }));

  const form = useForm<BrokerHistoryReportFormType>({
    resolver: joiResolver(brokerHistoryReportFormSchema),
    defaultValues: brokerHistoryReportInitialValues,
    mode: "onChange",
  });

  const fromYear = useWatch({ control: form.control, name: "from_year" });
  const toYear = useWatch({ control: form.control, name: "to_year" });
  const currentMonth = now.getMonth() + 1;
  const isCurrent = (y?: string) => y === String(baseYear);
  const filterMonths = (y?: string) =>
    isCurrent(y)
      ? monthsChoices.filter((m) => Number(m.value) <= currentMonth)
      : monthsChoices;

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (values: BrokerHistoryReportFormType) => {
    const params = new URLSearchParams();
    const prefix = `${TABLE_PREFIXES.broker_history}_`;
    if (values.from_month?.value)
      params.set(`${prefix}from_month`, String(values.from_month.value));
    if (values.from_year?.value)
      params.set(`${prefix}from_year`, String(values.from_year.value));
    if (values.to_month?.value)
      params.set(`${prefix}to_month`, String(values.to_month.value));
    if (values.to_year?.value)
      params.set(`${prefix}to_year`, String(values.to_year.value));

    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <form
      className="mt-lg bg-white p-md rounded-md flex flex-col gap-md"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
        <div className="flex flex-col gap-sm">
          <p className="font-medium">البحث من :</p>
          <div className="flex gap-sm">
            <Select
              form={form}
              name="from_month"
              placeholder="الشهر"
              choices={filterMonths(fromYear?.value)}
              showValue="label"
              keyValue="value"
              addingSelectStyle="min-w-[140px]"
              addingInputStyle="!h-9 !py-0 !px-2 bg-white border border-gray-300 rounded-xl"
            />
            <Select
              form={form}
              name="from_year"
              placeholder="السنة"
              choices={yearsChoices}
              showValue="label"
              keyValue="value"
              addingSelectStyle="min-w-[140px]"
              addingInputStyle="!h-9 !py-0 !px-2 bg-white border border-gray-300 rounded-xl"
            />
          </div>
        </div>
        <div className="flex flex-col gap-sm">
          <p className="font-medium">إلى :</p>
          <div className="flex gap-sm">
            <Select
              form={form}
              name="to_month"
              placeholder="الشهر"
              choices={filterMonths(toYear?.value)}
              showValue="label"
              keyValue="value"
              addingSelectStyle="min-w-[140px]"
              addingInputStyle="!h-9 !py-0 !px-2 bg-white border border-gray-300 rounded-xl"
            />
            <Select
              form={form}
              name="to_year"
              placeholder="السنة"
              choices={yearsChoices}
              showValue="label"
              keyValue="value"
              addingSelectStyle="min-w-[140px]"
              addingInputStyle="!h-9 !py-0 !px-2 bg-white border border-gray-300 rounded-xl"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-lg py-sm rounded-md bg-primary text-white">
          تطبيق
        </button>
      </div>
    </form>
  );
}
