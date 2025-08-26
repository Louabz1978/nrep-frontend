import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getListingsType from "@/api/website/listings/getListingType";

function useListingType() {
  // get listing Type
  const listingTypeQuery = useQuery<unknown[]>({
    queryKey: [QUERY_KEYS?.listings?.type],
    queryFn: getListingsType,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const listingType = listingTypeQuery?.data;

  return {
    listingTypeQuery,
    listingType,
  };
}

export default useListingType;
