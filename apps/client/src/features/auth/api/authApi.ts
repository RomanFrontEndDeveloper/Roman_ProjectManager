import { api } from "@/lib/axios";

export const login = async (data: { email: string; password: string }) => {
  const response = await api.post("/v1/auth/login", data);

  const { accessToken } = response.data;

  localStorage.setItem("accessToken", accessToken);

  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/v1/auth/me");

  return response.data;
};
