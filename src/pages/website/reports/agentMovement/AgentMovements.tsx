import AnimateContainer from "@/components/global/pageContainer/AnimateContainer";
import PageContainer from "@/components/global/pageContainer/PageContainer";
import { DataTable } from "@/components/global/table2/table";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { AgentMovement } from "@/types/website/reports";

import useGetAgentMovement from "@/hooks/website/reports/useGetAgentMovement";
import { Input } from "@/components/global/ui/input";

const AgentMovement = () => {
  const { agentMovement, getAgentMovementQuery } = useGetAgentMovement();

  // Search state for filtering agent movements
  const [search, setSearch] = useState("");

  // Fix column keys and names
  const columns: ColumnDef<AgentMovement>[] = useMemo(
    () => [
      {
        accessorKey: "license",
        header: "رقم الرخصة",
        size: 20,
      },
      {
        accessorKey: "agent_name",
        header: "اسم الوسيط العقاري",
        size: 30,
      },
      {
        accessorKey: "sales_number",
        header: "عدد العقارات المباعة",
        size: 10,
      },
      {
        accessorKey: "total_price",
        header: "مجموع المباع و المؤجر",
        size: 10,
      },
      {
        accessorKey: "summerize",
        header: "الملخص",
        size: 10,
      },
    ],
    []
  );

  // Filter agentMovement by search input (by agent_name or license)
  const filteredData = useMemo(() => {
    if (!search) return agentMovement || [];
    const lower = search.toLowerCase();
    return (agentMovement || []).filter(
      (item) =>
        item.agent_name?.toLowerCase().includes(lower) ||
        String(item.license).includes(lower)
    );
  }, [agentMovement, search]);

  return (
    <AnimateContainer>
      <PageContainer>
        {/* Responsive controls for month/year can be added here if needed */}
        <div className="mb-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-size24 sm:text-size30 font-medium mb-md sm:mb-xl text-center sm:text-right">
              تقرير حركة الوكيل العقاري
            </h1>
            <div>
              <Input
                placeholder="ابحث عن اسم الوسيط أو رقم الرخصة"
                type="search"
                variant="white"
                iconClassName="text-gray-400/50 h-[18px] w-[18px] "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-90 bg-white !h-2lg !text-size16 !border-gray-400 !rounded-[10px] placeholder:text-xs leading-tight py-sm px-md !text-sm "
              />
            </div>
          </div>
          <hr className="mt-2" />
        </div>
        <div className="w-full overflow-x-auto">
          <DataTable
            report={true}
            prefix={TABLE_PREFIXES.top_agent}
            columns={columns}
            data={filteredData}
            query={getAgentMovementQuery}
          />
        </div>
      </PageContainer>
    </AnimateContainer>
  );
};

export default AgentMovement;
