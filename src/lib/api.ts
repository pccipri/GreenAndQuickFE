import axios from "axios";
import { getAccessToken, refreshAccessToken, setAccessToken } from "./tokenManager";

export const marketAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RESOURCES_URL ?? "testing",
});

marketAPI.interceptors.request.use((config) => {
  const t = getAccessToken();
  if (t) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${t}`;
  }
  return config;
});

marketAPI.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.response?.status;
    const original = error?.config as any;

    if (!original || status !== 401) return Promise.reject(error);
    if (!getAccessToken()) return Promise.reject(error);
    if (original._retry) return Promise.reject(error);
    original._retry = true;

    // Never try to refresh for auth endpoints (mounted under /api/auth)
    if (original.url?.includes("/api/auth/")) {
      return Promise.reject(error);
    }

    try {
      const newToken = await refreshAccessToken(); // uses authAPI, no loop
      original.headers = original.headers ?? {};
      original.headers.Authorization = `Bearer ${newToken}`;
      return marketAPI(original); // retry once
    } catch (e) {
      setAccessToken(null);
      return Promise.reject(e);
    }
  }
);