
import { AddUserDTO } from "@/interfaces/User";
import { marketAPI } from "../lib/api";
import { EmailTokenVerificationResponse, LoginRequest, LoginResponse } from "@/interfaces/Auth";
import { AxiosResponse } from "axios";
import { notify } from "@/utils/toast";

export const verifyRegisterToken = async (token: string): Promise<EmailTokenVerificationResponse | undefined> => {
  try {
    const response: AxiosResponse<EmailTokenVerificationResponse> = await marketAPI({
      url: `/auth/confirm/${token}`,
      method: 'get',
    })
    return response.data
  } catch (error: any) {
    console.error('Error in the token verification process:', error);
    notify(error.response?.data?.message || 'Login failed', "error")
    return undefined
  }
}

export const registerUser = async (requestData: AddUserDTO) => {
  try {
    const response = await marketAPI({
      url: '/user',
      method: 'post',
      data: requestData
    })
    return response
  } catch (error) {
    console.error('Error in the registration process:', error);
    return undefined
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

    return response.data
  } catch (error: any) {
    console.error('Error in the login process:', error)
    throw new Error(error.response?.data?.error || 'Login failed')
  }
}