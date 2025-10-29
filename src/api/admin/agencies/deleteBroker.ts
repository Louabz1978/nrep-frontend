import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";

export type DeleteAgencyProps = { user_id: number };
export type DeleteAgencyResult = Promise<AxiosRes<string>>;

async function deleteBroker({
  user_id,
}: DeleteAgencyProps): DeleteAgencyResult {
  const res = await axiosClient.delete<AxiosRes<string>>(`/users/${user_id}`);
  return res?.data;
}

export default deleteBroker;
