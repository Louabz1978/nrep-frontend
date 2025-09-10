import axiosClient from "@/libs/axios/axios-client";

async function getCities({
  queryParams,
}: { queryParams?: Record<string, string> } = {}) {
  const res = await axiosClient.get(`cities`, {
    params: queryParams,
  });

  return res?.data;
}

export default getCities;
