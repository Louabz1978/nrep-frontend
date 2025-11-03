import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getRealtorHistory from "@/api/admin/reports/getRealtorHistory";

type Filters = Record<string, string | number | undefined | null> | undefined;

function useGetRealtorHistory(Params?: Filters) {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.realtor_history}_`
  );
  const finalParamsRaw = { ...queryParams, ...(Params || {}) } as Record<string, unknown>;
  const finalParams: Record<string, string> = {};
  Object.entries(finalParamsRaw).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      finalParams[key] = String(value);
    }
  });

  const getRealtorHistoryQuery = useQuery({
    queryKey: [
      QUERY_KEYS?.admin_reports.realtor_history,JSON.stringify(finalParams),
    ],
    queryFn: () => getRealtorHistory({ queryParams: { ...finalParams } }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const realtorHistory = getRealtorHistoryQuery.data

  return {
    getRealtorHistoryQuery,
    realtorHistory,
  };
}

export default useGetRealtorHistory;
