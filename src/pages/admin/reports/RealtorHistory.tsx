import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { RealtorHistoryReport } from "@/types/admin/reports";
import { Input } from "@/components/global/ui/input";
import useGetRealtorHistory from "@/hooks/admin/reports/useGetRealtorHistory";

const RealtorHistory = () => {
  const { realtorHistory, getRealtorHistoryQuery } = useGetRealtorHistory();

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
              <div className="flex items-center justify-center">
                <button
                  key={tab.key}
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
            data={realtorHistory ?? []}
            query={getRealtorHistoryQuery}
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default RealtorHistory;
