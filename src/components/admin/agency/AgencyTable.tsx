import { useMemo } from "react";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import type { ColumnDef } from "@tanstack/react-table";
import type { Agency } from "@/types/admin/agency";
import useGetAgencies from "@/hooks/admin/useGetAgencies";
import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { Checkbox } from "@/components/global/ui/checkbox";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/global/tooltip/Tooltiop";
import { Button } from "@/components/global/form/button/Button";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiInfoBold } from "react-icons/pi";
import useDeleteAgency from "@/hooks/admin/useDeleteAgency";
import { TfiInfoAlt } from "react-icons/tfi";

const AgencyTable = () => {
  const { agencies, agenciesQuery } = useGetAgencies();
  const totalPages = agenciesQuery?.data?.pagination?.total_pages || 1;
  const { deleteAgency, handleDeleteAgency } = useDeleteAgency();

  const columns: ColumnDef<Agency>[] = useMemo(
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
            onCheckedChange={(value: boolean) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            className="ms-2 bg-white"
            checked={row.getIsSelected()}
            onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        maxSize: 5,
      },
      {
        accessorKey: "name",
        header: "اسم الشركة",
        size: 20,
        minSize: 20,
      },
      {
        accessorKey: "email",
        header: "البريد الإلكتروني",
        size: 15,
        minSize: 15,
      },
      {
        accessorKey: "phone_number",
        header: "رقم الهاتف",
        size: 15,
        minSize: 15,
      },
      {
        accessorKey: "created_by.first_name",
        cell: ({ row }) => {
          return `${row?.original?.created_by?.first_name} ${row?.original?.created_by?.last_name}`.trim();
        },
        header: "أنشئت بواسطة",
        size: 15,
        minSize: 15,
      },
      {
        accessorKey: "address.city",
        header: "المدينة",
        size: 10,
        minSize: 10,
      },
      {
        id: "action",
        header: "الإجراء",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-md">
              {/* edit */}
              <Tooltip>
                <TooltipTrigger>
                  <Link to={`/admin/agencies/edit/${row?.original?.agency_id}`}>
                    <Button
                      size={"icon"}
                      className="bg-transparent !text-primary"
                    >
                      <FiEdit className="text-size25" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>تعديل</TooltipContent>
              </Tooltip>

              {/* delete */}
              <Tooltip>
                <TooltipTrigger>
                  <div>
                    <Button
                      size={"icon"}
                      className={`bg-transparent`}
                      disabled={
                        deleteAgency?.isPending &&
                        deleteAgency?.variables?.agency_id ==
                          row?.original?.agency_id
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteAgency({
                          agency_id: row?.original?.agency_id,
                        });
                      }}
                    >
                      <FaRegTrashAlt className="text-size25 text-[#6B1F2A]" />
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>حذف</TooltipContent>
              </Tooltip>

              {/* details */}
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    to={`/admin/agencies/details/${row?.original?.agency_id}`}
                  >
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
        size: 10,
        minSize: 10,
        enableSorting: false,
      },
    ],
    []
  );

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="space-y-6">
          <DataTable
            prefix={TABLE_PREFIXES.agencies}
            columns={columns}
            data={agencies ?? []}
            query={agenciesQuery}
            totalPageCount={totalPages}
            searchKey="name"
            searchPlaceholder="البحث عن طريق اسم الشركة"
            searchType="text"
            show={true}
            to="/admin/agencies/create"
            addLabel="إضافة شركة عقارية "
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default AgencyTable;
