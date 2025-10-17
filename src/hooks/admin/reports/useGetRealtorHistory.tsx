import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getRealtorHistory from "@/api/admin/reports/getRealtorHistory";

function useGetRealtorHistory() {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.realtor_history}_`
  );

  const getRealtorHistoryQuery = useQuery({
    queryKey: [
      QUERY_KEYS?.admin_reports.realtor_history,
      JSON.stringify(queryParams),
    ],
    queryFn: () => getRealtorHistory({ queryParams: { ...queryParams } }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const realtorHistory = getRealtorHistoryQuery.data?.data;

  return {
    getRealtorHistoryQuery,
    realtorHistory,
  };
}

export default useGetRealtorHistory;
