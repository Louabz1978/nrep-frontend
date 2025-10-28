import { useMemo, useState, useCallback, useEffect } from "react";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { Checkbox } from "@/components/global/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import type { Area, City } from "@/types/admin/location"; // Import City
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
// --- MODIFIED: Import Select component (assumed path) ---
import Select from "@/components/global/form/select/Select";
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
import useGetCities from "@/hooks/admin/locations/useGetCities";

type AreaOrFormRow = Area | { area_id: number; isForm: true; title: string };

const AreaTable = () => {
  const { areas, areasQuery, totalPages } = useGetAreas();
  // --- MODIFIED: Get cities for the select dropdown ---
  const { cities } = useGetCities();
console.log(cities)

  // --- Mutations ---
  const { handleAddArea, createAreaMutation } = useCreateArea();
  const { handleEditArea, updateAreaMutation } = useUpdateArea();
  const { handleDeleteArea, deleteAreaMutation } = useDeleteArea();

  // --- State ---
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);


  // --- Form ---
  // --- MODIFIED: Updated useForm to use new defaults ---
  // ASSUMPTION: You updated AreaForm and areaSchema to include 'city_id'
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
  }, [isAddingNew, form, areaInitialValues]);

  // --- MODIFIED: Prepare city options for Select component ---
  const citiesOptions = useMemo(() => {
    return (cities ?? []).map((city: City) => ({
      value: city.city_id,
      label: city.title,
    }));
  }, [cities]);

  // --- Handlers ---

  // --- MODIFIED: handleSaveArea now uses city_id from form ---
  const handleSaveArea = useCallback(async () => {
    const values = form.getValues();
    if (values.title?.trim() && values.city_id) {
      await handleAddArea({
        title: values.title.trim(),
        city_id: Number(values.city_id), // Use city_id from form
      });
      setIsAddingNew(false);
      form.reset(areaInitialValues);
    }
  }, [form, handleAddArea, areaInitialValues]);

  const handleCancelAdd = useCallback(() => {
    setIsAddingNew(false);
    form.reset(areaInitialValues);
  }, [form, areaInitialValues]);

  // --- MODIFIED: handleStartEdit now resets city_id in form ---
  const handleStartEdit = useCallback(
    (row: Area) => {
      setEditingRowId(row.area_id);
      form.reset({ title: row.title, city_id: row.city_id });
      setIsAddingNew(false);
    },
    [form]
  );

  // --- MODIFIED: handleSaveUpdate now uses city_id from form ---
  const handleSaveUpdate = useCallback(
    async (area_id: number) => {
      const values = form.getValues();
      if (values.title?.trim() && values.city_id) {
        await handleEditArea({
          area_id: area_id,
          payload: {
            title: values.title.trim(),
            city_id: Number(values.city_id), // Use city_id from form
          },
        });
        setEditingRowId(null);
        form.reset(areaInitialValues);
      }
    },
    [form, handleEditArea, areaInitialValues]
  );

  const handleCancelEdit = useCallback(() => {
    setEditingRowId(null);
    form.reset(areaInitialValues);
  }, [form, areaInitialValues]);

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

          if (isForm || isEditing) {
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
      // --- MODIFIED: Added City Name column ---
      {
        id: "city_name",
        header: "اسم المدينة",
        cell: ({ row }) => {
          const isEditing =
            (row.original as Area)?.area_id === editingRowId;
          const isForm = "isForm" in row.original && row.original.isForm;

          // Show Select for new row or editing row
          if (isForm || isEditing) {
            return (
              <div className="w-full">
                <Select
                  form={form}
                  name="city_id"
                  placeholder="اختر مدينة"
                  choices={cities}
                  showValue="title"
                  keyValue="city_id"
                  addingStyle="w-full"
                />
              </div>
            );
          }

          // Show text for existing row
          if ("area_id" in row.original && !isForm) {
            const city = cities?.find(
              (c: City) => c.city_id === row.original.city_id
            );
            return city?.title ?? "---";
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
                      // --- MODIFIED: Disable logic
                      disabled={
                        !form.watch("title")?.trim() ||
                        !form.watch("city_id") ||
                        isProcessing
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
                      // --- MODIFIED: Disable logic
                      disabled={
                        !form.watch("title")?.trim() ||
                        !form.watch("city_id") ||
                        isProcessing
                      }
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
          form.reset(newAreaInitialValues); // --- MODIFIED: Use new initial values
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
