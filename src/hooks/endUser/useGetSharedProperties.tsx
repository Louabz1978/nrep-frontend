import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getSharedProperties from "@/api/endUser/getSharedProperties";

function useGetSharedProperties() {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.sharedProperties}_`
  );

  // get shared properties query
  const sharedPropertiesQuery = useQuery({
    queryKey: [
      QUERY_KEYS?.endUser?.sharedProperties,
      JSON.stringify(queryParams),
    ],
    queryFn: () => getSharedProperties({ queryParams }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const sharedProperties = sharedPropertiesQuery?.data?.data;

  // total pages
  const totalPages = sharedPropertiesQuery?.data?.pagination?.total_pages;

  return {
    sharedPropertiesQuery,
    sharedProperties,
    totalPages,
  };
}

export default useGetSharedProperties;
