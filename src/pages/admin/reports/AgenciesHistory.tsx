import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
// --- Added useState and useCallback ---
import { useMemo, useState, useCallback } from "react";
import type { ColumnDef } from "@tanstack/react-table";
// --- 1. This is the *only* type you should use ---
import type { AgenciesHistoryReport } from "@/types/admin/reports";
import { Input } from "@/components/global/ui/input";
import useGetagenciesHistory from "@/hooks/admin/reports/useGetAgenciesHistory";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
// --- Imports required for popups ---
import { Button } from "@/components/global/form/button/Button";
import Popup from "@/components/global/popup/Popup";

// Define the type for a single property item from the response
type PropertyItem = AgenciesHistoryReport["realtors"][0]["properties"][0];

const AgenciesHistory = () => {
  const [start_month] = useQueryState(
    "start_month",
    parseAsInteger.withDefault(1)
  );
  const [start_year] = useQueryState(
    "start_year",
    parseAsInteger.withDefault(2025)
  );
  const [end_month] = useQueryState(
    "end_month",
    parseAsInteger.withDefault(12)
  );
  const [end_year] = useQueryState(
    "end_year",
    parseAsInteger.withDefault(2025)
  );

  const [search, setSearch] = useQueryState(
    `${TABLE_PREFIXES.agencies_history}_search`,
    parseAsString.withDefault("")
  );

  // --- State for Popups ---
  const [isBrokersPopupOpen, setIsBrokersPopupOpen] = useState(false);
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>([]);

  const [isRealtorsPopupOpen, setIsRealtorsPopupOpen] = useState(false);
  const [selectedRealtors, setSelectedRealtors] = useState<
    AgenciesHistoryReport["realtors"]
  >([]);

  const [isPropertiesPopupOpen, setIsPropertiesPopupOpen] = useState(false);
  const [selectedRealtorName, setSelectedRealtorName] = useState("");
  const [selectedProperties, setSelectedProperties] = useState<PropertyItem[]>(
    []
  );

  const { agenciesHistory, getAgenciesHistoryQuery } = useGetagenciesHistory({
    start_month,
    start_year,
    end_month,
    end_year,
  });

  // --- Popup Handlers ---
  const handleBrokersClick = useCallback((brokers: string[]) => {
    if (brokers && brokers.length > 0) {
      setSelectedBrokers(brokers);
      setIsBrokersPopupOpen(true);
    }
  }, []);

  const handleRealtorsClick = useCallback(
    (realtors: AgenciesHistoryReport["realtors"]) => {
      if (realtors && realtors.length > 0) {
        setSelectedRealtors(realtors);
        setIsRealtorsPopupOpen(true);
      }
    },
    []
  );

  const handleRealtorNameClick = useCallback(
    (realtor: AgenciesHistoryReport["realtors"][0]) => {
      setSelectedRealtorName(realtor.realtor_name);
      setSelectedProperties(realtor.properties);
      setIsPropertiesPopupOpen(true);
      setIsRealtorsPopupOpen(false); // Close the realtors list popup
    },
    []
  );

  // --- Columns for the Properties Popup Table ---
  const propertiesColumns: ColumnDef<PropertyItem>[] = useMemo(
    () => [
      {
        accessorKey: "property_type",
        header: "نوع العقار",
      },
      {
        accessorKey: "price",
        header: "السعر",
        cell: ({ row }) =>
          // Format price as currency
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD", // Or your desired currency
          }).format(row.original.price),
      },
      {
        accessorKey: "status",
        header: "الحالة",
      },
      {
        accessorKey: "trans_type",
        header: "نوع المعاملة",
      },
      {
        accessorKey: "date",
        header: "التاريخ",
        // Format date to be more readable
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
          const brokers = row.original.brokers as string[] | undefined;
          if (!brokers || brokers.length === 0) {
            return "لا يوجد";
          }
          return (
            <Button
              onClick={() => handleBrokersClick(brokers)}
              className=" underline !bg-transparent !text-golden-bold"
            >
              {brokers.length > 1
                ? `${brokers[0]} +${brokers.slice(1).length}` // "Broker Name +2"
                : brokers[0]}
            </Button>
          );
        },
      },
      {
        accessorKey: "realtors",
        header: "اسماء الوكلاء العقاريين",
        size: 20,
        cell: ({ row }) => {
          const realtors = row.original.realtors;
          if (!realtors || realtors.length === 0) {
            return "لا يوجد";
          }
          const realtorNames = realtors.map((realtor) => realtor.realtor_name);
          return (
            <Button
              onClick={() => handleRealtorsClick(realtors)}
              className=" underline !bg-transparent !text-golden-bold"
            >
              {realtorNames.length > 1
                ? `${realtorNames[0]} +${realtorNames.slice(1).length}` // "Realtor Name +2"
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
    // Add handlers to dependency array
    [handleBrokersClick, handleRealtorsClick]
  );

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="mb-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-size24 sm:text-size30 font-medium mb-md sm:mb-xl text-center sm:text-right">
              تقرير الوكالات
            </h1>
            <div>
              <Input
                placeholder="ابحث عن اسم الوكالة أو ايميل الوكالة أو رقم الهاتف الوكالة"
                type="search"
                variant="white"
                iconClassName="text-gray-400/50 h-[18px] w-[18px] "
                className="w-90 bg-white !h-2lg !text-size16 !border-gray-400 !rounded-[10px] placeholder:text-xs leading-tight py-sm px-md !text-sm "
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
            data={agenciesHistory ?? []}
            query={getAgenciesHistoryQuery}
            totalPageCount={
              getAgenciesHistoryQuery.data?.pagination?.total_pages || 1
            }
          />
        </div>

        {/* --- Realtor List Popup --- */}
<Popup
  open={isRealtorsPopupOpen}
  onClose={() => setIsRealtorsPopupOpen(false)}
>
  <h1 className="text-center border-b-2 mb-3 p-1 !text-primary">string</h1>
  {/* This div just contains the list of realtor names */}
  <div className="flex flex-col">
    {selectedRealtors.map((realtor, index) => (
      <Button
        key={index}
        onClick={() => handleRealtorNameClick(realtor)}
        className="
          !bg-transparent          {/* Transparent background */}
          w-full justify-center   {/* Center the text */}
          !text-black         {/* Text color from image */}
          font-medium             {/* Medium font weight */}
          py-3                    {/* Vertical padding */}
          hover:!bg-gray-100      {/* Light gray hover effect */}
          !rounded-none           {/* Remove button rounding */}
        "
      >
        {realtor.realtor_name}
      </Button>
    ))}
  </div>
</Popup>

        {/* --- Realtor Properties Popup --- */}
        <Popup
          open={isPropertiesPopupOpen}
          onClose={() => setIsPropertiesPopupOpen(false)}
        >
          <div className="w-full overflow-x-auto">
            <DataTable
              columns={propertiesColumns}
              data={selectedProperties}
              // We pass minimal props as this is a simple client-side table
            />
          </div>
        </Popup>
      </PageContainer>
    </AnimateContainer>
  );
};

export default AgenciesHistory;
