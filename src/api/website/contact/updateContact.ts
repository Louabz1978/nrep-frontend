import axiosClient from "@/libs/axios/axios-client";
import type {
  UpdateContactProps,
  UpdateContactResult,
} from "@/types/website/contact";
import createFormData from "@/utils/createFormData";

const updateContact = async ({
  data,
  id,
}: UpdateContactProps): UpdateContactResult => {
  const formData = createFormData(data);

  const response = await axiosClient.put(`consumers/${id}`, formData);
  return { ...(response.data ?? {}), id };
};

export default updateContact;
