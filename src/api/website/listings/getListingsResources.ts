// get listing resources api call function

import axiosClient from "@/libs/axios/axios-client";

// returns: select options for listing form
async function getListingsResources() {
  const res = await axiosClient.get(`listings/resources`);

  return res?.data?.data;
}

export default getListingsResources;
