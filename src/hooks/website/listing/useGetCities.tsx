import getCities from "@/api/website/listings/getCities";
import QUERY_KEYS from "@/data/global/queryKeys";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getSearchParams from "@/utils/getSearchParams";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";

function useGetCities({ search = "", perPage = 20 } = {}) {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.cities}_`
  );

  const query = useInfiniteQuery({
    queryKey: [
      QUERY_KEYS.listings.cities,
      JSON.stringify(queryParams),
      search,
      perPage,
    ],
    queryFn: () => getCities({ queryParams: queryParams }),
    getNextPageParam: (lastPage) => {
      const { current_page, total_pages } = lastPage?.pagination ?? {};
      return current_page < total_pages ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const cities = query.data?.pages?.flatMap((p) => p.data) || [];

  return {
    citiesQuery: query,
    cities,
  };
}

export default useGetCities;
