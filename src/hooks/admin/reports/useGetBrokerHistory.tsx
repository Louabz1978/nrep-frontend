import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getBrokerHistory from "@/api/admin/reports/getBrokerHistory";

type UseGetBrokerHistoryProps = {
  user_id?: number;
  start_month?: number;
  start_year?: number;
  end_month?: number;
  end_year?: number;
};

function useGetBrokerHistory({
  user_id,
  start_month,
  start_year,
  end_month,
  end_year,
}: UseGetBrokerHistoryProps = {}) {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.broker_history}_`
  );

  const getBrokerHistoryQuery = useQuery({
    queryKey: [
      QUERY_KEYS?.admin_reports.broker_history,
      user_id,
      start_month,
      start_year,
      end_month,
      end_year,
      
      JSON.stringify(queryParams),
    ],
    queryFn: () =>
      getBrokerHistory({
        user_id,
        start_month,
        start_year,
        end_month,
        end_year,
        queryParams: { ...queryParams },
      }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const brokerHistory = getBrokerHistoryQuery.data;

  return {
    getBrokerHistoryQuery,
    brokerHistory,
  };
}

export default useGetBrokerHistory;
