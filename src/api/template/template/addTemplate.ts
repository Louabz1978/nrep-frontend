import type { TemplateFormType } from "@/data/template/template/templateFormSchema";
import waitSeconds from "@/utils/waitSeconds";

export interface addTemplateFunctionProps {
  data: TemplateFormType;
}

// add template api call function
// gets: data of template
async function addTemplateFunction({ data }: addTemplateFunctionProps) {
  console.log({ data });
  // const res = await axiosClient.post(`/center/templates`, data);

  // return res.data.data;
  await waitSeconds();
  return { message: "تمت الضافة بنجاح" };
}

export default addTemplateFunction;
