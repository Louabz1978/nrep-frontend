import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getPropertyByMls from "@/api/website/listings/getPropertyByMls";

function useGetPropertyByMls(mls: number | string | undefined | null) {
  // get property by MLS
  const propertyByMlsQuery = useQuery({
    queryKey: [QUERY_KEYS?.listings?.byMls, mls],
    queryFn: () => getPropertyByMls({ mls: mls! }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!mls, // Only run query when mls is provided
  });

  // final data
  const propertyByMls = propertyByMlsQuery?.data;

  return {
    propertyByMlsQuery,
    propertyByMls,
  };
}

export default useGetPropertyByMls;
