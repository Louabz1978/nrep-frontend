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

async function addAgencyBroker({
  agency_id,
  first_name,
  last_name,
  email,
  phone_number,
}: AddAgencyBrokerProps): AddAgencyBrokerResult {
  const res = await axiosClient.post<AxiosRes<string>>(
    `/agencies/brokers/${agency_id}`,
    { first_name, last_name, email, phone_number }
  );
  return res?.data;
}

export default addAgencyBroker;
