import axiosClient from "@/libs/axios/axios-client";

async function getCities({ queryParams }: { queryParams?: Record<string, string> } = {}){
  const res = await axiosClient.get(`property/cities`, {
    params: queryParams
  });

  return res?.data?.data;

}

export default getCities;
