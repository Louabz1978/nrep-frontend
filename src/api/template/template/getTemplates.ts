import paginatedData from "@/data/template/template/dummyData";
// import axiosClient from "@/libs/axios/axios-client";
import type { PaginationData } from "@/types/global/pagination";
import waitSeconds from "@/utils/waitSeconds";
// import { cleanParams } from "@/utils/filter";

export type Gender = "male" | "female";

interface getTemplatesProps {
  queryKey: any[];
}

export interface TemplateType {
  id: number;
  name: string;
  phone: string;
  email: string;
  age: number;
  gender: Gender;
  address: string;
  isActive: boolean;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
}

// get templates api call function
// returns: templates data list of this page
async function getTemplates({ queryKey }: getTemplatesProps): Promise<
  {
    data: TemplateType[];
  } & PaginationData
> {
  // const res = await axiosClient.get(`/center/templates`, {
  //   params: {
  //     page: queryKey[2],
  //     size: queryKey[3],
  //     ...(cleanParams(queryKey?.[1]) ?? {}),
  //   },
  // });

  // return res.data.data;
  console.log("filter is", queryKey?.[1]);

  await waitSeconds();

  if (queryKey?.[1]?.search == "one") return paginatedData?.[6];
  return paginatedData?.[queryKey?.[2]];
}

export default getTemplates;
