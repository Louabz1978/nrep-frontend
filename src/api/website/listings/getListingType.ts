// get listing Type api call function

import axiosClient from "@/libs/axios/axios-client";

// returns: select options for listing form
async function getListingsType({ queryParams }: { queryParams?: Record<string, string> } = {}) {
  const res = await axiosClient.get(`propertytypes_option`, {
    params: queryParams
  });

  return res?.data?.data;
}

export default getListingsType;
