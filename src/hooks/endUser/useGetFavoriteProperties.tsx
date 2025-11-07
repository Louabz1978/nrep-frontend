import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getFavoriteProperties from "@/api/endUser/getFavoriteProperties";

function useGetFavoriteProperties() {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.favoriteProperties}_`
  );

  // get favorite properties query
  const favoritePropertiesQuery = useQuery({
    queryKey: [
      QUERY_KEYS?.endUser?.favoriteProperties,
      JSON.stringify(queryParams),
    ],
    queryFn: () => getFavoriteProperties({ queryParams }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const favoriteProperties = favoritePropertiesQuery?.data?.data;

  // total pages
  const totalPages = favoritePropertiesQuery?.data?.pagination?.total_pages;

  return {
    favoritePropertiesQuery,
    favoriteProperties,
    totalPages,
  };
}

export default useGetFavoriteProperties;
