import { AddSubscriptionDTO, Subscription } from "@/interfaces/Subscription";
import { marketAPI } from "./api";
import { AxiosResponse } from "axios";

export const getAllSubscriptions = async (): Promise<Subscription[]> => {
    try {
        const response: AxiosResponse<Subscription[]> = await marketAPI({
            url: '/subscription',
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return []
    }
}

export const getSubscriptionById = async (id: string): Promise<Subscription | undefined> => {
    try {
        const response: AxiosResponse<Subscription | undefined> = await marketAPI({
            url: `/subscription/${id}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const getSubscriptionsByUser = async (userId: string): Promise<Subscription | undefined> => {
    try {
        const response: AxiosResponse<Subscription | undefined> = await marketAPI({
            url: `/subscription/user/${userId}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const addSubscription = async (
    requestData: AddSubscriptionDTO
): Promise<Subscription> => {
    try {
        const response: AxiosResponse<Subscription> = await marketAPI({
            url: '/subscription',
            method: 'post',
            data: requestData,
        })

        return response.data

    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const updateSubscription = async (
    id: string,
    requestData: AddSubscriptionDTO
): Promise<Subscription | null> => {
    try {
        const response: AxiosResponse<Subscription | null> = await marketAPI({
            url: `/subscription/${id}`,
            method: 'put',
            data: requestData,
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const deleteSubscription = async (
    id: string
): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await marketAPI({
            url: `/subscription/${id}`,
            method: 'delete',
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}