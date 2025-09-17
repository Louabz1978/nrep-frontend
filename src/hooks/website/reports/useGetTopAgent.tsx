import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getTopAgent from "@/api/website/reports/getTopAgent";

function useGetTopAgent() {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.top_agent}_`
  );

  // get listing details
  const getTopAgentQuery = useQuery({
    queryKey: [QUERY_KEYS?.reports?.getTopAgent, JSON.stringify(queryParams)],
    queryFn: () => getTopAgent({ queryParams }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const topAgent = getTopAgentQuery?.data?.data;

  // total pages
  const totalPages = getTopAgentQuery?.data?.pagination?.total_pages;

  return {
    getTopAgentQuery,
    topAgent,
    totalPages,
  };
}

export default useGetTopAgent;
