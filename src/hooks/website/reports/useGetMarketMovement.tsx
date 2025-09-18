import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getMarketMovement from "@/api/website/reports/getMarketMovement";

interface IUseGetMarketMovement {
  city: string;
  area: string;
  month: number;
  year: number;
}

function useGetMarketMovement({ city, area, month, year }: IUseGetMarketMovement) {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.market_movement}_`
  );

  // get market movement report
  const getMarketMovementQuery = useQuery({
    queryKey: [
      QUERY_KEYS?.reports?.getMarketMovement,
      city,
      area,
      month,
      year,
    ],
    queryFn: () =>
      getMarketMovement({
        queryParams: {
          ...queryParams,
          city,
          area,
          month,
          year
        }
      }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const marketMovement = getMarketMovementQuery.data?.data;

  return {
    getMarketMovementQuery,
    marketMovement,
  };
}

export default useGetMarketMovement;