import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getAgentMovement from "@/api/website/reports/getAgentMovement";

function useGetAgentMovement() {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.agent_movement}_`
  );

  const getAgentMovementQuery = useQuery({
    queryKey: [
      QUERY_KEYS?.reports?.getAgentMovement,
      JSON.stringify(queryParams),
    ],
    queryFn: () => getAgentMovement({ queryParams: { ...queryParams } }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const agentMovement = getAgentMovementQuery.data?.data;

  return {
    getAgentMovementQuery,
    agentMovement,
  };
}

export default useGetAgentMovement;
