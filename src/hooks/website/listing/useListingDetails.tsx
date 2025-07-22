import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getListingsDetails from "@/api/website/listings/getListingDetails";

function useListingDetails(id: number) {
  // get listing details
  const listingDetailsQuery = useQuery({
    queryKey: [QUERY_KEYS?.listings?.details, id],
    queryFn: () => getListingsDetails({ id }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const listingDetails = listingDetailsQuery?.data?.data;

  return {
    listingDetailsQuery,
    listingDetails,
  };
}

export default useListingDetails;
