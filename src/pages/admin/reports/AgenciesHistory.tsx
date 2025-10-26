import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { AgenciesHistoryReport} from "@/types/admin/reports";
import { Input } from "@/components/global/ui/input";
import useGetagenciesHistory from "@/hooks/admin/reports/useGetAgenciesHistory";

const AgenciesHistory = () => {

  const { agenciesHistory, getAgenciesHistoryQuery } = useGetagenciesHistory();


  const columns: ColumnDef<AgenciesHistoryReport>[] = useMemo(
    () => [
      {
        accessorKey: "agency_id",
        header: "معرف الوكالة",
        size: 10,
      },
      {
        accessorKey: "agency_name",
        header: "اسم الوكالة",
        size: 20,
      },
      {
        accessorKey: "agency_email",
        header: "ايميل الوكالة",
        size: 20,
      },
      {
        accessorKey: "agency_phone",
        header: "رقم الهاتف الوكالة",
        size: 20,
      },
      {
        accessorKey: "agencies_names",
        header: "اسماء الوكلاء",
        size: 20,
      },
      {
        accessorKey: "realtors_names",
        header: "اسماء الوسطاء",
        size: 20,
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
            data={agenciesHistory ?? [] }
            query={getAgenciesHistoryQuery}
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default AgenciesHistory;
