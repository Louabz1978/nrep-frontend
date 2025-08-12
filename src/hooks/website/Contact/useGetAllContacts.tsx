import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getAllContacts from "@/api/website/contact/getAllContacts";

function useGetAllContacts() {
  const searchParams = useOptimisticSearchParams();
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.contact}_`
  );

  // get listing details
  const allContactsQuery = useQuery({
    queryKey: [QUERY_KEYS?.listings?.query, JSON.stringify(queryParams)],
    queryFn: () => getAllContacts({ queryParams }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const allContacts = allContactsQuery?.data?.data

  // total pages
  const totalPages = allContactsQuery?.data?.pagination?.total_pages;

  return {
    allContactsQuery,
    allContacts,
    totalPages,
  };
}

export default useGetAllContacts;
