import Badge from "@/components/global/badge/Badge";
import { Button } from "@/components/global/form/button/Button";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import { Checkbox } from "@/components/global/ui/checkbox";
import { cityChoices, STATUS, STATUS_COLORS } from "@/data/global/select";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import useAllListings from "@/hooks/website/listing/useAllListings";
import type { Listing } from "@/types/website/listings";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import {
  PiInfoBold,
  PiPencilSimpleBold,
  PiTrashSimpleBold,
} from "react-icons/pi";
import { Link } from "react-router-dom";

function AllListings() {
  // get all listings
  const { allListings, allListingsQuery, totalPages } = useAllListings();

  // listing item columns
  const listingColumns: ColumnDef<Listing>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            className="ms-2"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            className="ms-2"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "order",
        header: "#",
        cell: ({ row }) => row?.index + 1,
        enableSorting: false,
      },
      {
        id: "mls_num",
        header: "رقم العقار",
        cell: ({ row }) => (
          <Link
            to={`/listing/details/${row?.original?.property_id}`}
            className="hover:text-primary"
          >
            {row?.original?.mls_num ?? row?.original?.property_id}
          </Link>
        ),
      },
      {
        id: "address",
        header: "العنوان",
        accessorKey: "address.county",
        cell: ({ row }) => {
          return cityChoices?.find(
            (item) => item?.value == row?.original?.address?.county
          )?.label;
        },
      },
      {
        id: "price",
        header: "السعر",
        accessorKey: "price",
      },
      {
        id: "area",
        header: "المنطقة",
        accessorKey: "address.area",
      },
      {
        id: "city",
        header: "المدينة",
        accessorKey: "address.city",
        cell: ({ row }) => {
          return cityChoices?.find(
            (item) => item?.value == row?.original?.address?.city
          )?.label;
        },
      },
      {
        id: "status",
        header: "الحالة",
        accessorKey: "status",
        cell: ({ row }) => {
          return (
            <Badge
              status={
                STATUS?.find((item) => item?.value == row?.original?.status)
                  ?.value as keyof typeof STATUS_COLORS
              }
              label={
                STATUS?.find((item) => item?.value == row?.original?.status)
                  ?.label ?? row?.original?.status
              }
            />
          );
        },
      },
      {
        id: "action",
        header: "الإجراء",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-md">
              {/* edit */}
              <Link to={`/listing/edit/${row?.original?.property_id}`}>
                <Button size={"icon"} className="bg-green">
                  <PiPencilSimpleBold />
                </Button>
              </Link>

              {/* delete */}
              <Button
                size={"icon"}
                className="bg-red"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(row?.original?.property_id);
                }}
              >
                <PiTrashSimpleBold />
              </Button>

              {/* details */}
              <Link to={`/listing/details/${row?.original?.property_id}`}>
                <Button size={"icon"}>
                  <PiInfoBold />
                </Button>
              </Link>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    []
  );
  return (
    <AnimateContainer>
      <PageContainer>
        <DataTable
          prefix={TABLE_PREFIXES.allListings}
          columns={listingColumns}
          filters={[]}
          data={(allListings ?? []) as Listing[]}
          query={allListingsQuery}
          totalPageCount={totalPages}
        />
      </PageContainer>
    </AnimateContainer>
  );
}

export default AllListings;
