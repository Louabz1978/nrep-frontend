import { useQuery } from "@tanstack/react-query";
import getCounties from "@/api/admin/locations/getCounties";
import type { GetCountiesProps } from "@/api/admin/locations/getCounties";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import type { County } from "@/types/admin/location";


function useGetCounties(params?: GetCountiesProps) {
  const countiesQuery = useQuery({
    queryKey: [TABLE_PREFIXES.counties, JSON.stringify(params?.queryParams)],
    queryFn: () => getCounties({ ...(params || {}) }),
    retry: false,
    refetchOnWindowFocus: false,
  });



  const counties = countiesQuery?.data?.data as County[] | undefined;




  return { countiesQuery, counties };
}

export default useGetCounties;
