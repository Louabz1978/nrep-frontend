import axiosClient from "@/libs/axios/axios-client";

interface deleteTemplateFunctionProps {
  id: number | string;
}

// delete template api call function
// gets: id of template
async function deleteTemplateFunction({ id }: deleteTemplateFunctionProps) {
  const res = await axiosClient.delete(`/center/templates/${id}`);

  return res.data.data;
}

export default deleteTemplateFunction;
