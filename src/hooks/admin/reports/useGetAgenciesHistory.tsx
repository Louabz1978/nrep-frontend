import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getAgenciesHistory from "@/api/admin/reports/getAgenciesHistory";

// --- MODIFIED: Added props for the hook to accept required params ---
type UseGetAgenciesHistoryProps = {
  start_month: number;
  start_year: number;
  end_month: number;
  end_year: number;
};

function useGetagenciesHistory({
  start_month,
  start_year,
  end_month,
  end_year,
}: UseGetAgenciesHistoryProps) {
  const searchParams = useOptimisticSearchParams();
  // This will get pagination params like page, limit
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.agencies_history}_`
  );

  const getAgenciesHistoryQuery = useQuery({
    // --- MODIFIED: Updated queryKey to include all dependencies ---
    queryKey: [
      QUERY_KEYS?.admin_reports.agencies_history,
      start_month,
      start_year,
      end_month,
      end_year,
      JSON.stringify(queryParams),
    ],
    queryFn: () =>
      // --- MODIFIED: Pass all params to the API function ---
      getAgenciesHistory({
        start_month,
        start_year,
        end_month,
        end_year,
        queryParams: { ...queryParams },
      }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const agenciesHistory = getAgenciesHistoryQuery.data;

  return {
    getAgenciesHistoryQuery,
    agenciesHistory,
  };
}

export default useGetagenciesHistory;
