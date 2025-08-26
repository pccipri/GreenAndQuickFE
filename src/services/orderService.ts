import { AddOrderDTO, Order } from "@/interfaces/Order";
import { marketAPI } from "./api";
import { AxiosResponse } from "axios";

export const getAllOrders = async (): Promise<Order[]> => {
    try {
        const response: AxiosResponse<Order[]> = await marketAPI({
            url: '/order',
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return []
    }
}

export const getOrderById = async (id: string): Promise<Order | undefined> => {
    try {
        const response: AxiosResponse<Order | undefined> = await marketAPI({
            url: `/order/${id}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const getOrderByUser = async (userId: string): Promise<Order | undefined> => {
    try {
        const response: AxiosResponse<Order | undefined> = await marketAPI({
            url: `/order/user/${userId}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const addOrder = async (
    requestData: AddOrderDTO
): Promise<Order> => {
    try {
        const response: AxiosResponse<Order> = await marketAPI({
            url: '/order',
            method: 'post',
            data: requestData,
        })

        return response.data

    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const updateOrder = async (
    id: string,
    requestData: AddOrderDTO
): Promise<Order | null> => {
    try {
        const response: AxiosResponse<Order | null> = await marketAPI({
            url: `/order/${id}`,
            method: 'put',
            data: requestData,
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const deleteOrder = async (
    id: string
): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await marketAPI({
            url: `/order/${id}`,
            method: 'delete',
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}