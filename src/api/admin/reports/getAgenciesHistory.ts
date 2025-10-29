import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData, SearchParams } from "@/types/global/pagination";
import type { User } from "@/types/global/user";

// --- MODIFIED: Added specific required params from the image ---
export type GetAgenciesHistoryProps = {
  start_month: number;
  start_year: number;
  end_month: number;
  end_year: number;
  queryParams?: SearchParams; // For pagination (page, limit)
};

export type GetAgenciesHistoryResult = Promise<
  AxiosRes<PaginationData<User[]>>
>;

export default async function getAgenciesHistory({
  start_month,
  start_year,
  end_month,
  end_year,
  queryParams,
}: GetAgenciesHistoryProps): GetAgenciesHistoryResult {
  const res = await axiosClient.get<AxiosRes<PaginationData<User[]>>>(
    // --- MODIFIED: Corrected endpoint and used agency_id variable ---
    `/report/agency_history`,
    {
      // --- MODIFIED: Passed all params to the request ---
      params: {
        start_month,
        start_year,
        end_month,
        end_year,
        ...queryParams, // Pass along pagination params (page, limit)
      },
    }
  );
  return res?.data;
}
