import axiosClient from "@/libs/axios/axios-client";

export interface ResetPasswordRequest {
  email: string;
  token: string;
  new_password: string;
}
export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}
export const resetPassword = async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  const response = await axiosClient.post<ResetPasswordResponse>("/reset/password-reset", data);
  return response.data;
};
