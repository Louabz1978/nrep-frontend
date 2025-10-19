import { useQuery } from "@tanstack/react-query";
import getAreas from "@/api/admin/locations/getAreas";
import type { GetAreasProps } from "@/api/admin/locations/getAreas";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import type { Area } from "@/types/admin/location";

function useGetAreas(params?: GetAreasProps) {
  const areasQuery = useQuery({
    queryKey: [TABLE_PREFIXES.areas, JSON.stringify(params?.queryParams)],
    queryFn: () => getAreas({ ...(params || {}) }),
    retry: false,
    refetchOnWindowFocus: false,
  });


  const areas = areasQuery?.data?.data as Area[] | undefined;




  return { areasQuery, areas };
}

export default useGetAreas;
