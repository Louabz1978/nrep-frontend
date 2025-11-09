import { Button } from "@/components/global/form/button/Button";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable, type Filters } from "@/components/global/table2/table";
import { Checkbox } from "@/components/global/ui/checkbox";
import {
  cityChoices,
  PropertyStatus,
  STATUS_WITH_CLOSED,
  TransType,
} from "@/data/global/select";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useDeleteListings } from "@/hooks/website/listing/useDeleteListing";
import useMyListings from "@/hooks/website/listing/useMyListings";
import type { Listing } from "@/types/website/listings";
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/global/tooltip/Tooltiop";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@/stores/useUser";
import StatusForm from "../allListings.tsx/StatusForm";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { TfiInfoAlt } from "react-icons/tfi";
import useGetArea from "@/hooks/website/listing/useGetArea";
import useGetCities from "@/hooks/website/listing/useGetCities";

function MyListings() {
  // user information
  const { hasPermissions } = useUser();

  // get my listings
  const { myListings, myListingsQuery, totalPages } = useMyListings();

  // handle delete listing methods
  const { deleteListing, handleDeleteListing } = useDeleteListings();

  const { Area} = useGetArea();
  const {cities} = useGetCities()

  // listing item columns
  const listingColumns: ColumnDef<Listing>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            className="ms-2 bg-whit  "
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
            className="ms-2 bg-white"
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
        id: "trans_type",
        header: "نوع العرض",
        accessorKey: "trans_type",
        cell: ({ row }) => {
          const transTypeValue = row?.original?.trans_type;
          const trans_type = TransType?.find(
            (item) => item?.value == transTypeValue
          )?.label;
          return (
            <span className="inline-flex items-center justify-center px-3xl py-md rounded-full text-sm font-medium bg-[#ADA7A7]/25">
              {trans_type}
            </span>
          );
        },
        size: 10,
      },
      {
        id: "action",
        header: "الإجراء",
        cell: ({ row }) => {
          const isClosed = row?.original?.status == PropertyStatus.CLOSED;

          return (
            <div className="flex items-center gap-md">
              {/* edit */}
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    to={`/listing/edit/${row?.original?.property_id}`}
                    className={`${
                      !isClosed ? "cursor-not-allowed" : "pointer-events-none"
                    }`}
                    aria-disabled={isClosed}
                  >
                    <Button
                      size={"icon"}
                      className="bg-transparent !text-primary"
                      disabled={isClosed}
                    >
                      <FiEdit className="text-size25" />
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
                        className={`bg-transparent`}
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
                        <FaRegTrashAlt className="text-size25 text-[#6B1F2A]" />
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
                    <Button
                      className="bg-transparent !text-[#988561]"
                      size={"icon"}
                    >
                      <TfiInfoAlt className="text-size28" />
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
        options:
          cities?.map((city: any) => ({
            label: city.title,
            value: city.city_id,
          })) ?? [],
      },
      {
        id: "area",
        type: "select",
        label: "الحي",
        title: "الحي",
        searchKey: "area",
        options:
          Area?.map((country: any) => ({
            label: country.title,
            value: country.area_id,
          })) ?? [],
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
    [cities , Area]
  );

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="mb-5xl">
          <h1 className="text-size30 font-medium">عقاراتي</h1>
          <h3 className="text-size24 mb-2xl">يتم عرض جميع عقاراتي المضافة</h3>
          <hr />
        </div>
        <DataTable
          prefix={TABLE_PREFIXES.myListings}
          columns={listingColumns}
          filters={filter}
          data={(myListings ?? []) as Listing[]}
          query={myListingsQuery}
          totalPageCount={totalPages}
          searchKey="mls_num"
          searchPlaceholder="بحث عن MLS ..."
          searchType="number"
          showActionButtons={true}
          show
          to="/listing/add"
          addLabel="إضافة عقار"
        />
      </PageContainer>
    </AnimateContainer>
  );
}

export default MyListings;
