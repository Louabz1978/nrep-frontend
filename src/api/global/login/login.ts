import type { LoginFormType } from "@/data/global/LoginFormSchema";
import axiosClient from "@/libs/axios/axios-client";

// login api call function
// gets: data of login contains userName/email and password
async function loginFunction({ data }: { data: LoginFormType }) {
  const formData = new FormData();
  Object.keys(data)?.map((key) => {
    formData.append(key, data[key as keyof typeof data]);
  });

  const res = await axiosClient.post(`auth/login`, formData);

  return { user: res.data };
}

export default loginFunction;
