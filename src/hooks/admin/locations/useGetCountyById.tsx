import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getCountyById from "@/api/admin/locations/getCountyById";

function useGetCountyById(id: number) {
  const countyDetailsQuery = useQuery({
    queryKey: [QUERY_KEYS?.counties?.details, id],
    queryFn: () => getCountyById({ id }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  // final data
  const countyDetails = countyDetailsQuery?.data;

  return {
    countyDetailsQuery,
    countyDetails,
  };
}

export default useGetCountyById;
