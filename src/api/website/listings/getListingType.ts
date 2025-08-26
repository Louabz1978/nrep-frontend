// get listing Type api call function

import axiosClient from "@/libs/axios/axios-client";

// returns: select options for listing form
async function getListingsType() {
  const res = await axiosClient.get(`listings/type`);

  return res?.data?.data;
}

export default getListingsType;
