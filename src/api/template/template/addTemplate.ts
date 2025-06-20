import axiosClient from "@/libs/axios/axios-client";

interface addTemplateFunctionProps {
  data: any;
}

// add template api call function
// gets: data of template
async function addTemplateFunction({ data }: addTemplateFunctionProps) {
  const res = await axiosClient.post(`/center/templates`, data);

  return res.data.data;
}

export default addTemplateFunction;
