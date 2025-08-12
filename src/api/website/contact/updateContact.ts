import axiosClient from "@/libs/axios/axios-client";
import type {
  UpdateContactProps,
  UpdateContactResult,
} from "@/types/website/contact";
const updateContact = async ({
  data,
  id,
}: UpdateContactProps): Promise<UpdateContactResult> => {
  const response = await axiosClient.put(`/contacts/${id}`, data);
  return response.data;
};

export default updateContact;
