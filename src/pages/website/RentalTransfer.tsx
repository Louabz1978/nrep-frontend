import PageContainer from "@/components/global/pageContainer/PageContainer";
import FormSectionHeader from "@/components/global/typography/FormSectionHeader";
import { DataTable } from "@/components/global/table2/table";
import type { ColumnDef } from "@tanstack/react-table";
import useGetRentalTransactions from "@/hooks/website/transfer/useGetRentalTransactions";
import type { RentTransaction } from "@/api/website/transfer/getRentalTransfers";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export default function RentalTransfer() {
  const { rentalTransactions, query } = useGetRentalTransactions();

  const columns: ColumnDef<RentTransaction>[] = [
    {
      accessorKey: "rent_id",
      header: "رقم الإيجار",
      cell: ({ row }) => (
        <span className="font-medium">#{row.getValue("rent_id")}</span>
      ),
    },
    {
      accessorKey: "rent_price",
      header: "قيمة الإيجار",
      cell: ({ row }) => (
        <span className="font-semibold text-green-600">
          {Number(row.getValue("rent_price")).toLocaleString()} %
        </span>
      ),
    },
    {
      accessorKey: "property",
      header: "العقار",
      cell: ({ row }) => {
        const property = row.getValue(
          "property"
        ) as RentTransaction["property"];
        return (
          <div className="space-y-1">
            <div className="font-medium">{property.description}</div>
            <div className="text-sm text-gray-500">
              {property.property_type === "apartment"
                ? "شقة"
                : property.property_type}{" "}
              - {property.bedrooms} غرف - {property.bathrooms} حمام
            </div>
            <div className="text-xs text-gray-400">{property.address}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "buyer",
      header: "المستأجر",
      cell: ({ row }) => {
        const buyer = row.getValue("buyer") as RentTransaction["buyer"];
        return (
          <div className="space-y-1">
            <div className="font-medium">
              {buyer.name} {buyer.surname}
            </div>
            <div className="text-sm text-gray-500">{buyer.phone_number}</div>
            <div className="text-xs text-gray-400">{buyer.email}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "seller",
      header: "المالك",
      cell: ({ row }) => {
        const seller = row.getValue("seller") as RentTransaction["seller"];
        return (
          <div className="space-y-1">
            <div className="font-medium">
              {seller.name} {seller.surname}
            </div>
            <div className="text-sm text-gray-500">{seller.phone_number}</div>
            <div className="text-xs text-gray-400">{seller.email}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "تاريخ الإيجار",
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
      header: "عمولة وكيل المستأجر",
      cell: ({ row }) => (
        <span>
          {Number(row.getValue("buyer_agent_commission")).toLocaleString()} %
        </span>
      ),
    },
    {
      accessorKey: "seller_agent_commission",
      header: "عمولة وكيل المالك",
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
        <FormSectionHeader className="text-right">
          معاملات الإيجار
        </FormSectionHeader>
      </div>

      <DataTable
        columns={columns}
        data={rentalTransactions || []}
        prefix="rentalTransactions"
        miw={1200}
        query={query}
      />
    </PageContainer>
  );
}
