import getCountries from "@/api/website/listings/getCountries";
import QUERY_KEYS from "@/data/global/queryKeys";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getSearchParams from "@/utils/getSearchParams";
import { useQuery } from "@tanstack/react-query";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";

function useGetCountries({ search = "", perPage = 20 } = {}) {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.governorates}_`
  );

  // const query = useInfiniteQuery({
  //   queryKey: [
  //     QUERY_KEYS.listings.countries,
  //     JSON.stringify(queryParams),
  //     search,
  //     perPage,
  //   ],
  //   queryFn: () => getCountries({ queryParams: queryParams }),
  //   getNextPageParam: (lastPage) => {
  //     const { current_page, total_pages } = lastPage?.pagination ?? {};
  //     return current_page < total_pages ? current_page + 1 : undefined;
  //   },
  //   initialPageParam: 1,
  //   retry: false,
  //   refetchOnWindowFocus: false,
  // });
  const query = useQuery({
    queryKey: [
      QUERY_KEYS.listings.countries,
      JSON.stringify(queryParams),
      search,
      perPage,
    ],
    queryFn: () => getCountries({ queryParams: queryParams }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const countries = query.data || [];

  return {
    countriesQuery: query,
    countries,
  };
}

export default useGetCountries;
