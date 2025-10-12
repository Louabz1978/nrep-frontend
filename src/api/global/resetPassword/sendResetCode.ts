import axiosClient from "@/libs/axios/axios-client";

// send reset password code api call function
// gets: email address
async function sendResetCodeFunction({ email }: { email: string }) {
  const res = await axiosClient.post(`/reset/forgot-password`, { email });

  return { success: res.data };
}

export default sendResetCodeFunction;
