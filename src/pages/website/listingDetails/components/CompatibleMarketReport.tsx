import { useState, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/global/table2/table";
import { Input } from "@/components/global/ui/input";
import useGetCompatibleProperties from "@/hooks/website/reports/useGetCompatibleProperties";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import type { Listing } from "@/types/website/listings";

import { FaSearch } from "react-icons/fa";

interface CompatibleMarketReportProps {
  mls: string;
}

const CompatibleMarketReport = ({ mls }: CompatibleMarketReportProps) => {
  const [searchMls, setSearchMls] = useState("");

  const { compatibleProperties, compatiblePropertiesQuery } =
    useGetCompatibleProperties({
      mls: searchMls || mls,
    });

  const columns: ColumnDef<Listing>[] = useMemo(
    () => [
      {
        accessorKey: "address",
        header: "MLS",
        size: 20,
        cell: ({ row }) => {
          const mlsValue = row.getValue("address") as string;

          const match = mlsValue.match(/\d+|\d+/);

          return match ? match[0] : mlsValue;
        },
      },
      {
        accessorKey: "address",
        header: "العنوان",
        size: 30,
        cell: ({ row }) => {
          const address = row.getValue("address") as any;
          return address?.street || "المحطة";
        },
      },
      {
        accessorKey: "bedrooms",
        header: "عدد غرف النوم",
        size: 15,
        cell: ({ row }) => {
          const bedrooms = row.getValue("bedrooms") as number;
          return bedrooms || "4";
        },
      },
      {
        accessorKey: "bathrooms",
        header: "عدد الحمامات",
        size: 15,
        cell: ({ row }) => {
          const bathrooms = row.getValue("bathrooms") as number;
          return bathrooms || "2";
        },
      },
      {
        accessorKey: "status",
        header: "الحالة",
        size: 15,
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return status === "active"
            ? "نشط"
            : status === "closed"
            ? "مغلق"
            : "نشط";
        },
      },
      {
        accessorKey: "sale_date",
        header: "تاريخ البيع",
        size: 15,
        cell: ({ row }) => {
          const saleDate = row.getValue("sale_date") as string;
          return saleDate || "---";
        },
      },
      {
        accessorKey: "sale_price",
        header: "سعر البيع",
        size: 15,
        cell: ({ row }) => {
          const salePrice = row.getValue("sale_price") as number;
          return salePrice ? `${salePrice}$` : "---";
        },
      },
    ],
    []
  );

  const tableData = compatibleProperties?.data?.data?.Other ?? [];
  const ClosedData = compatibleProperties?.data?.data?.Closed ?? [];
  console.log(tableData);

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-semibold text-right mb-4">
            تقرير السوق المتوافق للعقار
          </h2>
          <p className="text-gray-600 text-right mb-4">
            يتم عرض العقارات المضافة من قبلك
          </p>
        </div>

        <div className="flex gap-4 w-[300px] items-center justify-end">
          <Input
            value={searchMls}
            onChange={(e) => setSearchMls(e.target.value)}
            type="text"
            variant="white"
            icon={FaSearch}
            iconClassName="text-gray-400/50 h-[18px] w-[18px]"
            iconInline
            placeholder="البحث عن طريق رقم MLS"
            className="w-80 text-right"
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto bg-[#E5E5E5] rounded-xl p-2">
        <DataTable
          report={true}
          prefix={TABLE_PREFIXES.compatible_properties}
          columns={columns}
          data={tableData}
          query={compatiblePropertiesQuery}
        />
        <h1 className="text-2xl font-semibold text-right my-5">
          العقارات المغلقة
        </h1>{" "}
        <DataTable
          report={true}
          prefix={TABLE_PREFIXES.compatible_properties}
          columns={columns}
          data={ClosedData}
          query={compatiblePropertiesQuery}
        />
      </div>
    </div>
  );
};

export default CompatibleMarketReport;
