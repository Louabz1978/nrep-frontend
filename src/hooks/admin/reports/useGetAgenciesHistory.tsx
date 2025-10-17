import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getAgenciesHistory from "@/api/admin/reports/getAgenciesHistory";

function useGetagenciesHistory() {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.agencies_history}_`
  );

  const getAgenciesHistoryQuery = useQuery({
    queryKey: [
      QUERY_KEYS?.admin_reports.agencies_history,
      JSON.stringify(queryParams),
    ],
    queryFn: () => getAgenciesHistory({ queryParams: { ...queryParams } }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const agenciesHistory = getAgenciesHistoryQuery.data?.data;

  return {
    getAgenciesHistoryQuery,
    agenciesHistory,
  };
}

export default useGetagenciesHistory;
