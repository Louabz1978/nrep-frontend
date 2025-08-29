import getArea from "@/api/website/listings/getArea";
import QUERY_KEYS from "@/data/global/queryKeys";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getSearchParams from "@/utils/getSearchParams";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";

function useGetArea({ search = "", perPage = 20 } = {}) {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(searchParams, `${TABLE_PREFIXES.areas}_`);

  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.listings.area, JSON.stringify(queryParams) , search, perPage],
    queryFn: () => getArea({ queryParams: queryParams }),
    getNextPageParam: (lastPage) => {
      const { current_page, total_pages } = lastPage.pagination;
      return current_page < total_pages ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const Area = query.data?.pages?.flatMap((p) => p.data) || [];
  const hasMore = !!query.hasNextPage;

  return {
    AreaQuery: query,
    Area,
  };
}

export default useGetArea;
