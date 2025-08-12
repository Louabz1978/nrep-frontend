import axiosClient from "@/libs/axios/axios-client";
import type {
  DeleteContactProps,
  DeleteContactResult,
} from "@/types/website/contact";

// delete contact api call function,
// gets: contact id
async function removeContact({ id }: DeleteContactProps): DeleteContactResult {
  const res = await axiosClient.delete(`contact/${id}`);

  return res?.data;
}

export default removeContact;
