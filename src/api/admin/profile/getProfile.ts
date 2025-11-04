import axiosClient from "@/libs/axios/axios-client";

async function getProfile() {
  const res = await axiosClient.get(`/users/me`);

  return res?.data;
}

export default getProfile;
