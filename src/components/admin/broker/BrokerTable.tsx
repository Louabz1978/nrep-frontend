import { useMemo } from "react";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import useGetAllBrokers from "@/hooks/admin/useGetAllBrokers";
import type { ColumnDef } from "@tanstack/react-table";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { Checkbox } from "@/components/global/ui/checkbox";

const BrokerTable = () => {
  const { allBrokers, allBrokersQuery } = useGetAllBrokers({ queryParams: { role: "broker" } });
  const totalPages = allBrokersQuery?.data?.pagination?.total_pages || 1;

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (    
          <Checkbox
          className="ms-2 bg-white"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="ms-2 bg-white"
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 8,
      } ,
      {
        accessorKey: "first_name",
        header: "اسم الأول",
        size: 20,
        minSize: 20,
      },
      {
        accessorKey: "last_name",
        header: "اسم العائلة",
        size: 20,
        minSize: 20,
      },
      {
        accessorKey: "email",
        header: "البريد الإلكتروني",
        size: 25,
        minSize: 25,
      },
      {
        accessorKey: "phone_number",
        header: "رقم الهاتف",
        size: 20,
        minSize: 20,
      },
    ],
    []
  );


  return (
    <AnimateContainer>
      <PageContainer>
        <div className="space-y-6">
          {/* Page Header */}
          <div className="mb-5xl">
          <h1 className="text-size30 font-medium">أصحاب الشركات العقارية</h1>
          <hr />
        </div>

          {/* Data Table */}
          <DataTable
            prefix={TABLE_PREFIXES.brokers}
            columns={columns}
            data={allBrokers ?? []}
            query={allBrokersQuery}
            totalPageCount={totalPages}
            searchKey="first_name"
            searchPlaceholder="البحث عن طريق اسم"
            searchType="text"
            show={true}
            to="/admin/brokers/add"
            addLabel="إضافة صاحب شركة عقارية"
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default BrokerTable;
