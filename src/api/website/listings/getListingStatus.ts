// get listing status api call function

import axiosClient from "@/libs/axios/axios-client";

async function getListingsStatus({ queryParams }: { queryParams?: Record<string, string> } = {}) {
  const res = await axiosClient.get(`property/status-options`, {
    params: queryParams
  });

  return res?.data?.data;
}

export default getListingsStatus;
