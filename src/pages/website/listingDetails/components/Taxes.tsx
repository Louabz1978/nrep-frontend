import { DataTable } from "@/components/global/table2/table";
import type { ListingMovement, Taxes } from "@/types/website/reports";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

const RenderTaxesTab = () => {
  const columns: ColumnDef<Taxes>[] = useMemo(
    () => [
      {
        accessorKey: "mls",
        header: "MLS",
        size: 20,
      },
      {
        accessorKey: "address",
        header: "العنوان",
        size: 20,
      },
      {
        accessorKey: "discription",
        header: "الوصف",
        size: 80,
      },
    ],
    []
  );

  // Taxes table data and columns
  const taxesData = [
    { mls: "985123", address: "Homs", discreption: "any thing" },
    { mls: "985123", address: "Homs", discreption: "any thing" },
    { mls: "985123", address: "Homs", discreption: "any thing" },
    { mls: "985123", address: "Homs", discreption: "any thing" },
  ];

  return (
    <div className="bg-primary-bg rounded-md p-4">
      <DataTable columns={columns} data={taxesData || []} report={true} />
    </div>
  );
};

export default RenderTaxesTab;
