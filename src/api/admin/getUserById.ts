import axiosClient from "@/libs/axios/axios-client";
import type { AxiosRes } from "@/types/global/axios";
import type { UserDetails } from "@/types/global/user";

export type GetUserByIdProps = {
  user_id: number;
};

export type GetUserByIdResult = Promise<AxiosRes<UserDetails>>;

async function getUserById({ user_id }: GetUserByIdProps): GetUserByIdResult {
  const res = await axiosClient.get<AxiosRes<UserDetails>>(`/users/${user_id}`);
  return res?.data;
}

export default getUserById;
