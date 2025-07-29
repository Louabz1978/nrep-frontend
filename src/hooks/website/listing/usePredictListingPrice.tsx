import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getListingsPredictPrice from "@/api/website/listings/getListingPredictPrice";
import type { ListingsPredictPriceRequestData } from "@/types/website/listings";

function useListingPredictPrice(data: ListingsPredictPriceRequestData) {
  // get listing predictPrice
  const listingPredictPriceQuery = useQuery({
    queryKey: [QUERY_KEYS?.listings?.predictPrice, JSON.stringify(data)],
    queryFn: () => getListingsPredictPrice({ data }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const listingPredictPrice = listingPredictPriceQuery?.data;

  return {
    listingPredictPriceQuery,
    listingPredictPrice,
  };
}

export default useListingPredictPrice;
