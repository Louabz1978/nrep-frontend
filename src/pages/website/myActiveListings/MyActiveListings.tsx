import { Button } from "@/components/global/form/button/Button";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import { Checkbox } from "@/components/global/ui/checkbox";
import { PropertyStatus } from "@/data/global/select";
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
import { useMemo, useLayoutEffect, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@/stores/useUser";
import StatusForm from "../allListings.tsx/StatusForm";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { TfiInfoAlt } from "react-icons/tfi";
import useGetArea from "@/hooks/website/listing/useGetArea";
import useGetCities from "@/hooks/website/listing/useGetCities";
import { useQueryState, parseAsString } from "nuqs";
import { useForm } from "react-hook-form";
import {
  sharingListingsFilterInitialValues,
  sharingListingsFilterSchema,
  type SharingListingsFilterType,
} from "@/data/website/schema/SharingListingsFilter";
import { joiResolver } from "@hookform/resolvers/joi";
import Popup from "@/components/global/popup/Popup";
import Select from "@/components/global/form/select/Select";
import Range from "@/components/global/form/range/Range";
import { SlidersHorizontal } from "lucide-react";
import { FaXmark } from "react-icons/fa6";
import ValueCard from "@/components/global/valueCard/ValueCard";

function MyActiveListings() {
  // user information
  const { hasPermissions } = useUser();

  // Filter popup state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const form = useForm<SharingListingsFilterType>({
    resolver: joiResolver(sharingListingsFilterSchema),
    defaultValues: sharingListingsFilterInitialValues,
    mode: "onChange",
  });

  const [statusFilter, setStatusFilter] = useQueryState(
    `${TABLE_PREFIXES.myListings}_status_filter`,
    parseAsString
  );
  useLayoutEffect(() => {
    if (!statusFilter) {
      setStatusFilter(PropertyStatus.ACTIVE);
    }
  }, [statusFilter, setStatusFilter]);

  useEffect(() => {
    return () => {
      setStatusFilter(null, { history: "replace" });
    };
  }, [setStatusFilter]);

  // get my listings
  const { myListings, myListingsQuery, totalPages } = useMyListings();

  // handle delete listing methods
  const { deleteListing, handleDeleteListing } = useDeleteListings();

  const { Area } = useGetArea();
  const { cities } = useGetCities();

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
      // {
      //   id: "trans_type",
      //   header: "نوع العرض",
      //   accessorKey: "trans_type",
      //   cell: ({ row }) => {
      //     const transTypeValue = row?.original?.trans_type;
      //     const trans_type = TransType?.find(
      //       (item) => item?.value == transTypeValue
      //     )?.label;
      //     return (
      //       <span className="inline-flex items-center justify-center px-3xl py-md rounded-full text-sm font-medium bg-[#ADA7A7]/25">
      //         {trans_type}
      //       </span>
      //     );
      //   },
      //   size: 10,
      // }, // 'trans_type' does not exist on Listing, only ListingDetailsType
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
                        <FaRegTrashAlt className="text-size25 text-umber-light" />
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
    [handleDeleteListing, deleteListing, hasPermissions]
  );

  // Prepare options for Select components
  const cityOptions = useMemo(
    () =>
      (cities as Array<{ city_id: number; title: string }>)?.map((city) => ({
        value: city.city_id,
        label: city.title,
      })) ?? [],
    [cities]
  );

  const areaOptions = useMemo(
    () =>
      (Area as Array<{ area_id: number; title: string }>)?.map((area) => ({
        value: area.area_id,
        label: area.title,
      })) ?? [],
    [Area]
  );

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="mb-5xl">
          <div className="flex items-center justify-between mb-2xl">
            <div>
              <h1 className="text-size30 font-medium">عقاراتي</h1>
              <h3 className="text-size24">يتم عرض جميع عقاراتي المضافة</h3>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFilterOpen(true)}
              className="bg-transparent border-secondary-border hover:bg-secondary-bg"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>
          <hr />
        </div>
        <DataTable
          prefix={TABLE_PREFIXES.myListings}
          columns={listingColumns}
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

      {/* Filter Popup */}
      <Popup
        className="!w-120 bg-[var(--card-bg)]"
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      >
        <div className=" p-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-2xl">
            <h2 className="text-size24 font-semibold">
              البحث عن مواصفات خاصة :
            </h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-2 hover:bg-secondary-bg rounded-lg transition-colors"
            >
              <FaXmark className="text-size20" />
            </button>
          </div>

          {/* Filter Form */}
          <form
            className="flex flex-col gap-xl"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
              {/* City */}
              <Select
                form={form}
                name="city_id"
                label="المدينة"
                placeholder="اختر المدينة"
                choices={cityOptions}
                keyValue="value"
                showValue="label"
              />

              {/* Area */}
              <Select
                form={form}
                name="area_id"
                label="الحي"
                placeholder="اختر الحي"
                choices={areaOptions}
                keyValue="value"
                showValue="label"
              />
            </div>

            {/* Area Space Range */}
            <Range
              form={form}
              name="area_space"
              label="المساحة"
              min={0}
              max={1000}
              step={10}
              valueFormatter={(value) => `${value} m²`}
            />
            <div className="flex items-center justify-center gap-4xl">
              <ValueCard
                label="الحد الأعلى"
                value={Number(form.watch("area_space.max"))}
                unit="m²"
              />
              <div className="w-4 h-[1px] bg-golden-medium" />
              <ValueCard
                label="الحد الأدنى"
                value={Number(form.watch("area_space.min"))}
                unit="m²"
              />
            </div>
            {/* Price Range */}
            <Range
              form={form}
              name="price"
              label="السعر"
              min={0}
              max={1000000}
              step={10000}
              valueFormatter={(value) => `${value.toLocaleString()} $`}
            />
            <div className="flex items-center justify-center gap-4xl">
              <ValueCard
                label="الحد الأعلى"
                value={Number(form.watch("price.max"))}
                unit="$"
              />
              <div className="w-4 h-[1px] bg-golden-medium" />
              <ValueCard
                label="الحد الأدنى"
                value={Number(form.watch("price.min"))}
                unit="$"
              />
            </div>
            {/* Bedrooms Range */}
            <Range
              form={form}
              name="bedrooms"
              label="غرف النوم"
              min={0}
              max={10}
              step={1}
            />
            <div className="flex items-center justify-center gap-4xl">
              <ValueCard
                label="الحد الأعلى"
                value={Number(form.watch("bedrooms.max"))}
              />
              <div className="w-4 h-[1px] bg-golden-medium" />
              <ValueCard
                label="الحد الأدنى"
                value={Number(form.watch("bedrooms.min"))}
              />
            </div>
            {/* Bathrooms Range */}
            <Range
              form={form}
              name="bathrooms"
              label="دورات المياه"
              min={0}
              max={10}
              step={1}
            />
            <div className="flex items-center justify-center gap-4xl">
              <ValueCard
                label="الحد الأعلى"
                value={Number(form.watch("bathrooms.max"))}
              />
              <div className="w-4 h-[1px] bg-golden-medium" />
              <ValueCard
                label="الحد الأدنى"
                value={Number(form.watch("bathrooms.min"))}
              />
            </div>
            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-md mt-xl pt-xl">
              <Button type="submit" className="!px-6xl !rounded-xl">
                تأكيد
              </Button>
            </div>
          </form>
        </div>
      </Popup>
    </AnimateContainer>
  );
}

export default MyActiveListings;
