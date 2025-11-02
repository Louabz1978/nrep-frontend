import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo, useState, useCallback } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { AgenciesHistoryReport } from "@/types/admin/reports";
import { Input } from "@/components/global/ui/input";
import useGetagenciesHistory from "@/hooks/admin/reports/useGetAgenciesHistory";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { Button } from "@/components/global/form/button/Button";
import Popup from "@/components/global/popup/Popup";
import StatusForm from "@/pages/website/allListings.tsx/StatusForm";
import { PROPERTY_TYPE, TransType } from "@/data/global/select";

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
  const [selectedBrokers, setSelectedBrokers] = useState<
    AgenciesHistoryReport["brokers"]
  >([]);

  const [isRealtorsPopupOpen, setIsRealtorsPopupOpen] = useState(false);
  const [selectedRealtors, setSelectedRealtors] = useState<
    AgenciesHistoryReport["realtors"]
  >([]);

  const [isPropertiesPopupOpen, setIsPropertiesPopupOpen] = useState(false);
  const [selectedIndividualName, setSelectedIndividualName] = useState("");
  const [selectedProperties, setSelectedProperties] = useState<PropertyItem[] | null>(
    null
  );
  const [selectedAgencyName, setSelectedAgencyName] = useState("");

  const { agenciesHistory, getAgenciesHistoryQuery } = useGetagenciesHistory({
    start_month,
    start_year,
    end_month,
    end_year,
  });

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
      setSelectedProperties(Array.isArray(realtor?.properties) ? realtor.properties : []);
      setIsPropertiesPopupOpen(true);
      setIsRealtorsPopupOpen(false); // Close the realtors list popup
    },
    []
  );

  const handleBrokerNameClick = useCallback(
    (broker: AgenciesHistoryReport["brokers"][0]) => {
      setSelectedIndividualName(broker?.broker_name ?? "");
      setSelectedProperties(Array.isArray(broker?.properties) ? broker.properties : []);
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
          // Defensive: expect broker object has 'broker_name'
          const brokerNames = brokers
          .map((broker) =>
              broker
            )
            console.log(brokerNames);


          return (
            <Button
              onClick={() => handleBrokersClick(brokers, row.original?.name ?? "")}
              className=" underline !bg-transparent !text-golden-bold"
            >
              {brokerNames.length > 1
                ? `${brokerNames[0]} +${brokerNames.slice(1).length }`
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
          return (
            <Button
              onClick={() => handleRealtorsClick(realtors, row.original?.name ?? "")}
              className=" underline !bg-transparent !text-golden-bold"
            >
              {realtorNames.length > 1
                ? `${realtorNames[0]} +${realtorNames.slice(1).length }`
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
            {(Array.isArray(selectedBrokers) ? selectedBrokers : []).map((broker, index) => (
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
                {/* Defensive: Show broker_name, fallback empty string */}
                {broker}
              </Button>
            ))}
          </div>
        </Popup>

        {/* Realtor Properties Popup */}
        <Popup
          open={isPropertiesPopupOpen}
          onClose={() => setIsPropertiesPopupOpen(false)}
        >
          <h1 className="text-center border-b-2 mb-3 p-1 !text-primary">
            {selectedAgencyName} - {selectedIndividualName}
          </h1>
          <div className="w-full overflow-x-auto">
            <DataTable
              columns={propertiesColumns}
              data={Array.isArray(selectedProperties) ? selectedProperties : []}
              prefix={TABLE_PREFIXES.agencies_history}
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
            {(Array.isArray(selectedRealtors) ? selectedRealtors : []).map((realtor, index) => (
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
                {typeof realtor === "object" && realtor !== null ? realtor.realtor_name : ""}
              </Button>
            ))}
          </div>
        </Popup>

        {/* Realtor Properties Popup (duplicate, but with correct properties key) */}
        <Popup
          open={isPropertiesPopupOpen}
          onClose={() => setIsPropertiesPopupOpen(false)}
        >
          <h1 className="text-center border-b-2 mb-3 p-1 !text-primary">
            {selectedAgencyName} - {selectedIndividualName}
          </h1>
          <div className="w-full overflow-x-auto">
            <DataTable
              columns={propertiesColumns}
              data={Array.isArray(selectedProperties) ? selectedProperties : []}
              prefix={TABLE_PREFIXES.agencies_history_properties}
            />
          </div>
        </Popup>
      </PageContainer>
    </AnimateContainer>
  );
};

export default AgenciesHistory;
