import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData, SearchParams } from "@/types/global/pagination";
import type { User } from "@/types/global/user";

// --- MODIFIED: Added props to match the hook ---
export type GetRealtorHistoryProps = {
  user_id : number;
  start_month: number;
  start_year: number;
  end_month: number;
  end_year: number;
  search: string;
  queryParams?: SearchParams; // For pagination (page, limit)
};

export type GetRealtorHistoryResult = Promise<AxiosRes<PaginationData<User[]>>>;

// --- MODIFIED: Destructure all new props ---
export default async function getRealtorHistory({
  user_id,
  start_month,
  start_year,
  end_month,
  end_year,
  search,
  queryParams,
}: GetRealtorHistoryProps): GetRealtorHistoryResult {
  const res = await axiosClient.get<AxiosRes<PaginationData<User[]>>>(
    `report/agents/detailed`,
    {
      // --- MODIFIED: Pass all params to the request ---
      params: {
        user_id,
        start_month,
        start_year,
        end_month,
        end_year,
        search,
        ...queryParams, // Pass along pagination params (page, limit)
        page: queryParams?.page ?? 1, // Keep default page
      },
    }
  );
  return res?.data;
}
