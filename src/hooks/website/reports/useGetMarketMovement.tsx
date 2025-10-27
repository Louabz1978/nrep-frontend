import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getMarketMovement from "@/api/website/reports/getMarketMovement";

interface IUseGetMarketMovement {
  city_id: string;
  area_id: string;
  year: number;
  month: number;
}

function useGetMarketMovement({
  city_id,
  area_id,
  year,
  month,
}: IUseGetMarketMovement) {
  const query = useQuery({
    queryKey: [
      QUERY_KEYS.reports.getMarketMovement,
      city_id,
      area_id,
      year,
      month,
    ],
    queryFn: () => {
      return getMarketMovement({
        queryParams: { city_id, area_id, year, month },
      });
    },
    enabled: !!city_id,
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
