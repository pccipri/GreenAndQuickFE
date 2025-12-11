import axios from "axios";

let accessToken: string | null = null;
let refreshInFlight: Promise<string> | null = null;

// Auth instance points to /api/auth and sends the httpOnly cookie
export const authAPI = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_RESOURCES_URL ?? "TESTING") + "/auth",
  withCredentials: true,
});

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

/** Single-flight refresh using the refresh cookie */
export async function refreshAccessToken(): Promise<string> {
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async () => {
    const { data } = await authAPI.post("/refreshToken");
    const newToken: string = data.accessToken;
    setAccessToken(newToken);
    return newToken;
  })();

  try {
    return await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
}