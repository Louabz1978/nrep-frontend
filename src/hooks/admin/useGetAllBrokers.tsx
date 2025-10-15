import { useQuery } from "@tanstack/react-query";
import getAllBrokers from "@/api/admin/getBroker";
import type { GetAllBrokersProps } from "@/api/admin/getBroker";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";

function useGetAllBrokers(params?: GetAllBrokersProps) {
  const allBrokersQuery = useQuery({
    queryKey: [TABLE_PREFIXES.brokers, JSON.stringify(params?.queryParams)],
    queryFn: () => getAllBrokers({ ...(params || {}) }),
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
