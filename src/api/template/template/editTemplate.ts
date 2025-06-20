import axiosClient from "../../../lib/axios/axios-client";

// edit template api call function
// gets: id of theacher, data of template
async function editTemplateFunction({ id, data }) {
  const res = await axiosClient.put(`/center/templates/${id}`, data);

  return res.data.data;
}

export default editTemplateFunction;
