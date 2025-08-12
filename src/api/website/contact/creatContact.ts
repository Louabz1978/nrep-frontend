import axiosClient from "@/libs/axios/axios-client";
import type {
  CreateContactProps,
  CreateContactResult,
} from "@/types/website/contact";
import createFormData from "@/utils/createFormData";

// create contact api call function,
// gets: contact data
async function createContact({
  data,
}: CreateContactProps): CreateContactResult {
  const formData = createFormData(data);

  const res = await axiosClient.post(`contact`, formData);

  return res?.data;
}

export default createContact;
