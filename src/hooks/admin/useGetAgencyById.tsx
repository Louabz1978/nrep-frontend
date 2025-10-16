import { useQuery } from "@tanstack/react-query";
import getAgencyById from "@/api/admin/agencies/getAgencyById";
import type { GetAgencyByIdProps } from "@/api/admin/agencies/getAgencyById";
import QUERY_KEYS from "@/data/global/queryKeys";

function useGetAgencyById(params: GetAgencyByIdProps) {
  const agencyDetailsQuery = useQuery({
    queryKey: [QUERY_KEYS.agencies.details, params?.agency_id],
    queryFn: () => getAgencyById(params),
    enabled: Boolean(params?.agency_id),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const agency = agencyDetailsQuery?.data?.data;

  return { agencyDetailsQuery, agency };
}

export default useGetAgencyById;


