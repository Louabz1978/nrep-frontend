"use client";

import type { ColumnDef } from "@tanstack/react-table";
export type Stage =
  | "لم يبدأ"
  | "قيد التنفيذ"
  | "تم الإنجاز"
  | "تحتاج إلى موافقة";

export interface TaskRow {
  id: string;
  name: string;
  stage: Stage;
  owner: {
    name: string;
    username: string;
  };
  assignedTo: string[];
  followers: string[];
  collaborators: string[];
  endDate?: string;
}

import { Checkbox } from "@/components/ui/checkbox";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<TaskRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="ms-2"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
  },

  {
    accessorKey: "name",
    header: "الاسم",
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "stage",
    header: "المرحلة",
    cell: ({ row }) => {
      const stage = row.original.stage;

      return (
        <div className="py-[2px] px-[4px] rounded-[4px] bg-red-500">
          {stage}
        </div>
      );
    },
  },
  {
    accessorKey: "owner.name",
    header: "المالك",
    cell: ({ row }) => {
      const { name, username } = row.original.owner;
      return (
        <div className="flex items-center gap-2">
          {username && (
            <span className="w-6 h-6 rounded-full bg-gray-200 text-center text-xs leading-6">
              {username[0].toUpperCase()}
            </span>
          )}
          <span>{name || "لم يتم التعيين"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "assignedTo",
    header: "أُحيل إليه",
    cell: ({ row }) => {
      const users = row.original.assignedTo;
      return (
        <div className="flex flex-wrap gap-1">
          {users.length ? (
            users.map((u) => (
              <span key={u} className="bg-gray-200 px-2 py-0.5 rounded text-sm">
                {u}
              </span>
            ))
          ) : (
            <span className="text-gray-400">لم يتم التعيين</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "followers",
    header: "المتابعون",
    cell: ({ row }) => {
      const users = row.original.followers;
      return (
        <div className="flex flex-wrap gap-1">
          {users.length ? (
            users.map((u) => (
              <span key={u} className="bg-gray-100 px-2 py-0.5 rounded text-sm">
                {u}
              </span>
            ))
          ) : (
            <span className="text-gray-400">لم يتم التعيين</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "collaborators",
    header: "المتعاونون",
    cell: ({ row }) => {
      const users = row.original.collaborators;
      return (
        <div className="flex flex-wrap gap-1">
          {users.length ? (
            users.map((u) => (
              <span key={u} className="bg-gray-100 px-2 py-0.5 rounded text-sm">
                {u}
              </span>
            ))
          ) : (
            <span className="text-gray-400">لم يتم التعيين</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "تاريخ الانتهاء",
    cell: ({ row }) => {
      const date = row.original.endDate;
      return (
        <span className="text-sm text-red-500">
          {date ? new Date(date).toLocaleDateString("ar-EG") : "-"}
        </span>
      );
    },
  },
];
