import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getBrokerHistory from "@/api/admin/reports/getBrokerHistory";

export type UseGetBrokerHistoryProps = {
  start_month: number;
  start_year: number;
  end_month: number;
  end_year: number;
  search: string;
};

function useGetBrokerHistory({
  start_month,
  start_year,
  end_month,
  end_year,
  search,
}: UseGetBrokerHistoryProps) {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.broker_history}_`
  );

  const getBrokerHistoryQuery = useQuery({
    queryKey: [
      QUERY_KEYS?.admin_reports.broker_history,
      start_month,
      start_year,
      end_month,
      end_year,
      search,
      JSON.stringify(queryParams),
    ],
    queryFn: () =>
      getBrokerHistory({
        start_month,
        start_year,
        end_month,
        end_year,
        search,
        queryParams: { ...queryParams },
      }),
    retry: false,
    refetchOnWindowFocus: false,
  });
  const brokerHistory = getBrokerHistoryQuery.data;

  return {
    brokerHistoryQuery: getBrokerHistoryQuery,
    brokerHistory,
  };
}

export default useGetBrokerHistory;
