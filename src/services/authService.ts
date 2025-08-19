
import { CreateUserDTO } from "@/interfaces/User";
import { marketAPI } from "./api";
import { LoginRequest, LoginResponse } from "@/interfaces/Auth";
import { AxiosResponse } from "axios";

export const registerUser = async (requestData: CreateUserDTO) => {
  try {
    const response = await marketAPI({
      url: '/user',
      method: 'post',
      data: requestData
    })
    return response
  } catch (error) {
    console.error('Error in the registration process:', error);
  }
}

export const login = async (
  requestData: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await marketAPI({
      url: '/auth/login',
      method: 'post',
      data: requestData,
    })

    return {
      ...response.data
    }
  } catch (error: any) {
    console.error('Error in the login process:', error)
    throw new Error(error.response?.data?.error || 'Login failed')
  }
}