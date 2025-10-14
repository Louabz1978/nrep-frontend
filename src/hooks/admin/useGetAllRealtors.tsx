import { useQuery } from "@tanstack/react-query";
import getAllRealtors from "@/api/admin/getRealtor";
import type { GetAllRealtorsProps } from "@/api/admin/getRealtor";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";

function useGetAllRealtors(params?: GetAllRealtorsProps) {

  const allRealtorsQuery = useQuery({
    queryKey:[TABLE_PREFIXES.realtors,JSON.stringify(params?.queryParams)],
    queryFn: () => getAllRealtors({ ...(params || {}) }),
    retry: false,
    refetchOnWindowFocus: false,

  });

  const allRealtors = allRealtorsQuery?.data?.data;

  return {
    allRealtorsQuery,
    allRealtors,
  };
}

export default useGetAllRealtors;
