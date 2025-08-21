import axiosClient from "@/libs/axios/axios-client";
import type {
  CreateContactProps,
  CreateContactResult,
} from "@/types/website/contact";

// create contact api call function,
// gets: contact data
async function createContact({
  data,
}: CreateContactProps): CreateContactResult {
  const res = await axiosClient.post(`consumers`, data);

  return res?.data;
}

export default createContact;
