import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getListingsResources from "@/api/website/listings/getListingsResources";

function useListingQuery() {
  // get listing resources
  const listingResources = useQuery<unknown[]>({
    queryKey: [QUERY_KEYS?.listings?.resources],
    queryFn: getListingsResources,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    listingResources,
  };
}

export default useListingQuery;
