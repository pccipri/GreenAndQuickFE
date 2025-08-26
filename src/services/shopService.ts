import { AddShopDTO, Shop } from "@/interfaces/Shop";
import { marketAPI } from "./api";
import { AxiosResponse } from "axios";

export const getAllShops = async (): Promise<Shop[]> => {
    try {
        const response: AxiosResponse<Shop[]> = await marketAPI({
            url: '/shop',
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return []
    }
}

export const getShopById = async (id: string): Promise<Shop | undefined> => {
    try {
        const response: AxiosResponse<Shop | undefined> = await marketAPI({
            url: `/shop/${id}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const getShopByOwner = async (ownerId: string): Promise<Shop | undefined> => {
    try {
        const response: AxiosResponse<Shop | undefined> = await marketAPI({
            url: `/shop/owner/${ownerId}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const addShop = async (
    requestData: AddShopDTO
): Promise<Shop> => {
    try {
        const response: AxiosResponse<Shop> = await marketAPI({
            url: '/shop',
            method: 'post',
            data: requestData,
        })

        return response.data

    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const updateShop = async (
    id: string,
    requestData: AddShopDTO
): Promise<Shop | null> => {
    try {
        const response: AxiosResponse<Shop | null> = await marketAPI({
            url: `/shop/${id}`,
            method: 'put',
            data: requestData,
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const deleteShop = async (
    id: string
): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await marketAPI({
            url: `/shop/${id}`,
            method: 'delete',
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}