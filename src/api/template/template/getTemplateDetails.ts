import axiosClient from "@/libs/axios/axios-client";
import type { Gender } from "./getTemplates";
import waitSeconds from "@/utils/waitSeconds";

interface getTemplateDetailsProps {
  queryKey: any[];
}

export interface TemplateDetailsType {
  id: number;
  name: string;
  phone: string;
  email: string;
  age: number;
  gender: { value: Gender };
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
  await waitSeconds();
  return {
    id: 11,
    arabic_name: "عبدالله بحلاق",
    english_name: "Abdullah Buhalq",
    gender: "ذكر",
    phone_number: "0923822343",
    level: "ماجستير",
    email: "3bdullah.bu7la8@gmail.com",
    note: "anything",
  };
}

export default getTemplateDetails;
