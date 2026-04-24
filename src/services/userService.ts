import { AddUserDTO, User } from "@/interfaces/User";
import { marketAPI } from "../lib/api";
import { AxiosResponse } from "axios";

export const getAllUsers = async (): Promise<User[]> => {
    try {
        const response: AxiosResponse<User[]> = await marketAPI({
            url: '/user',
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return []
    }
}

export const getUserById = async (id: string): Promise<User | undefined> => {
    try {
        const response: AxiosResponse<User | undefined> = await marketAPI({
            url: `/user/${id}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const getUsersByRole = async (role: string): Promise<User[] | undefined> => {
    try {
        const response: AxiosResponse<User[] | undefined> = await marketAPI({
            url: `/user/role/${role}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const addUser = async (
    requestData: AddUserDTO
): Promise<User> => {
    try {
        const response: AxiosResponse<User> = await marketAPI({
            url: '/user',
            method: 'post',
            data: requestData,
        })

        return response.data

    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const updateUser = async (
    id: string,
    requestData: AddUserDTO
): Promise<User | null> => {
    try {
        const response: AxiosResponse<User | null> = await marketAPI({
            url: `/user/${id}`,
            method: 'put',
            data: requestData,
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const updateUserLanguage = async (
    userId: string,
    language: 'en' | 'ro'
): Promise<User | null> => {
    try {
        const response: AxiosResponse<User | null> = await marketAPI({
            url: `/user/${userId}/settings`,
            method: 'put',
            data: { preferredLanguage: language },
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Failed to update language')
    }
}

export const deleteUser = async (
    id: string
): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await marketAPI({
            url: `/user/${id}`,
            method: 'delete',
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}