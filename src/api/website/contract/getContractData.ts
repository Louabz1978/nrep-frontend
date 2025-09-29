import type { ContractFormType } from "@/data/website/schema/contractSchema";
import axiosClient from "@/libs/axios/axios-client";

export const getContractData = async (contractId: string) => {
  const response = await axiosClient.get<ContractFormType>(`/contracts/edit/sign/${contractId}`);
  return response.data;
};
