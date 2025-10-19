import { useQuery } from "@tanstack/react-query";
import getCities from "@/api/admin/locations/getCities";
import type { GetCitiesProps } from "@/api/admin/locations/getCities";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import type { City } from "@/types/admin/location";


function useGetCities(params?: GetCitiesProps) {
  const citiesQuery = useQuery({
    queryKey: [TABLE_PREFIXES.cities, JSON.stringify(params?.queryParams)],
    queryFn: () => getCities({ ...(params || {}) }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const cities = citiesQuery?.data?.data as City[] | undefined;




  return { citiesQuery, cities };
}

export default useGetCities;
