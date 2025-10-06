import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getMarketMovement from "@/api/website/reports/getMarketMovement";

interface IUseGetMarketMovement {
  city: string;
  area: string;
  year: number;
  month: number;
}

function useGetMarketMovement({
  city,
  area,
  year,
  month,
}: IUseGetMarketMovement) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.reports.getMarketMovement, city, area, year, month],
    queryFn: () => {
      return getMarketMovement({
        queryParams: { city, area, year, month },
      });
    },
    enabled: !!city || !!area || !!year || !!month,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    // Force refetch every time (no cache)
    staleTime: 0,
    gcTime: 0,
  });

  return {
    ...query,
    marketMovement: query.data,
    getMarketMovementQuery: query,
  };
}

export default useGetMarketMovement;
