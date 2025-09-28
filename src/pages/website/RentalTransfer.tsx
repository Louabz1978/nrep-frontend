import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import type { ColumnDef } from "@tanstack/react-table";
import useGetRentalTransfers from "@/hooks/website/transfer/useGetRentalTransfers";
import type { RentalTransfer } from "@/api/website/contracts/getRentalTransfers";



export default function RentalTransfer() {

  const { rentalTransfers } = useGetRentalTransfers();
  const columns: ColumnDef<RentalTransfer>[] = [
    { accessorKey: "from", header: "من" },
    { accessorKey: "to", header: "إلى" },
    { accessorKey: "date", header: "تاريخ الانتقال" },
  ];
  const dummyData: RentalTransfer[] = [
    { id: "1", from: "أحمد", to: "سعيد", date: "2024-06-01" },
    { id: "2", from: "منى", to: "خالد", date: "2024-06-10" },
    { id: "3", from: "محمد", to: "محمد", date: "2024-06-10" },
  ];
  return (
    <PageContainer>
      <h2 className="text-xl font-bold mb-4">جدول انتقالات الإيجار</h2>
      <DataTable
        columns={columns}
        data={rentalTransfers || dummyData}
        prefix="rentalTransfers"
        miw={800}
        
      />
    </PageContainer>
  );
}
