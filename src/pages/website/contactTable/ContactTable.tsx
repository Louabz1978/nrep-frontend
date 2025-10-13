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
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useDeleteContact } from "@/hooks/website/Contact/useDeleteContact";
import useGetAllContacts from "@/hooks/website/Contact/useGetAllContacts";
import { useUser } from "@/stores/useUser";

import type { ContactWithUser } from "@/types/website/contact";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

function ContactTable() {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // user information
  const { hasPermissions } = useUser();

  // get all contact
  const { allContacts, allContactsQuery, totalPages } = useGetAllContacts();

  // handle delete contact methods
  const { deleteContact, handleDeleteContact } = useDeleteContact();

  // contact item columns
  const ContactColumns: ColumnDef<ContactWithUser>[] = useMemo(
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
      {
        id: "name",
        accessorKey: "name",
        header: "الاسم",
        size: 15,
        minSize: 15,
      },
      {
        id: "surname",
        header: "النسبة",
        accessorKey: "surname",
        size: 15,
        minSize: 15,
      },
      {
        id: "father_name",
        header: "اسم الأب",
        accessorKey: "father_name",
        size: 15,
        minSize: 15,
      },
      {
        id: "phone_number",
        header: "رقم الهاتف",
        accessorKey: "phone_number",
        size: 15,
        minSize: 15,
      },
      {
        id: "email",
        header: "البريد الإلكتروني",
        accessorKey: "email",
        size: 25,
      },
      {
        id: "date_birth",
        header: "تاريخ الولادة",
        accessorKey: "date_birth",
        cell: ({ row }) => {
          return new Date(row?.original?.date_birth)?.toLocaleDateString();
        },
        size: 15,
        minSize: 15,
      },
      {
        id: "national_number",
        header: "الرقم الوطني",
        accessorKey: "national_number",
        size: 15,
        minSize: 15,
      },
      {
        id: "action",
        header: "الإجراء",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-md">
              {/* edit */}
              {hasPermissions(["admin"]) ? (
                <Tooltip>
                  <TooltipTrigger>
                    <Link to={`${isAdminRoute ? "/admin" : ""}/contact/edit/${row?.original?.consumer_id}`}>
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
              ) : null}

              {/* delete */}
              {hasPermissions(["admin"]) ? (
                <Tooltip>
                  <TooltipTrigger>
                    <div>
                      <Button
                        size={"icon"}
                        className={`bg-transparent`}
                        disabled={
                          deleteContact?.isPending &&
                          deleteContact?.variables?.id ==
                            row?.original?.consumer_id
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteContact(row?.original?.consumer_id);
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
              {/* <Tooltip>
                <TooltipTrigger>
                    <Button size={"icon"}>
                      <PiInfoBold />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>تفاصيل</TooltipContent>
              </Tooltip> */}
            </div>
          );
        },
        size: 10,
        minSize: 10,
        enableSorting: false,
      },
    ],
    [handleDeleteContact, deleteContact, hasPermissions]
  );

  // filter config
  const filter: Filters = useMemo(
    () => [
      {
        id: "1",
        type: "text",
        label: "الاسم",
        title: "الاسم",
        searchKey: "name",
      },
      {
        id: "2",
        type: "text",
        label: "النسبة",
        title: "النسبة",
        searchKey: "surname",
      },
      {
        id: "3",
        type: "text",
        label: "اسم الأب",
        title: "اسم الأب",
        searchKey: "father_name",
      },
      {
        id: "5",
        type: "text",
        label: "البريد الإلكتروني",
        title: "البريد الإلكتروني",
        searchKey: "email",
      },
      {
        id: "6",
        type: "number",
        label: "الرقم الوطني",
        title: "الرقم الوطني",
        searchKey: "national_number",
      },
    ],
    []
  );

  return (
    <AnimateContainer>
      <PageContainer>
        <div className="mb-5xl">
          <h1 className="text-size30 font-medium">جهات الإتصال</h1>
          <h3 className="text-size24 mb-2xl">
            يتم عرض جميع جهات الإتصال المضافة
          </h3>
          <hr />
        </div>
        <DataTable
          prefix={TABLE_PREFIXES.contact}
          columns={ContactColumns?.filter((ele) => {
            if (ele?.id == "action" && !hasPermissions(["admin"])) return false;
            else return true;
          })}
          filters={filter}
          data={(allContacts ?? []) as ContactWithUser[]}
          query={allContactsQuery}
          totalPageCount={totalPages}
          to="/contact/add"
          show={true}
          searchKey="name"
          searchPlaceholder="البحث عن طريق الاسم..."
          searchType="text"
        />
      </PageContainer>
    </AnimateContainer>
  );
}

export default ContactTable;
