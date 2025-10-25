import { useMemo } from "react";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { Checkbox } from "@/components/global/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import type { City } from "@/types/admin/location";
import useGetCities from "@/hooks/admin/locations/useGetCities";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/global/tooltip/Tooltiop";
import { Button } from "@/components/global/form/button/Button";
import { FaCheck } from "react-icons/fa6";
import { FaRegTrashAlt, FaTimes } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";


const CityTable = () => {
  const { cities, citiesQuery } = useGetCities();
  const totalPages = citiesQuery?.data?.pagination?.total_pages || 1;

  const columns: ColumnDef<City>[] = useMemo(
    () => [
      {
        id: "select",
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
        size: 4,
        minSize: 4,
      },
      { accessorKey: "title", header: "اسم المدينة" },
      {
        id: "action",
        header: "الإجراء",
        cell: ({ row }) => {
          // Check if this is the new row being added
          if (row.original.city_id === -1) {
            return (
              <div className="flex items-center gap-md">
                {/* Save button */}
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      size={"icon"}
                      className="bg-transparent !text-green-600"
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
                      size={"icon"}
                      className="bg-transparent !text-red-600"
                    >
                      <FaTimes className="text-size25" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>إلغاء</TooltipContent>
                </Tooltip>
              </div>
            );
          }

          return (
            <div className="flex items-center gap-md">
              {/* edit */}
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size={"icon"}
                    className="bg-transparent !text-[#428177]"
                  >
                    <FiEdit className="text-size25" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>تعديل</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <div>
                    <Button size={"icon"} className={`bg-transparent`}>
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
    []
  );

  return (
    <DataTable
      report={true}
      prefix={TABLE_PREFIXES.cities}
      columns={columns}
      data={( cities) ?? []}
      query={citiesQuery}
      totalPageCount={totalPages}
    />
  );
};

export default CityTable;
