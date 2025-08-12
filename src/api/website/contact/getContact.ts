import axiosClient from "@/libs/axios/axios-client";
import type {
  GetContactProps,
  GetContactResult,
} from "@/types/website/contact";

// get contact details api call function,
// gets: id of contact
// returns: details of contact
async function getContact({ id }: GetContactProps): GetContactResult {
  const res = await axiosClient.get(`/contacts/${id}`);

  return res?.data?.contact;
}

export default getContact;
