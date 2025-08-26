import getCities from "@/api/website/listings/getCities";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetCities({ search = "", perPage = 20 } = {}) {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.listings.cities, search, perPage],
    queryFn: ({ pageParam = 1 }) =>
      getCities({ page: pageParam, per_page: perPage, search }),
    getNextPageParam: (lastPage) => {
      const { current_page, total_pages } = lastPage.pagination;
      return current_page < total_pages ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const cities = query.data?.pages?.flatMap((p) => p.data) || [];
  const hasMore = !!query.hasNextPage;

  return {
    citiesQuery: query,
    cities,
  };
}

export default useGetCities;
