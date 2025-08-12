import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import getContact from "@/api/website/contact/getContact";

function useGetContact(id: number) {
  // get contact details
  const contactDetailsQuery = useQuery({
    queryKey: [QUERY_KEYS?.contact?.details, id],
    queryFn: () => getContact({ id }),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!id, // Only run query if id exists
  });

  // final data
  const contactDetails = contactDetailsQuery?.data;

  return {
    contactDetailsQuery,
    contactDetails,
  };
}

export default useGetContact;
