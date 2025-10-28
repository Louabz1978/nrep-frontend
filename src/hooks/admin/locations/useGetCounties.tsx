import { useQuery } from "@tanstack/react-query";
import getCounties from "@/api/admin/locations/getCounties";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import type { County } from "@/types/admin/location";
import getSearchParams from "@/utils/getSearchParams";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";

function useGetCounties() {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(searchParams, `${TABLE_PREFIXES.counties}_`);

  const countiesQuery = useQuery({
    queryKey: [TABLE_PREFIXES.counties, JSON.stringify(queryParams)],
    queryFn: () => getCounties({queryParams}),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const counties = countiesQuery?.data?.data as County[] | undefined;

  return { countiesQuery, counties };
}

export default useGetCounties;
