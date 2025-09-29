import axiosClient from "@/libs/axios/axios-client";
// Placeholder API for updating a contract
// The real implementation should call your backend endpoint

export interface UpdateContractPayload {
  json: string;
  file: File;
  originalFile?: File;
  contractId?: number | string;
}

export default async function updateContract(
  payload: UpdateContractPayload
): Promise<{ success: boolean }> {
  const formData = new FormData();
  formData.append("json", payload.json);
  formData.append("file", payload.file);
  if (payload.contractId)
    formData.append("contractId", String(payload.contractId));
  if (payload.originalFile)
    formData.append("originalFile", payload.originalFile);

  const response = await axiosClient.post("/contracts/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
