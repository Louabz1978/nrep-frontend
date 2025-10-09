import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { ListingMovement, TopAgentReport } from "@/types/website/reports";
import useGetTopAgent from "@/hooks/website/reports/useGetTopAgent";
import useGetListingMovement from "@/hooks/website/reports/useGetListingMovement";

const ListingMovementHistory = () => {
  const { listingMovement, getListingMovementQuery } = useGetListingMovement();

  const columns: ColumnDef<ListingMovement>[] = useMemo(
    () => [
      {
        accessorKey: "mls",
        header: "MLS",
        size: 20,
      },
      {
        accessorKey: "listing_type",
        header: "نوع العقار",
        size: 20,
      },
      {
        accessorKey: "trans_type",
        header: "نوع العرض",
        size: 15,
      },
      {
        accessorKey: "status",
        header: " حالة العقار",
        size: 15,
      },
      {
        accessorKey: "floor",
        header: "الطابق",
        size: 10,
      },
      {
        accessorKey: "apt",
        header: "الشقة",
        size: 10,
      },
      {
        accessorKey: "area",
        header: "المنطقة",
        size: 15,
      },
      {
        accessorKey: "city",
        header: "المدينة",
        size: 15,
      },
      {
        accessorKey: "building_num",
        header: "رقم البناء",
        size: 10,
      },
      {
        accessorKey: "street_name",
        header: "اسم الشارع",
        size: 15,
      },
      {
        accessorKey: "sell_date",
        header: "تاريخ البيع",
        size: 15,
      },
      {
        accessorKey: "sell_price",
        header: "سعر البيع",
        size: 15,
      },
    ],
    []
  );

  return (
    <AnimateContainer>
      <PageContainer>
        {/* Responsive controls for month/year can be added here if needed */}
        <div className="mb-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-size24 sm:text-size30 font-medium mb-md sm:mb-xl text-center sm:text-right">
              تقرير تاريخ حركة العقار
            </h1>
            <p>يتم عرض العقارات المضافة من قبلك</p>
          </div>
          <hr className="mt-2" />
        </div>
        <div className="w-full overflow-x-auto">
          <DataTable
            report={true}
            prefix={TABLE_PREFIXES.top_agent}
            columns={columns}
            data={listingMovement || []}
            query={getListingMovementQuery}
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default ListingMovementHistory;
