import axiosClient from "@/libs/axios/axios-client";
import type {
  getListingsDetailsProps,
  getListingsDetailsResult,
} from "@/types/website/listings";

// get listing details api call function,
// gets: id of listing
// returns: details of listing
async function getListingsDetails({
  id,
}: getListingsDetailsProps): getListingsDetailsResult {
  const res = await axiosClient.get(`property/${id}`);

  return res?.data?.property;
}

export default getListingsDetails;
