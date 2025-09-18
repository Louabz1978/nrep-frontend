import axiosClient from "@/libs/axios/axios-client";
import type { CreateContractResult } from "@/types/website/contract";

// create contract api call function,
// gets: contract data with PDF file
async function createContract({
  json,
  file,
  mls,
  id,
  ipAddress,
}: any): CreateContractResult {
  const formData = new FormData();
  formData.append("contract_json", json);
  formData.append("pdf_file", file);
  formData.append("ip_address", ipAddress);
  const res = await axiosClient.post(`contracts/sign/${mls}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res?.data;
}

export default createContract;
