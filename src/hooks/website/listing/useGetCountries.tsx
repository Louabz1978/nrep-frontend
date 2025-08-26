import getCountries from "@/api/website/listings/getCountries";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetCountries({ search = "", perPage = 20 } = {}) {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.listings.countries, search, perPage],
    queryFn: ({ pageParam = 1 }) =>
      getCountries({ page: pageParam, per_page: perPage, search }),
    getNextPageParam: (lastPage) => {
      const { current_page, total_pages } = lastPage.pagination;
      return current_page < total_pages ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const countries = query.data?.pages?.flatMap((p) => p.data) || [];
  const hasMore = !!query.hasNextPage;

  return {
    countriesQuery: query,
    countries,
  };
}

export default useGetCountries;
