import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getContractById from "@/api/website/contract/getContractById";

function useGetConrtactById(id: number) {
  // get contact details
  const contractDetailsQuery = useQuery({
    queryKey: [QUERY_KEYS?.contracts?.details, id],
    queryFn: () => getContractById({ id }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!id, 
  });

  // final data
  const contactDetails = contractDetailsQuery?.data;

  return {
    contractDetailsQuery,
    contactDetails,
  };
}

export default useGetConrtactById;
