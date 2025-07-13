import waitSeconds from "@/utils/waitSeconds";

export interface deleteTemplateFunctionProps {
  id: number | string;
}

// delete template api call function
// gets: id of template
async function deleteTemplateFunction({ id }: deleteTemplateFunctionProps) {
  console.log({ id });
  // const res = await axiosClient.delete(`/center/templates/${id}`);

  // return res.data.data;
  await waitSeconds();
  return { message: "تمت الضافة بنجاح" };
}

export default deleteTemplateFunction;
