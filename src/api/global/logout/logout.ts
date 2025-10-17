import axiosClient from "@/libs/axios/axios-client";

interface LogoutProps {
  token: string;
  type: string;
}

// logout api call function
async function logoutFunction({ token, type }: LogoutProps) {
  const res = await axiosClient.post(`auth/logout`, { token, type });

  return res.data;
}

export default logoutFunction;
