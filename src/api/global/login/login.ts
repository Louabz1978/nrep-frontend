import type { LoginFormType } from "@/data/global/LoginFormSchema";
import waitSeconds from "@/utils/waitSeconds";

// login api call function
// gets: data of template
async function loginFunction({ data }: { data: LoginFormType }) {
  console.log({ data });
  // const res = await axiosClient.post(`/center/templates`, data);

  // return res.data.data;
  await waitSeconds();

  return { message: "تمت الضافة بنجاح" };
}

export default loginFunction;
