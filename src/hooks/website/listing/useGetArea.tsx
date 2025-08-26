import getArea from "@/api/website/listings/getArea";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetArea({ search = "", perPage = 20 } = {}) {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEYS.listings.area, search, perPage],
    queryFn: ({ pageParam = 1 }) =>
      getArea({ page: pageParam, per_page: perPage, search }),
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
