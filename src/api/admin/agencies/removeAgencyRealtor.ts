import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";

export type RemoveAgencyRealtorProps = { agency_id: number; realtor_id: number };
export type RemoveAgencyRealtorResult = Promise<AxiosRes<string>>;

async function removeAgencyRealtor({ agency_id, realtor_id }: RemoveAgencyRealtorProps): RemoveAgencyRealtorResult {
  const res = await axiosClient.delete<AxiosRes<string>>(`/agencies/${agency_id}/${realtor_id}`);
  return res?.data;
}

export default removeAgencyRealtor;


