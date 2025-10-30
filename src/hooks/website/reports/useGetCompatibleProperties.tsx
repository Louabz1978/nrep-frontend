import { useQuery } from "@tanstack/react-query";
import getCompatibleProperties, {
  type GetCompatiblePropertiesProps,
} from "@/api/website/reports/getCompatibleProperties";
import QUERY_KEYS from "@/data/global/queryKeys";

export default function useGetCompatibleProperties({
  mls,
  queryParams,
}: GetCompatiblePropertiesProps) {
  const compatiblePropertiesQuery = useQuery({
    queryKey: [QUERY_KEYS.reports.compatibleProperties, mls, queryParams],
    queryFn: () => getCompatibleProperties({ mls, queryParams }),
    enabled: !!mls,
  });

  return {
    compatibleProperties: compatiblePropertiesQuery,
    compatiblePropertiesQuery,
  };
}
