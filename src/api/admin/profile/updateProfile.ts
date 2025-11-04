import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type {  CreateUserResult, User} from "@/types/admin/profile";

async function updateProfile(props: User): CreateUserResult {
  const res = await axiosClient.put<AxiosRes<string>>(
    `/users/${props.user_id}`,
    props
  );
  return res?.data;
}

export default updateProfile;
