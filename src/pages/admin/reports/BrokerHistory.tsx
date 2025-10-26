import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo, useState, useRef, useEffect } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { BrokerHistoryReport } from "@/types/admin/reports";
import useGetBrokerHistory from "@/hooks/admin/reports/useGetBrokerHistory";
import { Button } from "@/components/global/form/button/Button";
import { ListFilterPlus } from "lucide-react";
import { MONTHS } from "@/data/global/months";
import Select from "@/components/global/form/select/Select";
import { useForm } from "react-hook-form";

const TABS = [
  { key: "عقارات", label: "عقارات" },
  { key: "مباني", label: "مباني" },
  { key: "أراضي", label: "أراضي" },
  { key: "محلات", label: "محلات" },
  { key: "مزارع", label: "مزارع" },
  { key: "فيلات", label: "فيلات" },
  { key: "شقق", label: "شقق" },
];

const BrokerHistory = () => {
  const { brokerHistory } = useGetBrokerHistory();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("شقق");
  const [filterData, setFilterData] = useState({
    fromMonth: "",
    fromYear: "",
    toMonth: "",
    toYear: "",
  });
  const filterRef = useRef<HTMLDivElement>(null);
  const form = useForm();

  const currentYear = new Date().getFullYear();
  const years = [
    { value: currentYear.toString(), label: currentYear.toString() },
  ];

  const handleFilterChange = (field: string, value: string) => {
    setFilterData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const applyFilter = () => {
    console.log("Applying filter:", filterData);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  const columns: ColumnDef<BrokerHistoryReport>[] = useMemo(
    () => [
      {
        accessorKey: "broker_id",
        header: "معرف الوسيط",
        size: 20,
      },
      {
        accessorKey: "license_number",
        header: "رقم الرخصة",
        size: 15,
      },
      {
        accessorKey: "broker_name",
        header: "اسم الوسيط",
        size: 25,
      },
      {
        accessorKey: "total_sales",
        header: "عدد المباع",
        size: 15,
        cell: ({ getValue }) => {
          const value = getValue() as number;
          return value?.toLocaleString() || "0";
        },
      },
      {
        accessorKey: "total_revenue",
        header: "إجمالي المباع",
        size: 20,
        cell: ({ getValue }) => {
          const value = getValue() as number;
          return value?.toLocaleString() || "0";
        },
      },
    ],
    []
  );

  return (
    <AnimateContainer>
      <PageContainer>
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-end sm:justify-between border-b-1 pb-2 gap-4">
            <h1 className="text-size24 sm:text-size30 font-medium text-center sm:text-right">
              تقرير تاريخ الوسطاء العقاريين
            </h1>

            <div className="flex items-end gap-4 relative" ref={filterRef}>
              <Button
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className="!rounded-md !text-primary-fg bg-white !h-9 !text-[14px] flex items-center gap-y-xs px-4 py-2 border border-transparent "
              >
                <p className="font-medium text-[14px]">الفلتر</p>
                <ListFilterPlus className="size-4 ml-1" />
              </Button>

              {isFilterOpen && (
                <div className="absolute top-13 left-100 w-52 h-76 px-6 py-2 bg-white border border-gray-300 rounded shadow-md z-50 text-[14px] space-y-2">
                  <div>
                    <span className="font-medium text-gray-700 text-right block ">
                      البحث من :
                    </span>
                    <Select
                      form={form}
                      name="fromMonth"
                      label="الشهر"
                      placeholder="اختر الشهر"
                      choices={MONTHS}
                      keyValue="value"
                      showValue="label"
                      addingInputStyle="!h-8 !text-[12px]"
                      labelStyle="!text-[12px]"
                      onChange={(value: string) =>
                        handleFilterChange("fromMonth", value)
                      }
                    />
                    <Select
                      form={form}
                      name="fromYear"
                      label="السنة"
                      placeholder="اختر السنة"
                      choices={years}
                      keyValue="value"
                      showValue="label"
                      addingInputStyle="!h-8 !text-[12px]"
                      labelStyle="!text-[12px] mt-1"
                      onChange={(value: string) =>
                        handleFilterChange("fromYear", value)
                      }
                    />
                  </div>

                  <div className="font-medium text-gray-500">إلى :</div>

                  {/* إلى تاريخ */}
                  <div>
                    <Select
                      form={form}
                      name="toMonth"
                      label="الشهر"
                      placeholder="اختر الشهر"
                      choices={MONTHS}
                      keyValue="value"
                      showValue="label"
                      addingInputStyle="!h-8 !text-[12px] "
                      labelStyle="!text-[12px]"
                      onChange={(value: string) =>
                        handleFilterChange("toMonth", value)
                      }
                    />
                    <Select
                      form={form}
                      name="toYear"
                      label="السنة"
                      placeholder="اختر السنة"
                      choices={years}
                      keyValue="value"
                      showValue="label"
                      addingInputStyle="!h-8 !text-[12px]"
                      labelStyle="!text-[12px] mt-1"
                      onChange={(value: string) =>
                        handleFilterChange("toYear", value)
                      }
                    />
                  </div>
                </div>
              )}
              <input
                name="agency_id"
                placeholder="البحث عن طريق معرف الشركة العقارية"
                type="search"
                className="bg-white w-[385px] h-8 p-2 rounded-xl border-none outline-none focus:outline-none focus:border-none focus:ring-0 placeholder:text-size14"
              />
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-8 items-center justify-center mb-6" dir="ltr">
          <div className="flex overflow-auto gap-6">
            {TABS.map((tab) => (
              <div key={tab.key} className="flex items-center justify-center">
                <button
                  className={`flex items-center justify-around gap-2 px-8 py-2 rounded-full font-medium cursor-pointer transition-colors text-[16px] ${
                    activeTab === tab.key
                      ? "bg-golden-medium text-layout-bg"
                      : "bg-layout-bg text-tertiary-bg"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-tertiary-bg h-full text-[14px]">
          <div className="w-full overflow-x-auto">
            <DataTable
              report={true}
              prefix={TABLE_PREFIXES.broker_history}
              columns={columns}
              data={brokerHistory}
            />
          </div>
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default BrokerHistory;
