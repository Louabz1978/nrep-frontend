import { useMemo, useState, useCallback, useEffect } from "react";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { Checkbox } from "@/components/global/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import type { County } from "@/types/admin/location";
import useGetCounties from "@/hooks/admin/locations/useGetCounties";
import useCreateCounty from "@/hooks/admin/locations/useCreateCounty";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/global/tooltip/Tooltiop";
import { Link } from "react-router-dom";
import { Button } from "@/components/global/form/button/Button";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { TfiInfoAlt } from "react-icons/tfi";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import {
  countyInitialValues,
  countySchema,
  type CountyForm,
} from "@/data/admin/schema/LocationSchemas";
import { joiResolver } from "@hookform/resolvers/joi";
import Input from "@/components/global/form/input/Input";
import useDeleteCounty from "@/hooks/admin/locations/useDeleteCounty";

type CountyOrFormRow =
  | County
  | { county_id: number; isForm: true; title: string };

const CountyTable = () => {
  const { counties, countiesQuery } = useGetCounties();
  const {handleDeleteCounty} = useDeleteCounty()
  const { handleAddCounty, createCountyMutation } = useCreateCounty();
  const totalPages = countiesQuery?.data?.pagination?.total_pages || 1;

  // State for new county creation
  const [isAddingNew, setIsAddingNew] = useState(false);

  const form = useForm<CountyForm>({
    resolver: joiResolver(countySchema),
    defaultValues: countyInitialValues,
    mode: "onChange", // Change to onBlur to prevent issues with onChange
  });

  // Debug form state


  // Ensure form state is maintained when adding new
  useEffect(() => {
    if (isAddingNew && !form.getValues().title) {
      // Only reset if the form is truly empty
      form.reset(countyInitialValues);
    }
  }, [isAddingNew, form]);

  // Handle saving new county from form input
  const handleSaveCounty = useCallback(async () => {
    const values = form.getValues();
    if (values.title?.trim()) {
      await handleAddCounty({ title: values.title.trim() });
      setIsAddingNew(false);
      form.reset(countyInitialValues);
    }
  }, [form, handleAddCounty]);

  // Cancel adding new
  const handleCancelAdd = useCallback(() => {
    setIsAddingNew(false);
    form.reset(countyInitialValues);
  }, [form]);

  const columns: ColumnDef<CountyOrFormRow>[] = useMemo(
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
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) =>
          "county_id" in row.original ? (
            <Checkbox
              className="ms-2 bg-white"
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          ) : (
            // Blank for input row
            <span />
          ),
        enableSorting: false,
        enableHiding: false,
        size: 4,
        minSize: 4,
      },

      {
        id: "title",
        header: "اسم المحافظة",
        cell: ({ row }) => {
          // New row for input:
          if ("isForm" in row.original && row.original.isForm) {
            return (
              <div className="w-full">
                <Input
                  form={form}
                  name="title"
                  placeholder="أدخل اسم المحافظة"
                  addingStyle="w-full"
                  addingInputStyle="w-full"
                />
              </div>
            );
          }
          // Existing county
          if ("county_id" in row.original && !("isForm" in row.original)) {
            return row.original.title;
          }
          return "";
        },
      },
      {
        id: "action",
        header: "الإجراء",
        cell: ({ row }) => {
          // New row for input:
          if ("isForm" in row.original && row.original.isForm) {
            return (
              <div className="flex items-center gap-md">
                {/* Save button */}
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      size={"icon"}
                      className="bg-transparent !text-primary"
                      disabled={
                        !form.watch("title")?.trim() ||
                        createCountyMutation.isPending
                      }
                      onClick={handleSaveCounty}
                    >
                      <FaCheck className="text-size25" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>حفظ</TooltipContent>
                </Tooltip>

                {/* Cancel button */}
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      size={"icon"}
                      className="bg-transparent !text-umber-light"
                      disabled={createCountyMutation.isPending}
                    >
                      <FaTimes className="text-size25" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>إلغاء</TooltipContent>
                </Tooltip>
              </div>
            );
          }

          // Existing county row
          return (
            <div className="flex items-center gap-md">
              {/* edit */}
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size={"icon"}
                    className="bg-transparent !text-primary"
                  >
                    <FiEdit className="text-size25" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>تعديل</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <div>
                    <Button size={"icon"} className={`bg-transparent`} onClick={()=>handleDeleteCounty(Number(row?.original?.county_id))}>
                      <FaRegTrashAlt className="text-size25 text-umber-light" />
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>حذف</TooltipContent>
              </Tooltip>

              {/* details */}
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    to={`/admin/county/${(row?.original as County)?.county_id}`}
                  >
                    <Button
                      className="bg-transparent !text-golden-medium"
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
    []
  );

  const data: CountyOrFormRow[] = isAddingNew
    ? [
        ...(counties ?? []),
        {
          county_id: -1, // Use -1 to distinguish from real counties
          isForm: true,
          title: form.watch("title") ?? "",
        },
      ]
    : counties ?? [];

  return (
    <div>
      <form
        onSubmit={form.handleSubmit(handleSaveCounty)}
      >
        <DataTable
          report={true}
          prefix={TABLE_PREFIXES.counties}
          columns={columns}
          data={data}
          query={countiesQuery}
          totalPageCount={totalPages}
        />
      </form>
      <Button
        className="mt-5xl"
        onClick={() => {
          setIsAddingNew(true);
          // Don't reset form immediately, let user start typing
        }}
        disabled={isAddingNew || createCountyMutation.isPending}
      >
        <FaPlus /> إضافة محافظة
      </Button>
    </div>
  );
};

export default CountyTable;
