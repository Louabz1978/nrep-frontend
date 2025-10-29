import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { RealtorHistoryReport } from "@/types/admin/reports";
import { Input } from "@/components/global/ui/input";
import useGetRealtorHistory from "@/hooks/admin/reports/useGetRealtorHistory";

// Define a type for the raw API response based on your example
type RawRealtorHistory = {
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

const RealtorHistory = () => {
  // 1. Get the original data and query object from the hook
  const { realtorHistory, getRealtorHistoryQuery } =
    useGetRealtorHistory<RawRealtorHistory[]>();

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

  // 2. Map tab keys to the corresponding keys in your API response
  const keyMap: {
    [tabKey: string]: { sales: keyof RawRealtorHistory; total: keyof RawRealtorHistory };
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

  // 3. Create the dynamically filtered and mapped data
  const filteredData: RealtorHistoryReport[] = useMemo(() => {
    if (!realtorHistory) return [];

    const currentKeys = keyMap[activeTab];
    if (!currentKeys) return [];

    return realtorHistory
      .filter((user) => user.role === "realtor")
      .map((realtor) => ({
        realtor_id: realtor.agent_id,
        realtor_name: realtor.agent_name,
        license_number: realtor.license_number,
        // Assign sales/total based on the active tab
        number_of_sales: realtor[currentKeys.sales] ?? 0,
        total_sales: realtor[currentKeys.total] ?? 0,
      }));
  }, [realtorHistory, activeTab, keyMap]); // Re-run when data or tab changes

  // --- NEW (THE CRITICAL FIX) ---
  // 4. Create a new "query" object that injects our filtered data
  // This ensures the DataTable uses our transformed data, not the raw data
  const modifiedQuery = useMemo(() => {
    return {
      ...getRealtorHistoryQuery, // Spread all original query properties (isLoading, etc.)
      data: filteredData, // OVERWRITE the 'data' property with our filtered data
    };
  }, [getRealtorHistoryQuery, filteredData]);
  // --- END OF FIX ---

  // Columns definition (no change needed)
  const columns: ColumnDef<RealtorHistoryReport>[] = useMemo(
    () => [
      {
        accessorKey: "realtor_id",
        header: "معرف الوسيط",
        size: 20,
      },
      {
        accessorKey: "realtor_name",
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
            prefix={TABLE_PREFIXES.realtor_history}
            columns={columns}
            // 5. Pass the MODIFIED query object
            query={modifiedQuery}
            // The 'data' prop is no longer needed, as 'query.data' is used
            data={filteredData} // <-- This can be removed
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default RealtorHistory;
