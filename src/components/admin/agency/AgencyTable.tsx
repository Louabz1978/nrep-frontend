import { useMemo } from "react";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import type { ColumnDef } from "@tanstack/react-table";
import type { Agency } from "@/types/admin/agency";
import useGetAgencies from "@/hooks/admin/useGetAgencies";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";

const AgencyTable = () => {
  const { agencies, agenciesQuery } = useGetAgencies();
  const totalPages = agenciesQuery?.data?.pagination?.total_pages || 1;

  const columns: ColumnDef<Agency>[] = useMemo(
    () => [
      {
        accessorKey: "index",
        header: "#",
        cell: ({ row }) => row.index + 1,
        size: 5,
        minSize: 5,
      },
      { 
        accessorKey: "name", 
        header: "اسم الشركة",
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
      { 
        accessorKey: "created_by", 
        header: "أنشئت بواسطة",
        size: 15,
        minSize: 15,
      },
      { 
        accessorKey: "address.city", 
        header: "المدينة",
        size: 15,
        minSize: 15,
      },
    ],
    []
  );


  return (
    <AnimateContainer>
      <PageContainer> 
        <div className="space-y-6">
          {/* Data Table */}
          <DataTable
            prefix={TABLE_PREFIXES.agencies}
            columns={columns}
            data={agencies ?? []}
            query={agenciesQuery}
            totalPageCount={totalPages}
            searchKey="name"
            searchPlaceholder="البحث عن طريق اسم الشركة"
            searchType="text"
            show={true}
            to="/admin/agencies/create"
            addLabel="إضافة شركة عقارية "
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default AgencyTable;


