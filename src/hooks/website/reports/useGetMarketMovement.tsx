import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getMarketMovement from "@/api/website/reports/getMarketMovement";

interface IUseGetMarketMovement {
  area: string;
  period: string;
}

function useGetMarketMovement({ area, period }: IUseGetMarketMovement) {
  const getMarketMovementQuery = useQuery({
    queryKey: [QUERY_KEYS.reports.getMarketMovement, area, period],
    queryFn: () =>
      getMarketMovement({
        queryParams: {
          area,
          period,
        },
      }),
    enabled: !!area && !!period,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const marketMovement = getMarketMovementQuery.data;

  return {
    getMarketMovementQuery,
    marketMovement,
  };
}

export default useGetMarketMovement;
