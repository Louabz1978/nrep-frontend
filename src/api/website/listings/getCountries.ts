import axiosClient from "@/libs/axios/axios-client";

async function getCountries({
  queryParams,
}: { queryParams?: Record<string, string> } = {}) {
  const res = await axiosClient.get(`counties`, {
    params: queryParams,
  });

  return res?.data;
}

export default getCountries;
