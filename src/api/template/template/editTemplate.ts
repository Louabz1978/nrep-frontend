import type { TemplateFormType } from "@/data/template/template/templateFormSchema";
import axiosClient from "@/libs/axios/axios-client";
import waitSeconds from "@/utils/waitSeconds";

export interface editTemplateFunctionProps {
  id: number | string;
  data: TemplateFormType;
}

// edit template api call function
// gets: id of theacher, data of template
async function editTemplateFunction({ id, data }: editTemplateFunctionProps) {
  console.log({ id, data });
  // const res = await axiosClient.put(`/center/templates/${id}`, data);

  // return res.data.data;
  await waitSeconds();
  return { message: "تمت الضافة بنجاح" };
}

export default editTemplateFunction;
