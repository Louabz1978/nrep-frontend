import { useQuery } from "@tanstack/react-query";
import getAgencies from "@/api/admin/agencies/getAgencies";
import type { GetAgenciesProps } from "@/api/admin/agencies/getAgencies";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";

function useGetAgencies(params?: GetAgenciesProps) {
  const agenciesQuery = useQuery({
    queryKey: [TABLE_PREFIXES.agencies, JSON.stringify(params?.queryParams)],
    queryFn: () => getAgencies({ ...(params || {}) }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const agencies = agenciesQuery?.data?.data;

  return { agenciesQuery, agencies };
}

export default useGetAgencies;


