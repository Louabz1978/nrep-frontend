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

import type {  ContactWithUser} from "@/types/website/contact";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo} from "react";
import {
  PiInfoBold,
  PiPencilSimpleBold,
  PiTrashSimpleBold,
} from "react-icons/pi";
import { Link } from "react-router-dom";

function ContactTable() {

  // user information
  const { user, hasPermissions } = useUser();

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
            className="ms-2"
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
            className="ms-2"
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
        id: "name",
        accessorKey: "name",
        header: "الاسم",
        size: 25,
      },
      {
        id: "surname",
        header: "النسبة",
        accessorKey: "surname",
        size: 20,
      },
      {
        id: "place_of_birth",
        header: "مكان الولادة",
        accessorKey: "place_of_birth",
        size: 20,
      },
      {
        id: "date_of_birth",
        header: "تاريخ الولادة",
        accessorKey: "date_of_birth",
        size: 20,
      },
      {
        id: "registry",
        header: "القيد",
        accessorKey: "registry",
        size: 20,
      },
      {
        id: "national_number",
        header: "الرقم الوطني",
        accessorKey: "national_number",
        size: 20,
      },
      {
        id: "action",
        header: "الإجراء",
        cell: ({ row }) => {
          const isSameUser =
            row?.original?.created_by_user?.user_id == user?.user_id;

          return (
            <div className="flex items-center gap-md">
              {/* edit */}
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    to={`/contact/edit/${row?.original?.contact_id}`}
                    className={`${isSameUser ? "" : "pointer-events-none"}`}
                    aria-disabled={!isSameUser}
                  >
                    <Button
                      size={"icon"}
                      className="bg-green"
                      disabled={!isSameUser}
                    >
                      <PiPencilSimpleBold />
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
                        className="bg-red"
                        disabled={
                          (deleteContact?.isPending &&
                            deleteContact?.variables?.id ==
                              row?.original?.contact_id) ||
                          !isSameUser
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteContact(row?.original?.contact_id);
                        }}
                      >
                        <PiTrashSimpleBold />
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>حذف</TooltipContent>
                </Tooltip>
              ) : null}

              {/* details */}
              <Tooltip>
                <TooltipTrigger>
                  <Link to={`/listing/details/${row?.original?.contact_id}`}>
                    <Button size={"icon"}>
                      <PiInfoBold />
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
    [handleDeleteContact, deleteContact]
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
        <DataTable
          prefix={TABLE_PREFIXES.contact}
          columns={ContactColumns}
          filters={filter}
          data={(allContacts ?? []) as ContactWithUser[]}
          query={allContactsQuery}
          totalPageCount={totalPages}
        />
      </PageContainer>
    </AnimateContainer>
  );
}

export default ContactTable;
