import axiosClient from "@/libs/axios/axios-client";

async function getArea({
  queryParams,
}: { queryParams?: Record<string, string> } = {}) {
  const res = await axiosClient.get(`property/areas`, {
    params: queryParams,
  });
  return res?.data?.data;
}

export default getArea;
