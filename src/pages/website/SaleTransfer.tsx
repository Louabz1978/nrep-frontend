import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import type { ColumnDef } from "@tanstack/react-table";
import useGetSaleTransfers from "@/hooks/website/transfer/useGetSaleTransfers";
import type { SaleTransfer } from "@/api/website/contracts/getSaleTransfers";

export default function SaleTransfer() {
  const { saleTransfers } = useGetSaleTransfers();

  const columns: ColumnDef<SaleTransfer>[] = [
    { accessorKey: "from", header: "من" },
    { accessorKey: "to", header: "إلى" },
    { accessorKey: "date", header: "تاريخ الانتقال" },
  ];

  return (
    <PageContainer>
      <h2 className="text-xl font-bold mb-4">جدول انتقالات البيع</h2>
      <DataTable
        columns={columns}
        data={saleTransfers || []}
        prefix="saleTransfers"
        miw={800}
      />
    </PageContainer>
  );
}
