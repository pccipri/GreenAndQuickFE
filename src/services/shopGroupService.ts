import { AddShopGroupDTO, ShopGroup } from "@/interfaces/ShopGroup";
import { marketAPI } from "../lib/api";
import { AxiosResponse } from "axios";

export const getAllShopGroups = async (): Promise<ShopGroup[]> => {
    try {
        const response: AxiosResponse<ShopGroup[]> = await marketAPI({
            url: '/shopGroup',
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return []
    }
}

export const getShopGroupById = async (id: string): Promise<ShopGroup | undefined> => {
    try {
        const response: AxiosResponse<ShopGroup | undefined> = await marketAPI({
            url: `/shopGroup/${id}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const addShopGroup = async (
    requestData: AddShopGroupDTO
): Promise<ShopGroup> => {
    try {
        const response: AxiosResponse<ShopGroup> = await marketAPI({
            url: '/shopGroup',
            method: 'post',
            data: requestData,
        })

        return response.data

    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const updateShopGroup = async (
    id: string,
    requestData: AddShopGroupDTO
): Promise<ShopGroup | null> => {
    try {
        const response: AxiosResponse<ShopGroup | null> = await marketAPI({
            url: `/shopGroup/${id}`,
            method: 'put',
            data: requestData,
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const deleteShopGroup = async (
    id: string
): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await marketAPI({
            url: `/shopGroup/${id}`,
            method: 'delete',
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}