import axios from "axios";

let accessToken: string | null = null

export const marketAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RESOURCES_URL ?? "testing",
  withCredentials: true
});

export const setAccessToken = (token: string | null) => {
  accessToken = token
}

// Attach access token to requests
marketAPI.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers || {}
    config.headers["Authorization"] = `Bearer ${accessToken}`
  }
  return config
})

// Handle token expiration
marketAPI.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      try {
        const { data } = await marketAPI.post("/auth/refreshToken")
        setAccessToken(data.accessToken)
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`
        return marketAPI(originalRequest)
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  }
)