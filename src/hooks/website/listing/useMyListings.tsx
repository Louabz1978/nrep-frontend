import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getMyListings from "@/api/website/listings/getMyListings";

function useMyListings() {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.myListings}_`
  );

  // get listing details
  const myListingsQuery = useQuery({
    queryKey: [QUERY_KEYS?.listings?.myListings, JSON.stringify(queryParams)],
    queryFn: () => getMyListings({ queryParams }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const myListings = myListingsQuery?.data?.data;

  // total pages
  const totalPages = myListingsQuery?.data?.pagination?.total_pages;

  return {
    myListingsQuery,
    myListings,
    totalPages,
  };
}

export default useMyListings;
