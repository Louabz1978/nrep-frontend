// import axiosClient from "../../../lib/axios/axios-client";

import { delay } from "./getItems";

// news subscribe api call function
// gets: values of subscribtion
async function subscribeFunction() {
  await delay(3000);
  //   const formData = new FormData();
  //   formData.append("email", values?.email);

  //   const res = await axiosClient.post(`user/newsLetterSubscriber/store`, values);

  return { success: true, message: "success" };
  //   return res.data.data;
}

export default subscribeFunction;
