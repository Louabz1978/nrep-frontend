import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getBrokerHistory from "@/api/admin/reports/getBrokerHistory";

function useGetBrokerHistory() {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.broker_history}_`
  );

  const brokerHistoryQuery = useQuery({
    queryKey: [
      QUERY_KEYS?.admin_reports.broker_history,
      JSON.stringify(queryParams),
    ],
    queryFn: () => getBrokerHistory({ queryParams: { ...queryParams } }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const brokerHistory = brokerHistoryQuery.data;

  return {
    brokerHistoryQuery,
    brokerHistory,
  };
}

export default useGetBrokerHistory;
