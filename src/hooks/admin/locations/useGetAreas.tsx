import { useQuery } from "@tanstack/react-query";
import getAreas from "@/api/admin/locations/getAreas";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import type { Area } from "@/types/admin/location";
import getSearchParams from "@/utils/getSearchParams";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";

function useGetAreas() {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(searchParams, `${TABLE_PREFIXES.areas}_`);

  const areasQuery = useQuery({
    queryKey: [TABLE_PREFIXES.areas, JSON.stringify(queryParams)],
    queryFn: () => getAreas({ queryParams }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const areas = areasQuery?.data?.data as Area[] | undefined;
  const totalPages = areasQuery?.data?.pagination?.total_pages || 1;

  return { areasQuery, areas, totalPages };
}

export default useGetAreas;
