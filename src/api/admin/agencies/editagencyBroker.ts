import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";

export type AddAgencyBrokerProps = {
  agency_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

export type AddAgencyBrokerResult = Promise<AxiosRes<string>>;

async function editAgencyBroker(
  data: AddAgencyBrokerProps
): AddAgencyBrokerResult {
  const res = await axiosClient.put<AxiosRes<string>>(`/users/${data?.id}`, {
    ...data,
    role: ["broker"],
  });
  return res?.data;
}

export default editAgencyBroker;
