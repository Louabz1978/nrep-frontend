import axiosClient from "@/libs/axios/axios-client";

// verify OTP code api call function
// gets: email and otp code
async function sendOptCodeFunction({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) {
  const res = await axiosClient.post(`/reset/verify_otp`, { email, otp });

  return { success: res.data };
}

export default sendOptCodeFunction;
