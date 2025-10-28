import { useMemo, useState, useCallback, useEffect } from "react";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { Checkbox } from "@/components/global/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import type { Area } from "@/types/admin/location";
import useGetAreas from "@/hooks/admin/locations/useGetAreas";
import { Button } from "@/components/global/form/button/Button";
import { FaCheck, FaFolderPlus, FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt, FaTimes } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import useCreateArea from "@/hooks/admin/locations/useCreateArea";
import useUpdateArea from "@/hooks/admin/locations/useUpdateArea";
import useDeleteArea from "@/hooks/admin/locations/useDeleteArea";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Input from "@/components/global/form/input/Input";
import {
  areaInitialValues,
  areaSchema,
  type AreaForm,
} from "@/data/admin/schema/LocationSchemas";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/global/tooltip/Tooltiop";

type AreaOrFormRow = Area | { area_id: number; isForm: true; title: string };

// --- MODIFIED: Removed AreaTableProps and city_id prop ---
const AreaTable = () => {
  const { areas, areasQuery , totalPages} = useGetAreas();

  // --- Mutations ---
  const { handleAddArea, createAreaMutation } = useCreateArea();
  const { handleEditArea, updateAreaMutation } = useUpdateArea();
  const { handleDeleteArea, deleteAreaMutation } = useDeleteArea();

  // --- State ---
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);

  // --- Form ---
  const form = useForm<AreaForm>({
    resolver: joiResolver(areaSchema),
    defaultValues: areaInitialValues,
    mode: "onChange",
  });

  // Reset form when starting a new add
  useEffect(() => {
    if (isAddingNew && !form.getValues().title) {
      form.reset(areaInitialValues);
    }
  }, [isAddingNew, form]);

  // --- Handlers ---

  const handleSaveArea = useCallback(async () => {
    const values = form.getValues();
    // --- MODIFIED: Get city_id from existing area data ---
    const cityId = areas?.[0]?.city_id;

    if (values.title?.trim() && cityId) {
      await handleAddArea({
        title: values.title.trim(),
        city_id: cityId, // --- MODIFIED: Use inferred cityId
      });
      setIsAddingNew(false);
      form.reset(areaInitialValues);
    } else if (!cityId) {
      // This will happen if the 'areas' array is empty
      console.warn(
        "Cannot add area: No existing city_id found to reference."
      );
    }
  }, [form, handleAddArea, areas]); // --- MODIFIED: Add 'areas' to dependency array

  const handleCancelAdd = useCallback(() => {
    setIsAddingNew(false);
    form.reset(areaInitialValues);
  }, [form]);

  const handleStartEdit = useCallback(
    (row: Area) => {
      setEditingRowId(row.area_id);
      form.reset({ title: row.title });
      setIsAddingNew(false); // Ensure add mode is off
    },
    [form]
  );

  // --- THIS FUNCTION IS ALREADY CORRECT and does what you asked ---
  const handleSaveUpdate = useCallback(
    async (area_id: number) => {
      const values = form.getValues();
      // Finds the original area to get its city_id
      const areaToUpdate = areas?.find((a) => a.area_id === area_id);

      if (values.title?.trim() && areaToUpdate) {
        await handleEditArea({
          area_id: areaToUpdate.area_id,
          payload: {
            title: values.title.trim(),
            city_id: areaToUpdate.city_id, // Uses the city_id from the existing area
          },
        });
        setEditingRowId(null);
        form.reset(areaInitialValues);
      }
    },
    [form, handleEditArea, areas] // 'areas' is already in dependency array
  );

  const handleCancelEdit = useCallback(() => {
    setEditingRowId(null);
    form.reset(areaInitialValues);
  }, [form]);

  // --- Columns ---
  const columns: ColumnDef<AreaOrFormRow>[] = useMemo(
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
            disabled={
              isAddingNew ||
              editingRowId !== null ||
              createAreaMutation.isPending ||
              updateAreaMutation.isPending ||
              deleteAreaMutation.isPending
            }
          />
        ),
        cell: ({ row }) => {
          const isEditing =
            (row.original as Area)?.area_id === editingRowId;
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

          return "area_id" in row.original ? (
            <Checkbox
              className="ms-2 bg-tertiary-bg"
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
              disabled={
                isAddingNew ||
                editingRowId !== null ||
                createAreaMutation.isPending ||
                updateAreaMutation.isPending ||
                deleteAreaMutation.isPending
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
        header: "اسم المنطقة",
        cell: ({ row }) => {
          const isEditing =
            (row.original as Area)?.area_id === editingRowId;
          const isForm = "isForm" in row.original && row.original.isForm;

          if (isForm) {
            return (
              <div className="w-full">
                <Input
                  form={form}
                  name="title"
                  placeholder="أدخل اسم المنطقة"
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
                  placeholder="أدخل اسم المنطقة"
                  addingStyle="w-full"
                  addingInputStyle="w-full"
                />
              </div>
            );
          }

          if ("area_id" in row.original && !isForm) {
            return row.original.title;
          }

          return "";
        },
      },
      {
        id: "action",
        header: "الإجراء",
        cell: ({ row }) => {
          const original = row.original as AreaOrFormRow;
          const isEditing = (original as Area)?.area_id === editingRowId;
          const isForm = "isForm" in original && original.isForm;

          const isProcessing =
            createAreaMutation.isPending ||
            updateAreaMutation.isPending ||
            deleteAreaMutation.isPending;

          // --- New row for input (CREATE mode) ---
          if (isForm) {
            return (
              <div className="flex items-center gap-md">
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      size={"icon"}
                      className="bg-transparent !text-primary"
                      disabled={
                        !form.watch("title")?.trim() ||
                        isProcessing ||
                        !areas?.[0]?.city_id // --- MODIFIED: Disable if no city_id is available
                      }
                      onClick={handleSaveArea}
                    >
                      <FaFolderPlus size={22} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>حفظ</TooltipContent>
                </Tooltip>

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

          // --- Row in EDIT mode ---
          if (isEditing) {
            return (
              <div className="flex items-center gap-md">
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      size={"icon"}
                      className="bg-transparent !text-primary"
                      disabled={!form.watch("title")?.trim() || isProcessing}
                      onClick={() => handleSaveUpdate(original.area_id)}
                    >
                      <FaCheck className="text-size25" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>حفظ التعديل</TooltipContent>
                </Tooltip>

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

          // --- Existing area row (DISPLAY mode) ---
          return (
            <div className="flex items-center gap-md">
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    type="button"
                    size={"icon"}
                    className="bg-transparent !text-primary"
                    onClick={() => handleStartEdit(original as Area)}
                    disabled={
                      isProcessing || isAddingNew || editingRowId !== null
                    }
                  >
                    <FiEdit className="text-size25" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>تعديل</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <div>
                    <Button
                      type="button"
                      size={"icon"}
                      className={`bg-transparent`}
                      onClick={() =>
                        handleDeleteArea({ id: Number(original.area_id) })
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
      createAreaMutation.isPending,
      updateAreaMutation.isPending,
      deleteAreaMutation.isPending,
    ]
  );

  // --- Data for Table ---
  const data: AreaOrFormRow[] = isAddingNew
    ? [
        ...(areas ?? []),
        {
          area_id: -1,
          isForm: true,
          title: form.watch("title") ?? "",
        },
      ]
    : areas ?? [];

  // --- Dynamic Form Submit (for Enter key) ---
  const onSubmit = () => {
    if (isAddingNew) {
      handleSaveArea();
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
          prefix={TABLE_PREFIXES.areas}
          columns={columns}
          data={data}
          query={areasQuery}
          totalPageCount={totalPages}
        />
      </form>

      {/* "Add Area" Button */}
      <Button
        className="mt-5xl"
        onClick={() => {
          setIsAddingNew(true);
          setEditingRowId(null);
          form.reset(areaInitialValues);
        }}
        disabled={
          isAddingNew ||
          editingRowId !== null ||
          createAreaMutation.isPending ||
          updateAreaMutation.isPending
        }
      >
        <FaPlus /> إضافة منطقة
      </Button>
    </div>
  );
};

export default AreaTable;
