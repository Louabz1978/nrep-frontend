import axiosClient from "../../../lib/axios/axios-client";

// delete template api call function
// gets: id of template
async function deleteTemplateFunction({ id }) {
  const res = await axiosClient.delete(`/center/templates/${id}`);

  return res.data.data;
}

export default deleteTemplateFunction;
