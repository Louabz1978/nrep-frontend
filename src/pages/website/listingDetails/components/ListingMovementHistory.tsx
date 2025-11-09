import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { ListingMovement } from "@/types/website/reports";
import useGetListingMovement from "@/hooks/website/reports/useGetListingMovement";
import type { ListingDetailsType } from "@/types/website/listings";

interface RenderListingMovementTabProps {
  listing: ListingDetailsType;
}

const RenderListingMovementTab = ({
  listing,
}: RenderListingMovementTabProps) => {
  const property_id = listing?.property_id;
  const { listingMovement, getListingMovementQuery } = useGetListingMovement({
    property_id: property_id,
  });

  const tableData = Array.isArray(listingMovement)
    ? listingMovement
    : listingMovement
    ? [listingMovement]
    : [];

  const columns: ColumnDef<ListingMovement>[] = useMemo(
    () => [
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
        accessorKey: "building_num",
        header: "رقم البناء",
        size: 15,
      },
      {
        accessorKey: "city",
        header: "المدينة",
        size: 15,
      },
      {
        accessorKey: "floor",
        header: "الطابق",
        size: 10,
      },
      {
        accessorKey: "price",
        header: "السعر",
        size: 15,
        cell: ({ row }) => {
          const price = row.original.price;
          return price ? `$${price.toLocaleString()}` : "---";
        },
      },
      {
        accessorKey: "property_id",
        header: "رقم العقار",
        size: 15,
      },
      {
        accessorKey: "property_type",
        header: "نوع العقار",
        size: 15,
        cell: ({ row }) => {
          const type = row.original.property_type;
          switch (type) {
            case "apartment":
              return "شقة";
            case "villa":
              return "فيلا";
            case "land":
              return "أرض";
            default:
              return type || "---";
          }
        },
      },
      {
        accessorKey: "rents_count",
        header: "عدد مرات الإيجار",
        size: 25,
      },
      {
        accessorKey: "sales_count",
        header: "عدد مرات البيع",
        size: 25,
      },
      {
        accessorKey: "status",
        header: "حالة العقار",
        size: 15,
        cell: ({ row }) => {
          const type = row.original.status;
          switch (type) {
            case "active":
              return "نشط";
            case "closed":
              return "مغلق"
            default:
              return type || "--";
          }
        },
      },
      {
        accessorKey: "street",
        header: "اسم الشارع",
        size: 15,
      },
      {
        accessorKey: "trans_type",
        header: "نوع العرض",
        size: 15,
        cell: ({ row }) => {
          const type = row.original.trans_type;
          switch (type) {
            case "active":
              return "نشط";
            case "sell":
              return "بيع";
            case "rent":
              return "إيجار";
            default:
              return type || "--";
          }
        },
      },
    ],
    []
  );

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        <DataTable
          report={true}
          prefix={TABLE_PREFIXES.listing_movement}
          columns={columns}
          data={tableData}
          query={getListingMovementQuery}
        />
      </div>
    </div>
  );
};

export default RenderListingMovementTab;
