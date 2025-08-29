import axiosClient from "@/libs/axios/axios-client";
import type {
  getPropertyByMlsProps,
  getPropertyByMlsResult,
} from "@/types/website/listings";

// get property by MLS api call function,
// gets: mls number of property
// returns: details of property
async function getPropertyByMls({
  mls,
}: getPropertyByMlsProps): getPropertyByMlsResult {
  const res = await axiosClient.get(`property/mls/${mls}`);

  return res?.data?.property;
}

export default getPropertyByMls;
