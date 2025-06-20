import axiosClient from "../../../lib/axios/axios-client";

// add template api call function
// gets: data of template
async function addTemplateFunction({ data }) {
  const res = await axiosClient.post(`/center/templates`, data);

  return res.data.data;
}

export default addTemplateFunction;
