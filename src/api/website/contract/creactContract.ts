import axiosClient from "@/libs/axios/axios-client";
import type {
  CreateContractProps,
  CreateContractResult,
} from "@/types/website/contract";

// create contract api call function,
// gets: contract data with PDF file
async function createContract({
  data,
}: CreateContractProps): CreateContractResult {
  const res = await axiosClient.post(`contract`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res?.data;
}

export default createContract;
