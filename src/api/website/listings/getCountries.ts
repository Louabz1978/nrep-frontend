import axiosClient from "@/libs/axios/axios-client";

async function getCountries({ queryParams }: { queryParams?: Record<string, string> } = {}){
  const res = await axiosClient.get(`propertyt/countries`, {
    params: queryParams
  });

  return res?.data?.data;
}

export default getCountries;
