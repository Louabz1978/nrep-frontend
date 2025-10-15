import axiosClient from "@/libs/axios/axios-client";

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
}

export const refreshTokenFunction = async (data: RefreshTokenRequest): Promise<string> => {

  const response = await axiosClient.post<RefreshTokenResponse>("auth/refresh", null, { params: data });

  if (!response.data) {
    throw new Error("Token refresh failed");
  }

    const { access_token } = response.data;
  return access_token;
};
