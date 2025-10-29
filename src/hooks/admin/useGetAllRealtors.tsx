import { useQuery } from "@tanstack/react-query";
import getAllRealtors from "@/api/admin/getRealtor";
import type { GetAllRealtorsProps } from "@/api/admin/getRealtor";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getSearchParams from "@/utils/getSearchParams";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import QUERY_KEYS from "@/data/global/queryKeys";

function useGetAllRealtors(params?: GetAllRealtorsProps) {
  const searchParams = useOptimisticSearchParams();
  const queryParams = {
    ...(getSearchParams(searchParams, `${TABLE_PREFIXES.realtors}_`) ?? {}),
    ...(params ?? {}),
  };

  const allRealtorsQuery = useQuery({
    queryKey: [QUERY_KEYS.realtors.query, JSON.stringify(queryParams)],
    queryFn: () => getAllRealtors({ queryParams }),
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
