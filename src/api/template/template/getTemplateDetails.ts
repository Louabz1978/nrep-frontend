import axiosClient from "@/libs/axios/axios-client";
import type { Gender } from "./getTemplates";

interface getTemplateDetailsProps {
  queryKey: any[];
}

export interface TemplateDetailsType {
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

// get template details api call function
// returns: templates data list of this page
async function getTemplateDetails({
  queryKey,
}: getTemplateDetailsProps): Promise<TemplateDetailsType> {
  // const res = await axiosClient.get(`/center/templates/${queryKey?.[1]}`);

  // return res?.data?.data;
  return {
    id: 11,
    name: "Thomas White",
    phone: "+12125551234",
    email: "thomas.white@gmail.com",
    age: 40,
    gender: "male",
    address: "852 Spruce St, Austin, TX",
    isActive: true,
    createdAt: "2023-02-05",
    updatedAt: "2023-05-10",
  };
}

export default getTemplateDetails;
