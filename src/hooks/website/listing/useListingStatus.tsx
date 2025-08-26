import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getListingStatus from "@/api/website/listings/getListingStatus";

function useListingStatus() {
  // get listing status
  const listingStatusQuery = useQuery<unknown[]>({
    queryKey: [QUERY_KEYS?.listings?.status],
    queryFn: getListingStatus,
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
