// get listing status api call function

import axiosClient from "@/libs/axios/axios-client";

async function getListingsStatus() {
  const res = await axiosClient.get(`listings/status`);

  return res?.data?.data;
}

export default getListingsStatus;
