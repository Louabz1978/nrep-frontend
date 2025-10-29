import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";

export type AddAgencyRealtorProps = {
  agency_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

export type AddAgencyRealtorResult = Promise<AxiosRes<string>>;

async function editAgencyRealtor(
  data: AddAgencyRealtorProps
): AddAgencyRealtorResult {
  const res = await axiosClient.put<AxiosRes<string>>(`/users/${data?.id}`, {
    ...data,
    role: ["realtor"],
  });
  return res?.data;
}

export default editAgencyRealtor;
