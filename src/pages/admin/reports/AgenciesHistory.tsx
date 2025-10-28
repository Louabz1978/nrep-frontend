import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
// --- 1. This is the *only* type you should use ---
import type { AgenciesHistoryReport } from "@/types/admin/reports";
import { Input } from "@/components/global/ui/input";
import useGetagenciesHistory from "@/hooks/admin/reports/useGetAgenciesHistory";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";

// --- 2. Delete the local 'YourNewReportType' ---
// type YourNewReportType = { ... }; // <-- DELETE THIS

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

  const { agenciesHistory, getAgenciesHistoryQuery } = useGetagenciesHistory({
    start_month,
    start_year,
    end_month,
    end_year,
  });

  console.log(agenciesHistory); // This is correct (AgenciesHistoryReport[])

  // --- 3. Change columns to use the imported type ---
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
          const brokers = row.original.agencies_names as string[] | undefined;
          return brokers?.join(", ") || "لا يوجد";
        },
      },
      {
        accessorKey: "realtors",
        header: "اسماء الوكلاء العقاريين",
        size: 20,
        cell: ({ row }) => {
          const realtors = row.original.realtors_names as string[] | undefined;
          return realtors?.join(", ") || "لا يوجد";
        },
      },
      {
        accessorKey: "total_properties_count",
        header: "عدد العقارات",
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
            // --- 4. This is now correct: data is AgenciesHistoryReport[] ---
            data={(agenciesHistory ) ?? []}
            query={getAgenciesHistoryQuery}
            totalPageCount={
              getAgenciesHistoryQuery.data?.pagination?.total_pages || 1
            }
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default AgenciesHistory;
