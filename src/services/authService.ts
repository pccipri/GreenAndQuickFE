
import { AddUserDTO } from "@/interfaces/User";
import { marketAPI } from "../lib/api";
import { EmailTokenVerificationResponse, LoginRequest, LoginResponse, RegisterResponse, ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse } from "@/interfaces/Auth";
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
    notify(error.response?.data?.error || 'Verification failed', "error")
    return undefined
  }
}

export const registerUser = async (requestData: AddUserDTO): Promise<RegisterResponse | undefined> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await marketAPI({
      url: '/user',
      method: 'post',
      data: requestData
    })
    return response.data
  } catch (error: any) {
    console.error('Error in the registration process:', error);
    throw new Error(error.response?.data?.error || 'Registration failed')
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

export const requestPasswordReset = async (requestData: ForgotPasswordRequest): Promise<ForgotPasswordResponse | undefined> => {
  try {
    const response: AxiosResponse<ForgotPasswordResponse> = await marketAPI({
      url: '/auth/forgot-password',
      method: 'post',
      data: requestData,
    })
    return response.data
  } catch (error: any) {
    console.error('Error in the forgot password process:', error);
    notify(error.response?.data?.error || 'Request failed', "error")
    return undefined
  }
}

export const resetPassword = async (requestData: ResetPasswordRequest): Promise<ResetPasswordResponse | undefined> => {
  try {
    const response: AxiosResponse<ResetPasswordResponse> = await marketAPI({
      url: '/auth/reset-password',
      method: 'post',
      data: requestData,
    })
    return response.data
  } catch (error: any) {
    console.error('Error in the reset password process:', error);
    notify(error.response?.data?.error || 'Reset failed', "error")
    return undefined
  }
}