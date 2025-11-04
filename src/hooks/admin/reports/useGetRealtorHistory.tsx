import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "@/data/global/queryKeys";
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v6";
import getSearchParams from "@/utils/getSearchParams";
import TABLE_PREFIXES from "@/data/global/tablePrefixes";
import getRealtorHistory from "@/api/admin/reports/getRealtorHistory";

// --- NEW: Define props type to match Agencies hook ---
// This will accept the filter values passed from the component
type UseGetRealtorHistoryProps = {
  user_id : number,
  start_month: number;
  start_year: number;
  end_month: number;
  end_year: number;
  search: string;
};

// --- MODIFIED: Accept props ---
function useGetRealtorHistory({
  user_id,
  start_month,
  start_year,
  end_month,
  end_year,
  search,
}: UseGetRealtorHistoryProps) {
  const searchParams = useOptimisticSearchParams();
  // This will get pagination params like page, limit
  const queryParams = getSearchParams(
    searchParams,
    `${TABLE_PREFIXES.realtor_history}_`
  );

  const getRealtorHistoryQuery = useQuery({
    // --- MODIFIED: Add all filter params to queryKey ---
    queryKey: [
      QUERY_KEYS?.admin_reports.realtor_history,
      user_id,
      start_month,
      start_year,
      end_month,
      end_year,
      search,
      JSON.stringify(queryParams),
    ],
    // --- MODIFIED: Pass all params to the API function ---
    queryFn: () =>
      getRealtorHistory({
        user_id,
        start_month,
        start_year,
        end_month,
        end_year,
        search,
        queryParams: { ...queryParams }, // This passes page, limit, etc.
      }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // final data
  const realtorHistory = getRealtorHistoryQuery.data;

  return {
    getRealtorHistoryQuery,
    realtorHistory,
  };
}

export default useGetRealtorHistory;
