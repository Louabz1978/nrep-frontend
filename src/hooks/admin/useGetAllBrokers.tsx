import { useQuery } from "@tanstack/react-query";
import getAllBrokers from "@/api/admin/getBroker";
import type { GetAllBrokersProps } from "@/api/admin/getBroker";
import QUERY_KEYS from "@/data/global/queryKeys";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getSearchParams from "@/utils/getSearchParams";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";

function useGetAllBrokers(params?: GetAllBrokersProps) {
  const searchParams = useOptimisticSearchParams();
  const queryParams = {
    ...(getSearchParams(searchParams, `${TABLE_PREFIXES.brokers}_`) ?? {}),
    ...(params ?? {}),
  };

  const allBrokersQuery = useQuery({
    queryKey: [QUERY_KEYS.brokers.query, JSON.stringify(queryParams)],
    queryFn: () => getAllBrokers({ queryParams }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const allBrokers = allBrokersQuery?.data?.data;

  return {
    allBrokersQuery,
    allBrokers,
  };
}

export default useGetAllBrokers;
