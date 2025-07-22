// import axiosClient from "@/libs/axios/axios-client";
import waitSeconds from "@/utils/waitSeconds";

// logout api call function
// gets: data of template
async function logoutFunction() {
  await waitSeconds();
  // const res = await axiosClient.post(`auth/logout`, formData);

  return { success: true };
}

export default logoutFunction;
