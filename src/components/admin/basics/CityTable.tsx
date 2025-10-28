import { useMemo, useState, useCallback, useEffect } from "react";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { Checkbox } from "@/components/global/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import type { City } from "@/types/admin/location";
import useGetCities from "@/hooks/admin/locations/useGetCities";
import { Button } from "@/components/global/form/button/Button";
import { FaCheck, FaFolderPlus, FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt, FaTimes } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import useCreateCity from "@/hooks/admin/locations/useCreateCity";
import useUpdateCity from "@/hooks/admin/locations/useUpdateCity";
import useDeleteCity from "@/hooks/admin/locations/useDeleteCity";
import { useForm } from "react-hook-form";
import {
  cityInitialValues, // Assuming this exists, similar to countyInitialValues
  citySchema, // Assuming this exists, similar to countySchema
  type CityForm, // Assuming this exists, similar to CountyForm
} from "@/data/admin/schema/LocationSchemas"; // Assuming this path
import { joiResolver } from "@hookform/resolvers/joi";
import Input from "@/components/global/form/input/Input"; // Assuming this path
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/global/tooltip/Tooltiop";
import { useParams } from "react-router-dom";

// Define a union type to include both existing cities and the new row form
type CityOrFormRow = City | { city_id: number; isForm: true; title: string };

