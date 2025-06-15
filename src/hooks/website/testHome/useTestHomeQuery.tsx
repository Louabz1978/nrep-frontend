import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getItems from "@/api/website/homeTest/getItems";

function useItemsQuery() {
  // get items
  const itemsQuery = useQuery({
    queryKey: [QUERY_KEYS?.items?.query],
    queryFn: getItems,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    itemsQuery,
  };
}

export default useItemsQuery;
