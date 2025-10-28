import { useQuery } from "@tanstack/react-query";
import getCities from "@/api/admin/locations/getCities";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import type { City } from "@/types/admin/location";
import getSearchParams from "@/utils/getSearchParams";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";


function useGetCities() {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(searchParams, `${TABLE_PREFIXES.counties}_`);


  const citiesQuery = useQuery({
    queryKey: [TABLE_PREFIXES.cities, JSON.stringify(queryParams)],
    queryFn: () => getCities({queryParams}),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const cities = citiesQuery?.data?.data as City[] | undefined;




  return { citiesQuery, cities };
}

export default useGetCities;
