import axiosClient from "@/libs/axios/axios-client";
import type { GetContractProps, GetContractResult } from "@/types/website/contract";


async function getContractById({ id }: GetContractProps): GetContractResult {
  const res = await axiosClient.get(`contracts/${id}`);

  return res?.data;
}

export default getContractById;