const CityTable = () => {
  const { id } = useParams();

  const { cities, citiesQuery } = useGetCities();
  const totalPages = citiesQuery?.data?.pagination?.total_pages || 1;

  // Get mutation hooks
  const { handleAddCity, createCityMutation } = useCreateCity();
  const { handleEditCity, updateCityMutation } = useUpdateCity();
  const { handleDeleteCity, deleteCityMutation } = useDeleteCity();

  // State for inline editing
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);

  // React Hook Form setup
  const form = useForm<CityForm>({
    resolver: joiResolver(citySchema),
    defaultValues: cityInitialValues,
    mode: "onChange",
  });

  // Reset form when adding new row
  useEffect(() => {
    if (isAddingNew && !form.getValues().title) {
      form.reset(cityInitialValues);
    }
  }, [isAddingNew, form]);

  // --- Handlers ---

  const handleSaveCity = useCallback(async () => {
    const values = form.getValues();
    if (values.title?.trim()) {
      await handleAddCity({
        title: values.title.trim(),
        county_id: Number(id),
      });
      setIsAddingNew(false);
      form.reset(cityInitialValues);
    }
  }, [form, handleAddCity, id]); // <-- FIX: Added 'id' to dependency array

  const handleCancelAdd = useCallback(() => {
    setIsAddingNew(false);
    form.reset(cityInitialValues);
  }, [form]);

  const handleStartEdit = useCallback(
    (row: City) => {
      setEditingRowId(row.city_id);
      form.reset({ title: row.title });
      setIsAddingNew(false);
    },
    [form]
  );

  const handleSaveUpdate = useCallback(
    async (city_id: number) => {
      const values = form.getValues();
      if (values.title?.trim()) {
        await handleEditCity({
          city_id,
          payload: {
            title: values.title.trim(),
            county_id: Number(id),
          },
        });
        setEditingRowId(null);
        form.reset(cityInitialValues);
      }
    },
    [form, handleEditCity, id] // <-- FIX: Added 'id' to dependency array
  );

  const handleCancelEdit = useCallback(() => {
    setEditingRowId(null);
    form.reset(cityInitialValues);
  }, [form]);

  const columns: ColumnDef<CityOrFormRow>[] = useMemo(
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
            // Disable header checkbox during add/edit/processing
            disabled={
              isAddingNew ||
              editingRowId !== null ||
              createCityMutation.isPending ||
              updateCityMutation.isPending ||
              deleteCityMutation.isPending
            }
          />
        ),
        cell: ({ row }) => {
          const isEditing = (row.original as City)?.city_id === editingRowId;
          const isForm = "isForm" in row.original && row.original.isForm;

          if (isEditing || isForm) {
            return (
              <Checkbox
                className="ms-2 bg-tertiary-bg"
                disabled={true}
                aria-label="Select row disabled"
              />
            );
          }

          return "city_id" in row.original ? (
            <Checkbox
              className="ms-2 bg-tertiary-bg"
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
              // Disable row checkbox during add/edit/processing
              disabled={
                isAddingNew ||
                editingRowId !== null ||
                createCityMutation.isPending ||
                updateCityMutation.isPending ||
                deleteCityMutation.isPending
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
        accessorKey: "title",
        header: "اسم المدينة",
        cell: ({ row }) => {
          const isEditing = (row.original as City)?.city_id === editingRowId;
          const isForm = "isForm" in row.original && row.original.isForm;

          if (isForm || isEditing) {
            return (
              <div className="w-full">
                <Input
                  form={form}
                  name="title"
                  placeholder="أدخل اسم المدينة"
                  addingStyle="w-full"
                  addingInputStyle="w-full"
                />
              </div>
            );
          }

          if ("city_id" in row.original && !isForm) {
            return row.original.title;
          }

          return "";
        },
      },
      {
        id: "action",
        header: "الإجراء",
        cell: ({ row }) => {
          const original = row.original as CityOrFormRow;
          const isEditing = (original as City)?.city_id === editingRowId;
          const isForm = "isForm" in original && original.isForm;

          const isProcessing =
            createCityMutation.isPending ||
            updateCityMutation.isPending ||
            deleteCityMutation.isPending;

          // New row for input (CREATE mode)
          if (isForm) {
            return (
              <div className="flex items-center gap-md">
                {/* Save button (Create) */}
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      size={"icon"}
                      className="bg-transparent !text-primary"
                      disabled={!form.watch("title")?.trim() || isProcessing}
                      onClick={handleSaveCity}
                    >
                      <FaFolderPlus size={22} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>حفظ</TooltipContent>
                </Tooltip>

                {/* Cancel button (Create) */}
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
                {/* Save button (Update) */}
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      size={"icon"}
                      className="bg-transparent !text-primary"
                      disabled={!form.watch("title")?.trim() || isProcessing}
                      onClick={() => handleSaveUpdate(original.city_id)}
                    >
                      <FaCheck className="text-size25" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>حفظ التعديل</TooltipContent>
                </Tooltip>

                {/* Cancel button (Update) */}
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

          // Existing city row (DISPLAY mode)
          return (
            <div className="flex items-center gap-md">
              {/* Edit button */}
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    type="button"
                    size={"icon"}
                    className="bg-transparent !text-primary"
                    onClick={() => handleStartEdit(original as City)}
                    disabled={
                      isProcessing || isAddingNew || editingRowId !== null
                    }
                  >
                    <FiEdit className="text-size25" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>تعديل</TooltipContent>
              </Tooltip>

              {/* Delete button */}
              <Tooltip>
                <TooltipTrigger>
                  <div>
                    <Button
                      type="button"
                      size={"icon"}
                      className={`bg-transparent`}
                      onClick={() =>
                        handleDeleteCity({ id: Number(original.city_id) })
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
      createCityMutation.isPending,
      updateCityMutation.isPending,
      deleteCityMutation.isPending,
    ]
  );

  // Dynamically create data array
  const data: CityOrFormRow[] = isAddingNew
    ? [
        ...(cities ?? []),
        {
          city_id: -1,
          isForm: true,
          title: form.watch("title") ?? "",
        },
      ]
    : cities ?? [];

  const onSubmit = () => {
    if (isAddingNew) {
      handleSaveCity();
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
          prefix={TABLE_PREFIXES.cities}
          columns={columns}
          data={data}
          query={citiesQuery}
          totalPageCount={totalPages}
        />
      </form>
      <Button
        className="mt-5xl"
        onClick={() => {
          setIsAddingNew(true);
          setEditingRowId(null);
          form.reset(cityInitialValues);
        }}
        disabled={
          isAddingNew ||
          editingRowId !== null ||
          createCityMutation.isPending ||
          updateCityMutation.isPending
        }
      >
        <FaPlus /> إضافة مدينة
      </Button>
    </div>
  );
};

export default CityTable;
