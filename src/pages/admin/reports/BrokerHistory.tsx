import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { BrokerHistoryReport } from "@/types/admin/reports";
import { Input } from "@/components/global/ui/input";
import useGetBrokerHistory from "@/hooks/admin/reports/useGetBrokerHistory";

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
  const { brokerHistory, brokerHistoryQuery } =
    useGetBrokerHistory<RawBrokerHistory[]>();

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
    if (!brokerHistory) return [];

    const currentKeys = keyMap[activeTab];
    if (!currentKeys) return [];
    console.log(brokerHistory)
    return brokerHistory
      .filter((user) => user.role === "broker")
      .map((broker) => ({
        broker_id: broker.agent_id,
        broker_name: broker.agent_name,
        license_number: broker.license_number,
        number_of_sales: broker[currentKeys.sales] ?? 0,
        total_sales: broker[currentKeys.total] ?? 0,
      }));
  }, [brokerHistory, activeTab, keyMap]); 

  const modifiedQuery = useMemo(() => {
    return {
      ...brokerHistoryQuery, 
      data: filteredData, 
    };
  }, [brokerHistoryQuery, filteredData]);

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
            // 5. Pass the MODIFIED query object
            query={modifiedQuery}
            data={filteredData}
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default BrokerHistory;
