import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import { DataTable } from "@/components/global/table2/table";
import type { ColumnDef } from "@tanstack/react-table";
import useGetSaleTransactions from "@/hooks/website/transfer/useGetSaleTransactions";
import type { SaleTransaction } from "@/api/website/transfer/getSaleTransfers";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function SaleTransfer() {
  const { saleTransactions, query } = useGetSaleTransactions();

  const columns: ColumnDef<SaleTransaction>[] = [
    {
      accessorKey: "sale_id",
      header: "رقم البيع",
      cell: ({ row }) => (
        <span className="font-medium">#{row.getValue("sale_id")}</span>
      ),
    },
    {
      accessorKey: "sold_price",
      header: "سعر البيع",
      cell: ({ row }) => (
        <span className="font-semibold text-green-600">
          {Number(row.getValue("sold_price")).toLocaleString()} %
        </span>
      ),
    },
    {
      accessorKey: "property",
      header: "العقار",
      cell: ({ row }) => {
        const property = row.getValue("property") as SaleTransaction["property"];
        return (
          <div className="space-y-1">
            <div className="font-medium">{property.description}</div>
            <div className="text-sm text-gray-500">
              {property.property_type === "apartment" ? "شقة" : property.property_type} - {property.bedrooms} غرف - {property.bathrooms} حمام
            </div>
            <div className="text-xs text-gray-400">{property.address}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "buyer",
      header: "المشتري",
      cell: ({ row }) => {
        const buyer = row.getValue("buyer") as SaleTransaction["buyer"];
        return (
          <div className="space-y-1">
            <div className="font-medium">{buyer.name} {buyer.surname}</div>
            <div className="text-sm text-gray-500">{buyer.phone_number}</div>
            <div className="text-xs text-gray-400">{buyer.email}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "seller",
      header: "البائع",
      cell: ({ row }) => {
        const seller = row.getValue("seller") as SaleTransaction["seller"];
        return (
          <div className="space-y-1">
            <div className="font-medium">{seller.name} {seller.surname}</div>
            <div className="text-sm text-gray-500">{seller.phone_number}</div>
            <div className="text-xs text-gray-400">{seller.email}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "تاريخ البيع",
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        return (
          <span className="text-sm">
            {format(date, "dd/MM/yyyy", { locale: ar })}
          </span>
        );
      },
    },
    {
      accessorKey: "buyer_agent_commission",
      header: "عمولة وكيل المشتري",
      cell: ({ row }) => (
        <span >
          {Number(row.getValue("buyer_agent_commission")).toLocaleString()} %
        </span>
      ),
    },
    {
      accessorKey: "seller_agent_commission",
      header: "عمولة وكيل البائع",
      cell: ({ row }) => (
        <span>
          {Number(row.getValue("seller_agent_commission")).toLocaleString()} %
        </span>
      ),
    },
  ];

  return (
    <PageContainer>
      <div className="flex xl:flex-nowrap flex-wrap border-b mb-8 pb-2">
        <FormSectionHeader className="text-right">معاملات البيع</FormSectionHeader>
      </div>

      <DataTable
        columns={columns}
        data={saleTransactions || []}
        prefix="saleTransactions"
        miw={1200}
        query={query}
        report
      />
    </PageContainer>
  );
}