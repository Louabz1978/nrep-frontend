import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getExpectedPrice from "@/api/admin/reports/getExpectedPrice";

function useGetExpectedPrice() {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.expected_price}_`
  );

  const getExpectedPriceQuery = useQuery({
    queryKey: [
      QUERY_KEYS?.admin_reports.expected_price,
      JSON.stringify(queryParams),
    ],
    queryFn: () => getExpectedPrice({ queryParams: { ...queryParams } }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const expectedPrice = getExpectedPriceQuery.data?.data;

  return {
    getExpectedPriceQuery,
    expectedPrice,
  };
}

export default useGetExpectedPrice;
