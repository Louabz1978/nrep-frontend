export const refreshTokenFunction = async (): Promise<string> => {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token refresh failed");
  }

  const { token } = await response.json();
  return token;
};
