import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { ListingMovement } from "@/types/website/reports";
import useGetListingMovement from "@/hooks/website/reports/useGetListingMovement";
import { Input } from "@/components/global/ui/input";

const ListingMovementHistory = () => {
  const { listingMovement, getListingMovementQuery } = useGetListingMovement();

  // Search state for filtering listing movements
  const [search, setSearch] = useState("");

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

  // Filter listingMovement by search input (by agent_name or license)
  const filteredData = useMemo(() => {
    // listingMovement may be undefined or an object, so ensure it's an array
    const data: ListingMovement[] = Array.isArray(listingMovement)
      ? listingMovement
      : [];
    if (!search) return data;
    return data.filter(
      (item) =>
        item.mls?.includes(search) || Number(item.mls ?? "").includes(search)
    );
  }, [listingMovement, search]);

  return (
    <AnimateContainer>
      <PageContainer>
        {/* Responsive controls for month/year can be added here if needed */}
        <div className="mb-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-size24 sm:text-size30 font-medium  text-center sm:text-right">
                تقرير تاريخ حركة العقار
              </h1>
              <p>يتم عرض العقارات المضافة من قبلك</p>
            </div>
            <div>
              <Input
                placeholder="ابحث عن طريق رقم MLS"
                type="search"
                variant="white"
                iconClassName="text-gray-400/50 h-[18px] w-[18px] "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-90 bg-white !h-2lg !text-size16 !border-gray-400 !rounded-[10px] placeholder:text-xs leading-tight py-sm px-md !text-sm "
              />
            </div>
          </div>
          <hr className="mt-2" />
        </div>
        <div className="w-full overflow-x-auto">
          <DataTable
            report={true}
            prefix={TABLE_PREFIXES.top_agent}
            columns={columns}
            data={filteredData}
            query={getListingMovementQuery}
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default ListingMovementHistory;
