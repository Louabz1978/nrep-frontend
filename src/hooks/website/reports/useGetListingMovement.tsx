import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getListingMovement from "@/api/website/reports/getListingMovement";

interface UseGetListingMovementProps {
  property_id: number;
}

function useGetListingMovement({ property_id }: UseGetListingMovementProps) {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.listing_movement}_`
  );

  const getListingMovementQuery = useQuery({
    queryKey: [
      QUERY_KEYS?.reports?.getListingMovement,
      property_id,
      JSON.stringify(queryParams),
    ],
    queryFn: () =>
      getListingMovement({ 
        property_id, 
        queryParams: { ...queryParams } 
      }),
    retry: false,
    refetchOnWindowFocus: false,
    
  });

  // final data
  const listingMovement = getListingMovementQuery.data?.data;

  return {
    getListingMovementQuery,
    listingMovement,
  };
}

export default useGetListingMovement;
