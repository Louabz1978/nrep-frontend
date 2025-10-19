import { useMemo } from "react";
import { DataTable, type Filters } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import useGetAllRealtors from "@/hooks/admin/useGetAllRealtors";
import { Checkbox } from "@/components/global/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";

const RealtorTable = () => {
  const { allRealtors, allRealtorsQuery } = useGetAllRealtors({ queryParams: { role: "realtor" } });
  const totalPages = allRealtorsQuery?.data?.pagination?.total_pages || 1;

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "index",
        header: "#",
        cell: ({ row }) => row.index + 1,
        size: 5,
        minSize: 5,
      },
      {
        accessorKey: "first_name",
        header: "الأسم الأول",
        size: 20,
        minSize: 20,
      },
      {
        accessorKey: "last_name",
        header: "إسم العائلة",
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

  // Filter/search options
  const filters: Filters = useMemo(
    () => [
      {
        id: "1",
        type: "text",
        label: "الاسم الأول",
        title: "الاسم الأول",
        searchKey: "first_name",
      },
      {
        id: "2",
        type: "text",
        label: "اسم العائلة",
        title: "اسم العائلة",
        searchKey: "last_name",
      },
      {
        id: "3",
        type: "text",
        label: "البريد الإلكتروني",
        title: "البريد الإلكتروني",
        searchKey: "email",
      },
      {
        id: "4",
        type: "text",
        label: "رقم الهاتف",
        title: "رقم الهاتف",
        searchKey: "phone_number",
      }
    ],
    []
  );

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="space-y-6">
          {/* Page Header */}
          <div className="mb-5xl">
          <h1 className="text-size30 font-medium">الوسطاء العقارين</h1>
          <hr />
        </div>    

          {/* Data Table */}
          <DataTable
            prefix={TABLE_PREFIXES.realtors}
            columns={columns}
            filters={filters}
            data={allRealtors ?? []}
            query={allRealtorsQuery}
            totalPageCount={totalPages}
            searchKey="first_name"
            searchPlaceholder="البحث عن طريق الإسم"
            searchType="text"
            show={true}
            to="/admin/realtors/add"
            addLabel="إضافة وسيط عقاري"
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default RealtorTable;
