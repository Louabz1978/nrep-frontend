import axiosAiClient from "@/libs/axios/axios-ai";
import type {
  getListingsPredictPriceProps,
  getListingsPredictPriceResult,
} from "@/types/website/listings";

// get listing predict price api call function,
// gets: id of listing
// returns: predict price of listing
async function getListingsPredictPrice({
  data,
}: getListingsPredictPriceProps): getListingsPredictPriceResult {
  console.log({ data });
  const res = await axiosAiClient.post(`predict/`, data);

  return res?.data;
}

export default getListingsPredictPrice;
