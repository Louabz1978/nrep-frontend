import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { PaginationData } from "@/types/global/pagination";
import type {
  Contact,
  GetAllContactsProps,
  GetAllContactsResult,
} from "@/types/website/contact";

// get all contacts api call function,
// gets: query parameters for pagination and filtering
// returns: paginated list of contacts with user info
async function getAllContacts({
  queryParams,
}: GetAllContactsProps): GetAllContactsResult {
  const res = await axiosClient.get<AxiosRes<PaginationData<Contact[]>>>(
    `consumers/`,
    {
      params: {
        ...queryParams,
        page: queryParams?.page ?? 1,
      },
    }
  );

  return res?.data;
}

export default getAllContacts;
