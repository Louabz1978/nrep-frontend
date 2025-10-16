import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { BrokerHistoryReport } from "@/types/admin/reports";
import useGetBrokerHistory from "@/hooks/admin/reports/useGetBrokerHistory";
import { Input } from "@/components/global/ui/input";

const BrokerHistory = () => {
  const month = "9";
  const year = "2025";
  const { brokerHistory, brokerHistoryQuery } = useGetBrokerHistory({
    month,
    year,
  });


  const columns: ColumnDef<BrokerHistoryReport>[] = useMemo(
    () => [
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
        accessorKey: "action_type",
        header: "نوع العملية",
        size: 15,
      },
      {
        accessorKey: "action_date",
        header: "تاريخ العملية",
        size: 15,
        cell: ({ getValue }) => {
          const value = getValue() as string;
          return new Date(value).toLocaleDateString();
        },
      },
      {
        accessorKey: "property_mls",
        header: "رقم العقار",
        size: 15,
        cell: ({ getValue }) => {
          const value = getValue() as string | undefined;
          return value || "-";
        },
      },
      {
        accessorKey: "transaction_amount",
        header: "مبلغ العملية",
        size: 15,
        cell: ({ getValue }) => {
          const value = getValue() as number | undefined;
          return value ? `$${value.toLocaleString()}` : "-";
        },
      },
      {
        accessorKey: "commission_earned",
        header: "العمولة المكتسبة",
        size: 15,
        cell: ({ getValue }) => {
          const value = getValue() as number | undefined;
          return value ? `$${value.toLocaleString()}` : "-";
        },
      },
      {
        accessorKey: "notes",
        header: "ملاحظات",
        size: 20,
        cell: ({ getValue }) => {
          const value = getValue() as string | undefined;
          return value || "-";
        },
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
              سجل حركة الوسطاء العقاريين
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
        <div className="w-full overflow-x-auto">
          <DataTable
            report={true}
            prefix={TABLE_PREFIXES.broker_history}
            columns={columns}
            data={brokerHistory}
            // query={brokerHistoryQuery}
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default BrokerHistory;
