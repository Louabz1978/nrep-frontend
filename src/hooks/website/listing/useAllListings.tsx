import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getAllListings from "@/api/website/listings/getAllListings";

function useAllListings() {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.allListings}_`
  );

  // get listing details
  const allListingsQuery = useQuery({
    queryKey: [QUERY_KEYS?.listings?.query, JSON.stringify(queryParams)],
    queryFn: () => getAllListings({ queryParams }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const allListings = allListingsQuery?.data;

  // total pages
  const totalPages = 1;

  return {
    allListingsQuery,
    allListings,
    totalPages,
  };
}

export default useAllListings;
