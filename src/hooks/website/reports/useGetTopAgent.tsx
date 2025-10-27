import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getTopAgent from "@/api/website/reports/getTopAgent";

interface IUseGetTopAgent {
  month: string;
  year: string;
}

function useGetTopAgent({ month, year }: IUseGetTopAgent) {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.top_agent}_`
  );

  // get listing details
  const getTopAgentQuery = useQuery({
    queryKey: [
      QUERY_KEYS?.reports?.getTopAgent,
      JSON.stringify(queryParams),
      month,
      year,
    ],
    queryFn: () =>
      getTopAgent({ queryParams: { ...queryParams, month, year } }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const topAgent = getTopAgentQuery.data?.data?.data;

  return {
    getTopAgentQuery,
    topAgent,
  };
}

export default useGetTopAgent;
