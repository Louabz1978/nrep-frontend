import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getListingStatus from "@/api/website/listings/getListingStatus";

function useListingStatus() {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.listingStatus}_`  
  );

  // get listing status
  const listingStatusQuery = useQuery<unknown[]>({
    queryKey: [QUERY_KEYS?.listings?.status, JSON.stringify(queryParams)],
    queryFn: () => getListingStatus({ queryParams }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const listingStatus = listingStatusQuery?.data;

  return {
    listingStatusQuery,
    listingStatus,
  };
}

export default useListingStatus;
