import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";

export type AddAgencyRealtorProps = { agency_id: number; realtor_id: number };
export type AddAgencyRealtorResult = Promise<AxiosRes<string>>;

async function addAgencyRealtor({ agency_id, realtor_id }: AddAgencyRealtorProps): AddAgencyRealtorResult {
  const res = await axiosClient.post<AxiosRes<string>>(`/agencies/${agency_id}/${realtor_id}`);
  return res?.data;
}

export default addAgencyRealtor;


