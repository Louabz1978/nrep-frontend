import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getMarketWatcher, {
  type GetMarketWatcherProps,
  type GetMarketWatcherResult,
} from "@/api/website/listings/getMarketWatcher";

function useMarketWatcher(props: GetMarketWatcherProps | null) {
  const safeProps: GetMarketWatcherProps = props ?? {};

  const query = useQuery<GetMarketWatcherResult>({
    queryKey: [
      QUERY_KEYS?.listings?.marketWatcher,JSON.stringify(safeProps?.queryParams || {}),
    ],
    queryFn: () => getMarketWatcher(safeProps),
    enabled: true,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    marketWatcherQuery: query,
    marketWatcher: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    isFetched: query.isFetched,
  };
}

export default useMarketWatcher;


