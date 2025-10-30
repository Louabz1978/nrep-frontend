import { useQuery } from "@tanstack/react-query";
import getTopAgencies from "@/api/admin/reports/getTopAgencies";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";

function useGetTopAgencies(searchParams?: { month?: string; year?: string }) {
  const topAgenciesQuery = useQuery({
    queryKey: [TABLE_PREFIXES.top_agencies, JSON.stringify(searchParams)],
    queryFn: () =>
      getTopAgencies({ searchParams: { ...(searchParams || {}) } }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false, 
  });

  const topAgencies = topAgenciesQuery.data || [];

  return { topAgenciesQuery, topAgencies };
}

export default useGetTopAgencies;
