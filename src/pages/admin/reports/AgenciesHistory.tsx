import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
// --- Added useRef and useEffect ---
import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { AgenciesHistoryReport } from "@/types/admin/reports";
import { Input } from "@/components/global/ui/input";
import useGetagenciesHistory from "@/hooks/admin/reports/useGetAgenciesHistory";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { Button } from "@/components/global/form/button/Button";
import Popup from "@/components/global/popup/Popup";
import StatusForm from "@/pages/website/allListings.tsx/StatusForm";
import { PROPERTY_TYPE, TransType } from "@/data/global/select";

// --- Imports for Filter ---
import { ListFilterPlus } from "lucide-react";
import { MONTHS } from "@/data/global/months";
import Select from "@/components/global/form/select/Select";
import { useForm } from "react-hook-form";
import { filterFormInitialValues, filterFormSchema, type FilterForm } from "@/data/admin/schema/AgenciesFilterForm";
import { joiResolver } from "@hookform/resolvers/joi";

// Define the type for a single property item from the response
type PropertyItem = AgenciesHistoryReport["realtors"][0]["properties"][0];

const AgenciesHistory = () => {

  const [search, setSearch] = useQueryState(
    `${TABLE_PREFIXES.agencies_history}_search`,
    parseAsString.withDefault("")
  );

  // --- State for Popups ---
  const [isBrokersPopupOpen, setIsBrokersPopupOpen] = useState(false);
  const [selectedBrokers, setSelectedBrokers] = useState<
    AgenciesHistoryReport["brokers"]
  >([]);

  const [isRealtorsPopupOpen, setIsRealtorsPopupOpen] = useState(false);
  const [selectedRealtors, setSelectedRealtors] = useState<
    AgenciesHistoryReport["realtors"]
  >([]);

  const [isPropertiesPopupOpen, setIsPropertiesPopupOpen] = useState(false);
  const [selectedIndividualName, setSelectedIndividualName] = useState("");
  const [selectedProperties, setSelectedProperties] = useState<
    PropertyItem[] | null
  >(null);
  const [selectedAgencyName, setSelectedAgencyName] = useState("");

  // --- State for Filter (from BrokerHistory) ---
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const form = useForm<FilterForm>(
    {
      resolver: joiResolver(filterFormSchema),
      defaultValues: filterFormInitialValues,
      mode: "onChange",
    }
  );

  // --- Data for Filter (from BrokerHistory) ---
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

  const { agenciesHistory, getAgenciesHistoryQuery } = useGetagenciesHistory({
    start_month: form.watch("start_month")?.value,
    start_year: form.watch("start_year")?.value,
    end_month: form.watch("end_month")?.value,
    end_year: form.watch("end_year")?.value,
  });

  // --- Click Outside Logic for Filter (from BrokerHistory) ---
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

  // --- Popup Handlers with robust nullish checks ---
  const handleBrokersClick = useCallback(
    (brokers: AgenciesHistoryReport["brokers"], agencyName: string) => {
      if (Array.isArray(brokers) && brokers.length > 0) {
        setSelectedBrokers(brokers);
        setSelectedAgencyName(agencyName); // Set agency name
        setIsBrokersPopupOpen(true);
      }
    },
    []
  );

  const handleRealtorsClick = useCallback(
    (realtors: AgenciesHistoryReport["realtors"], agencyName: string) => {
      if (Array.isArray(realtors) && realtors.length > 0) {
        setSelectedRealtors(realtors);
        setSelectedAgencyName(agencyName); // Set agency name
        setIsRealtorsPopupOpen(true);
      }
    },
    []
  );

  const handleRealtorNameClick = useCallback(
    (realtor: AgenciesHistoryReport["realtors"][0]) => {
      setSelectedIndividualName(realtor?.realtor_name ?? "");
      setSelectedProperties(
        Array.isArray(realtor?.properties) ? realtor.properties : []
      );
      setIsPropertiesPopupOpen(true);
      setIsRealtorsPopupOpen(false); // Close the realtors list popup
    },
    []
  );

  const handleBrokerNameClick = useCallback(
    (broker: AgenciesHistoryReport["brokers"][0]) => {
      setSelectedIndividualName(broker?.broker_name ?? "");
      setSelectedProperties(
        Array.isArray(broker?.properties) ? broker.properties : []
      );
      setIsPropertiesPopupOpen(true);
      setIsBrokersPopupOpen(false); // Close the brokers list popup
    },
    []
  );

  // --- Columns for the Properties Popup Table ---
  const propertiesColumns: ColumnDef<PropertyItem>[] = useMemo(
    () => [
      {
        id: "property_type",
        header: "نوع العقار",
        accessorKey: "property_type",
        cell: ({ row }) => {
          const propertyTypeValues = row?.original?.property_type;
          const propertyType = PROPERTY_TYPE?.find(
            (item) => item?.value == propertyTypeValues
          )?.label;
          return (
            <span className="inline-flex items-center justify-center px-3xl py-md rounded-full text-sm font-medium bg-[#ADA7A7]/25">
              {propertyType}
            </span>
          );
        },
        size: 100,
      },
      {
        accessorKey: "price",
        header: "السعر",
        cell: ({ row }) =>
          // Format price as currency
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(row.original.price),
      },
      {
        id: "status",
        header: "الحالة",
        accessorKey: "status",
        cell: ({ row }) => {
          return <StatusForm row={row} />;
        },
        size: 50,
      },
      {
        id: "trans_type",
        header: "نوع العرض",
        accessorKey: "trans_type",
        cell: ({ row }) => {
          const transTypeValue = row?.original?.trans_type;
          const trans_type = TransType?.find(
            (item) => item?.value == transTypeValue
          )?.label;
          return (
            <span className="inline-flex items-center justify-center px-3xl py-md rounded-full text-sm font-medium bg-[#ADA7A7]/25">
              {trans_type}
            </span>
          );
        },
        size: 100,
      },
      {
        accessorKey: "date",
        header: "التاريخ",
        cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
      },
    ],
    []
  );

  // --- Main Table Columns ---
  const columns: ColumnDef<AgenciesHistoryReport>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "اسم الوكالة",
        size: 20,
      },
      {
        accessorKey: "email",
        header: "ايميل الوكالة",
        size: 20,
      },
      {
        accessorKey: "phone_number",
        header: "رقم الهاتف الوكالة",
        size: 20,
      },
      {
        accessorKey: "brokers",
        header: "اسماء الوسطاء",
        size: 20,
        cell: ({ row }) => {
          // Defensive check: must be an array with length
          const brokers = row.original?.brokers;
          if (!Array.isArray(brokers) || brokers.length === 0) {
            return "لا يوجد";
          }
          // --- FIX: Map to broker_name, not the object ---
          const brokerNames = brokers.map((broker) => broker).filter(Boolean); // Remove any empty strings

          if (brokerNames.length === 0) {
            return "لا يوجد";
          }

          return (
            <Button
              onClick={() =>
                handleBrokersClick(brokers, row.original?.name ?? "")
              }
              className=" underline !bg-transparent !text-golden-bold"
            >
              {brokerNames.length > 1
                ? `${brokerNames[0]} +${brokerNames.slice(1).length}`
                : brokerNames[0]}
            </Button>
          );
        },
      },
      {
        accessorKey: "realtors",
        header: "اسماء الوكلاء العقاريين",
        size: 20,
        cell: ({ row }) => {
          const realtors = row.original?.realtors;
          if (!Array.isArray(realtors) || realtors.length === 0) {
            return "لا يوجد";
          }
          const realtorNames = realtors
            .map((realtor) =>
              typeof realtor === "object" && realtor !== null
                ? realtor.realtor_name
                : ""
            )
            .filter(Boolean);

          if (realtorNames.length === 0) {
            return "لا يوجد";
          }

          return (
            <Button
              onClick={() =>
                handleRealtorsClick(realtors, row.original?.name ?? "")
              }
              className=" underline !bg-transparent !text-golden-bold"
            >
              {realtorNames.length > 1
                ? `${realtorNames[0]} +${realtorNames.slice(1).length}`
                : realtorNames[0]}
            </Button>
          );
        },
      },
      {
        accessorKey: "total_closed_count",
        header: "عدد العقارات",
        size: 15,
      },
    ],
    // --- Added handleBrokerNameClick to dependency array ---
    [handleBrokersClick, handleRealtorsClick, handleBrokerNameClick]
  );

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="mb-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-size24 sm:text-size30 font-medium mb-md sm:mb-xl text-center sm:text-right">
              تقرير الوكالات
            </h1>

            {/* --- Filter and Search Container --- */}
            <div className="flex items-end gap-4 relative" ref={filterRef}>
              {/* Filter Button */}
              <Button
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className="!rounded-md !text-primary-fg bg-white !h-9 !text-[14px] flex items-center gap-y-xs px-4 py-2 border border-transparent "
              >
                <p className="font-medium text-[14px]">الفلتر</p>
                <ListFilterPlus className="size-4 ml-1" />
              </Button>

              {/* Filter Dropdown */}
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
                      onChange={(value: string) =>
                        setStartMonth(parseInt(value) || null)
                      }
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
                      onChange={(value: string) =>
                        setStartYear(parseInt(value) || null)
                      }
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
                      onChange={(value: string) =>
                        setEndMonth(parseInt(value) || null)
                      }
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
                      onChange={(value: string) =>
                        setEndYear(parseInt(value) || null)
                      }
                    />
                  </div>
                </div>
              )}

              {/* Existing Search Input */}
              <Input
                placeholder="ابحث عن اسم الوكالة أو ايميل الوكالة أو رقم الهاتف الوكالة"
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
        <div className="w-full overflow-x-auto">
          <DataTable
            report={true}
            prefix={TABLE_PREFIXES.agencies_history}
            columns={columns}
            data={Array.isArray(agenciesHistory) ? agenciesHistory : []}
            query={getAgenciesHistoryQuery}
            totalPageCount={
              getAgenciesHistoryQuery.data?.pagination?.total_pages || 1
            }
          />
        </div>

        {/* Broker List Popup */}
        <Popup
          open={isBrokersPopupOpen}
          onClose={() => setIsBrokersPopupOpen(false)}
        >
          <h1 className="text-center border-b-2 mb-3 p-1 !text-primary">
            {selectedAgencyName}
          </h1>
          <div className="flex flex-col">
            {(Array.isArray(selectedBrokers) ? selectedBrokers : []).map(
              (broker, index) => (
                <Button
                  key={index}
                  onClick={() => handleBrokerNameClick(broker)}
                  className="
                    !bg-transparent
                    w-full justify-center
                    !text-black
                    font-medium
                    py-3
                    hover:!bg-gray-100
                    !rounded-none
                  "
                >
                  {broker}
                </Button>
              )
            )}
          </div>
        </Popup>

        {/* Properties Popup (for both Brokers and Realtors) */}
        <Popup
          open={isPropertiesPopupOpen}
          onClose={() => setIsPropertiesPopupOpen(false)}
        >
          <h1 className="text-center border-b-2 mb-3 p-1 !text-primary">
            {selectedAgencyName} - {selectedIndividualName}
          </h1>
          <div className="w-full overflow-x-auto">
            <DataTable
              report={true}
              columns={propertiesColumns}
              data={Array.isArray(selectedProperties) ? selectedProperties : []}
              prefix={TABLE_PREFIXES.agencies_history_properties}
            />
          </div>
        </Popup>

        {/* Realtor List Popup */}
        <Popup
          open={isRealtorsPopupOpen}
          onClose={() => setIsRealtorsPopupOpen(false)}
        >
          <h1 className="text-center border-b-2 mb-3 p-1 !text-primary">
            {selectedAgencyName}
          </h1>
          <div className="flex flex-col">
            {(Array.isArray(selectedRealtors) ? selectedRealtors : []).map(
              (realtor, index) => (
                <Button
                  key={index}
                  onClick={() => handleRealtorNameClick(realtor)}
                  className="
                    !bg-transparent
                    w-full justify-center
                    !text-black
                    font-medium
                    py-3
                    hover:!bg-gray-100
                    !rounded-none
                  "
                >
                  {typeof realtor === "object" && realtor !== null
                    ? realtor.realtor_name
                    : ""}
                </Button>
              )
            )}
          </div>
        </Popup>

        {/* --- Removed the duplicated popup that was here --- */}
      </PageContainer>
    </AnimateContainer>
  );
};

export default AgenciesHistory;
