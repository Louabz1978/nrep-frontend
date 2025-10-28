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

import { FaFolderPlus, FaPlus } from "react-icons/fa6";

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

import useUpdateCounty from "@/hooks/admin/locations/useUpdateCounty";

type CountyOrFormRow =
  | County
  | { county_id: number; isForm: true; title: string };

const CountyTable = () => {
  const { counties, countiesQuery } = useGetCounties();

  const { handleEditCounty, updateCountyMutation } = useUpdateCounty();

  const { handleDeleteCounty, deleteCountyMutation } = useDeleteCounty();

  const { handleAddCounty, createCountyMutation } = useCreateCounty();

  const totalPages = countiesQuery?.data?.pagination?.total_pages || 1;

  const [isAddingNew, setIsAddingNew] = useState(false);

  const [editingRowId, setEditingRowId] = useState<number | null>(null);

  const form = useForm<CountyForm>({
    resolver: joiResolver(countySchema),

    defaultValues: countyInitialValues,

    mode: "onChange",
  });

  useEffect(() => {
    if (isAddingNew && !form.getValues().title) {
      form.reset(countyInitialValues);
    }
  }, [isAddingNew, form]);

  const handleSaveCounty = useCallback(async () => {
    const values = form.getValues();

    if (values.title?.trim()) {
      await handleAddCounty({ title: values.title.trim() });

      setIsAddingNew(false);

      form.reset(countyInitialValues);
    }
  }, [form, handleAddCounty]);

  const handleCancelAdd = useCallback(() => {
    setIsAddingNew(false);

    form.reset(countyInitialValues);
  }, [form]);

  const handleStartEdit = useCallback(
    (row: County) => {
      setEditingRowId(row.county_id);

      form.reset({ title: row.title });

      setIsAddingNew(false);
    },

    [form]
  );

  const handleSaveUpdate = useCallback(
    async (county_id: number) => {
      const values = form.getValues();

      if (values.title?.trim()) {
        await handleEditCounty({
          county_id,

          payload: { title: values.title.trim() },
        });

        setEditingRowId(null);

        form.reset(countyInitialValues);
      }
    },

    [form, handleEditCounty]
  );

  const handleCancelEdit = useCallback(() => {
    setEditingRowId(null);

    form.reset(countyInitialValues);
  }, [form]);

  const columns: ColumnDef<CountyOrFormRow>[] = useMemo(
    () => [
      {
        id: "select",

        header: ({ table }) => (
          <Checkbox
            className="ms-2 bg-tertiary-bg"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            // --- FIX: Disable header checkbox during add/edit/processing ---

            disabled={
              isAddingNew ||
              editingRowId !== null ||
              createCountyMutation.isPending ||
              updateCountyMutation.isPending ||
              deleteCountyMutation.isPending
            }
          />
        ),

        cell: ({ row }) => {
          const isEditing =
            (row.original as County)?.county_id === editingRowId;

          const isForm = "isForm" in row.original && row.original.isForm;

          if (isEditing || isForm) {
            return (
              <Checkbox
                className="ms-2 bg-white"
                disabled={true}
                aria-label="Select row disabled"
              />
            );
          }

          return "county_id" in row.original ? (
            <Checkbox
              className="ms-2 bg-white"
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
              // --- FIX: Disable row checkbox during add/edit/processing ---

              disabled={
                isAddingNew ||
                editingRowId !== null ||
                createCountyMutation.isPending ||
                updateCountyMutation.isPending ||
                deleteCountyMutation.isPending
              }
            />
          ) : (
            <span />
          );
        },

        enableSorting: false,

        enableHiding: false,

        size: 4,

        minSize: 4,
      },

      {
        id: "title",

        header: "اسم المحافظة",

        cell: ({ row }) => {
          const isEditing =
            (row.original as County)?.county_id === editingRowId;

          const isForm = "isForm" in row.original && row.original.isForm;

          if (isForm) {
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

          if (isEditing) {
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

          if ("county_id" in row.original && !isForm) {
            return row.original.title;
          }

          return "";
        },
      },

      {
        id: "action",

        header: "الإجراء",

        cell: ({ row }) => {
          const original = row.original as CountyOrFormRow;

          const isEditing = (original as County)?.county_id === editingRowId;

          const isForm = "isForm" in original && original.isForm;

          const isProcessing =
            createCountyMutation.isPending ||
            updateCountyMutation.isPending ||
            deleteCountyMutation.isPending;

          // New row for input (CREATE mode):

          if (isForm) {
            return (
              <div className="flex items-center gap-md">
                {/* Save button */}

                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      size={"icon"}
                      className="bg-transparent !text-primary"
                      disabled={!form.watch("title")?.trim() || isProcessing}
                      onClick={handleSaveCounty}
                    >
                      <FaFolderPlus size={22} />
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
                      disabled={isProcessing}
                      onClick={handleCancelAdd}
                    >
                      <FaTimes className="text-size25" />
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent>إلغاء</TooltipContent>
                </Tooltip>
              </div>
            );
          }

          // Row in EDIT mode

          if (isEditing) {
            return (
              <div className="flex items-center gap-md">
                {/* Save UPDATE button */}

                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      size={"icon"}
                      className="bg-transparent !text-primary"
                      disabled={!form.watch("title")?.trim() || isProcessing}
                      onClick={() => handleSaveUpdate(original.county_id)}
                    >
                      <FaCheck className="text-size25" />
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent>حفظ التعديل</TooltipContent>
                </Tooltip>

                {/* Cancel EDIT button */}

                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      size={"icon"}
                      className="bg-transparent !text-umber-light"
                      disabled={isProcessing}
                      onClick={handleCancelEdit}
                    >
                      <FaTimes className="text-size25" />
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent>إلغاء التعديل</TooltipContent>
                </Tooltip>
              </div>
            );
          }

          // Existing county row (DISPLAY mode)

          return (
            <div className="flex items-center gap-md">
              {/* edit */}

              <Tooltip>
                <TooltipTrigger>
                  <Button
                    type="button"
                    size={"icon"}
                    className="bg-transparent !text-primary"
                    onClick={() => handleStartEdit(original as County)}
                    disabled={
                      isProcessing || isAddingNew || editingRowId !== null
                    }
                  >
                    <FiEdit className="text-size25" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>تعديل</TooltipContent>
              </Tooltip>

              {/* delete */}

              <Tooltip>
                <TooltipTrigger>
                  <div>
                    <Button
                      type="button"
                      size={"icon"}
                      className={`bg-transparent`}
                      onClick={() =>
                        handleDeleteCounty({ id: Number(original.county_id) })
                      }
                      disabled={
                        isProcessing || isAddingNew || editingRowId !== null
                      }
                    >
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
                    to={`/admin/county/${(original as County).county_id}`}
                    style={{
                      pointerEvents:
                        isProcessing || isAddingNew || editingRowId !== null
                          ? "none"
                          : "auto",
                    }}
                  >
                    <Button
                      type="button" // <-- FIX 1: Added type="button"
                      className="bg-transparent !text-golden-medium"
                      size={"icon"}
                      disabled={
                        isProcessing || isAddingNew || editingRowId !== null
                      }
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

    [
      form,
      editingRowId,
      isAddingNew,
      createCountyMutation.isPending,
      updateCountyMutation.isPending,
      deleteCountyMutation.isPending,
    ]
  );

  const data: CountyOrFormRow[] = isAddingNew
    ? [
        ...(counties ?? []),

        {
          county_id: -1,

          isForm: true,

          title: form.watch("title") ?? "",
        },
      ]
    : counties ?? [];

  // Dynamic form submit handler for Enter key

  const onSubmit = () => {
    if (isAddingNew) {
      handleSaveCounty();
    } else if (editingRowId) {
      handleSaveUpdate(editingRowId);
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DataTable
          location={true}
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

          setEditingRowId(null);

          form.reset(countyInitialValues);
        }}
        disabled={
          isAddingNew ||
          editingRowId !== null ||
          createCountyMutation.isPending ||
          updateCountyMutation.isPending
        }
      >
        <FaPlus /> إضافة محافظة
      </Button>
    </div>
  );
};

export default CountyTable;
