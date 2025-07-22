import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getListingsResources from "@/api/website/listings/getListingsResources";

function useListingResources() {
  // get listing resources
  const listingResourcesQuery = useQuery<unknown[]>({
    queryKey: [QUERY_KEYS?.listings?.resources],
    queryFn: getListingsResources,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const listingResources = listingResourcesQuery?.data;

  return {
    listingResourcesQuery,
    listingResources,
  };
}

export default useListingResources;
