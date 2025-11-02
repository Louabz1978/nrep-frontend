import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo, useState, useRef, useEffect } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { RealtorHistoryReport } from "@/types/admin/reports";
import { Input } from "@/components/global/ui/input";
import useGetRealtorHistory from "@/hooks/admin/reports/useGetRealtorHistory";
import { useQueryState, parseAsString } from "nuqs";
import { Button } from "@/components/global/form/button/Button";
import { ListFilterPlus } from "lucide-react";
import { MONTHS } from "@/data/global/months";
import Select from "@/components/global/form/select/Select";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  realtorFilterFormInitialValues,
  realtorFilterFormSchema,
  type RealtorFilterForm,
} from "@/data/admin/schema/RealtorsFilterForm";

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
  const [search, setSearch] = useQueryState(
    `${TABLE_PREFIXES.realtor_history}_search`,
    parseAsString.withDefault("")
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const form = useForm<RealtorFilterForm>({
    resolver: joiResolver(realtorFilterFormSchema),
    defaultValues: realtorFilterFormInitialValues,
    mode: "onChange",
  });

  const currentYear = new Date().getFullYear();
  const years = [
    { value: currentYear.toString(), label: currentYear.toString() },
    {
      value: (currentYear - 1).toString(),
      label: (currentYear - 1).toString(),
    },
    {
      value: (currentYear - 2).toString(),
      label: (currentYear - 2).toString(),
    },
  ];

  const { realtorHistory, getRealtorHistoryQuery } = useGetRealtorHistory({
    start_month: form.watch("start_month")?.value,
    start_year: form.watch("start_year")?.value,
    end_month: form.watch("end_month")?.value,
    end_year: form.watch("end_year")?.value,
    search: search,
  });

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
    [tabKey: string]: {
      sales: keyof RawRealtorHistory;
      total: keyof RawRealtorHistory;
    };
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
        number_of_sales: realtor[currentKeys.sales] ?? 0,
        total_sales: realtor[currentKeys.total] ?? 0,
      }));
  }, [realtorHistory, activeTab, keyMap]);

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

  const modifiedQuery = useMemo(() => {
    const pagination = getRealtorHistoryQuery.data?.pagination;

    return {
      ...getRealtorHistoryQuery,
      data: filteredData,
      pagination: pagination,
    };
  }, [getRealtorHistoryQuery, filteredData]);

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
            <div className="flex items-end gap-4 relative" ref={filterRef}>
              <Button
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className="!rounded-md !text-primary-fg bg-white !h-9 !text-[14px] flex items-center gap-y-xs px-4 py-2 border border-transparent "
              >
                <p className="font-medium text-[14px]">الفلتر</p>
                <ListFilterPlus className="size-4 ml-1" />
              </Button>
              {isFilterOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 h-auto px-6 py-2 bg-white border border-gray-300 rounded shadow-md z-50 text-[14px] space-y-2">
                  <div>
                    <span className="font-medium text-gray-700 text-right block ">
                      البحث من :
                    </span>
                    <Select
                      form={form}
                      name="start_month"
                      label="الشهر"
                      placeholder="اختر الشهر"
                      choices={MONTHS}
                      keyValue="value"
                      showValue="label"
                      addingInputStyle="!h-8 !text-[12px]"
                      labelStyle="!text-[12px]"
                    />
                    <Select
                      form={form}
                      name="start_year"
                      label="السنة"
                      placeholder="اختر السنة"
                      choices={years}
                      keyValue="value"
                      showValue="label"
                      addingInputStyle="!h-8 !text-[12px]"
                      labelStyle="!text-[12px] mt-1"
                    />
                  </div>
                  <div className="font-medium text-gray-500">إلى :</div>
                  <div>
                    <Select
                      form={form}
                      name="end_month"
                      label="الشهر"
                      placeholder="اختر الشهر"
                      choices={MONTHS}
                      keyValue="value"
                      showValue="label"
                      addingInputStyle="!h-8 !text-[12px] "
                      labelStyle="!text-[12px]"
                    />
                    <Select
                      form={form}
                      name="end_year"
                      label="السنة"
                      placeholder="اختر السنة"
                      choices={years}
                      keyValue="value"
                      showValue="label"
                      addingInputStyle="!h-8 !text-[12px]"
                      labelStyle="!text-[12px] mt-1"
                    />
                  </div>
                </div>
              )}
              <Input
                placeholder="ابحث عن اسم الوسيط أو رقم الرخصة"
                type="search"
                variant="white"
                iconClassName="text-gray-400/50 h-[18px] w-[18px] "
                className="w-90 bg-white !h-9 !text-size16 !border-gray-400 !rounded-[10px] placeholder:text-xs leading-tight py-sm px-md !text-sm "
                value={search}
                onChange={(e) => setSearch(e.target.value || null)}
              />
            </div>
          </div>
          <hr className="mt-2" />
        </div>
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
            data={filteredData ?? []}
            prefix={TABLE_PREFIXES.realtor_history}
            columns={columns}
            query={modifiedQuery}
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default RealtorHistory;
