import { useInfiniteQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getNotifications, {
  type GetNotificationsParams,
  type Notification,
} from "@/api/admin/notifications/getNotifications";
import type { PaginationData } from "@/types/global/pagination";
import type { AxiosRes } from "@/types/global/axios";

export const useInfiniteNotifications = (params: GetNotificationsParams) => {
  const query = useInfiniteQuery<
    AxiosRes<PaginationData<Notification[]>>,
    Error
  >({
    queryKey: [QUERY_KEYS.notifications.query, params.search],
    queryFn: ({ pageParam = 1 }) =>
      getNotifications({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      const { current_page, total_pages } = lastPage?.pagination ?? {};
      return current_page < total_pages ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 0,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const notifications =
    query.data?.pages.map((page) => page.data) || [];

  return {
    notifications,
    isLoading: query.isLoading,
    error: query.error,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    notificationsQuery: query,
  };
};
