import axiosClient from "@/libs/axios/axios-client";

interface editTemplateFunctionProps {
  id: number | string;
  data: any;
}

// edit template api call function
// gets: id of theacher, data of template
async function editTemplateFunction({ id, data }: editTemplateFunctionProps) {
  const res = await axiosClient.put(`/center/templates/${id}`, data);

  return res.data.data;
}

export default editTemplateFunction;
