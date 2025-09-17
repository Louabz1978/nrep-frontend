import { Button } from "@/components/global/form/button/Button";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable, type Filters } from "@/components/global/table2/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/global/tooltip/Tooltiop";
import { Checkbox } from "@/components/global/ui/checkbox";
import {
  cityChoices,
  STATUS,
  STATUS_WITH_CLOSED,
  TransType,
} from "@/data/global/select";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import useAllListings from "@/hooks/website/listing/useAllListings";
import { useDeleteListings } from "@/hooks/website/listing/useDeleteListing";
import { useUser } from "@/stores/useUser";
import type { Listing } from "@/types/website/listings";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import {
  PiInfoBold,
  PiPencilSimpleBold,
  PiTrashSimpleBold,
} from "react-icons/pi";
import { Link } from "react-router-dom";
import StatusForm from "./StatusForm";
import { PropertyStatus } from "@/data/global/enums";

function AllListings() {
  // user information
  const { user, hasPermissions } = useUser();

  // get all listings
  const { allListings, allListingsQuery, totalPages } = useAllListings();

  // handle delete listing methods
  const { deleteListing, handleDeleteListing } = useDeleteListings();

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
        size: 8,
        minSize: 8,
      },
      {
        id: "mls_num",
        accessorKey: "address.building_num",
        header: "MLS",
        cell: ({ row }) => (
          <Link
            to={`/listing/details/${row?.original?.property_id}`}
            className="hover:text-primary"
          >
            {`#${row?.original?.mls_num}`}
          </Link>
        ),
        size: 25,
      },
      {
        id: "address",
        header: "العنوان",
        accessorKey: "address.building_num",
        cell: ({ row }) => {
          return `${row?.original?.address?.building_num ?? ""} ${
            row?.original?.address?.street ?? ""
          } طابق ${row?.original?.address?.floor ?? ""} شقة ${
            row?.original?.address?.apt ?? ""
          }, ${row?.original?.address?.area}, ${row?.original?.address
            ?.city}, ${row?.original?.address?.county}`;
        },
        size: 50,
      },
      {
        id: "price",
        header: "السعر",
        accessorKey: "price",
        size: 20,
      },
      {
        id: "trans_type",
        header: "نوع العقد",
        accessorKey: "trans_type",
        cell: ({ row }) => {
          const transTypeValue = row?.original?.trans_type;
          const trans_type = TransType?.find(
            (item) => item?.value == transTypeValue
          )?.label;
          return trans_type;
        },
        size: 10,
      },
      {
        id: "area",
        header: "المنطقة",
        accessorKey: "address.area",
        size: 10,
      },
      {
        id: "city",
        header: "المدينة",
        accessorKey: "address.city",
        size: 10,
      },
      {
        id: "status",
        header: "الحالة",
        accessorKey: "status",
        cell: ({ row }) => {
          return <StatusForm row={row} />;
        },
        size: 25,
      },
      {
        id: "action",
        header: "الإجراء",
        cell: ({ row }) => {
          const isSameUser =
            row?.original?.created_by_user?.user_id ==
            (user?.user_id ?? user?.data?.user_id);
          const isClosed = row?.original?.status == PropertyStatus.CLOSED;

          return (
            <div className="flex items-center gap-md">
              {/* edit */}
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    to={`/listing/edit/${row?.original?.property_id}`}
                    className={`${
                      isSameUser && !isClosed ? "" : "pointer-events-none"
                    }`}
                    aria-disabled={!isSameUser || isClosed}
                  >
                    <Button
                      size={"icon"}
                      className="bg-green"
                      disabled={!isSameUser || isClosed}
                    >
                      <PiPencilSimpleBold />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>تعديل</TooltipContent>
              </Tooltip>

              {/* delete */}
              {hasPermissions(["admin"]) ? (
                <Tooltip>
                  <TooltipTrigger>
                    <div>
                      <Button
                        size={"icon"}
                        className="bg-red"
                        disabled={
                          (deleteListing?.isPending &&
                            deleteListing?.variables?.id ==
                              row?.original?.property_id) ||
                          isClosed
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteListing(row?.original?.property_id);
                        }}
                      >
                        <PiTrashSimpleBold />
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>حذف</TooltipContent>
                </Tooltip>
              ) : null}

              {/* details */}
              <Tooltip>
                <TooltipTrigger>
                  <Link to={`/listing/details/${row?.original?.property_id}`}>
                    <Button size={"icon"}>
                      <PiInfoBold />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>تفاصيل</TooltipContent>
              </Tooltip>
            </div>
          );
        },
        size: 25,
        enableSorting: false,
      },
    ],
    [handleDeleteListing, deleteListing]
  );

  // filter config
  const filter: Filters = useMemo(
    () => [
      {
        id: "city",
        type: "select",
        label: "المدينة",
        title: "المدينة",
        searchKey: "city",
        options: cityChoices,
      },
      {
        id: "area",
        type: "text",
        label: "الحي",
        title: "الحي",
        searchKey: "area",
      },
      {
        id: "min_price",
        type: "number",
        label: "السعر الأدنى",
        title: "السعر الأدنى",
        searchKey: "min_price",
      },
      {
        id: "max_price",
        type: "number",
        label: "السعر الأعلى",
        title: "السعر الأعلى",
        searchKey: "max_price",
      },
      {
        id: "status_filter",
        type: "select",
        label: "الحالة",
        title: "الحالة",
        searchKey: "status_filter",
        options: STATUS_WITH_CLOSED,
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
          filters={filter}
          data={(allListings ?? []) as Listing[]}
          query={allListingsQuery}
          totalPageCount={totalPages}
          searchKey="mls_num"
          searchPlaceholder="بحث عن MLS ..."
          searchType="number"
        />
      </PageContainer>
    </AnimateContainer>
  );
}

export default AllListings;
