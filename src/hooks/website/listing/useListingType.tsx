import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getListingsType from "@/api/website/listings/getListingType";

function useListingType() {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.listingType}_`
  );

  // get listing Type
  const listingTypeQuery = useQuery<unknown[]>({
    queryKey: [QUERY_KEYS?.listings?.type, JSON.stringify(queryParams)],
    queryFn: () => getListingsType({ queryParams }),
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
