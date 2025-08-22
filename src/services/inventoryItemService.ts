import { AddInventoryItemDTO, InventoryItem } from "@/interfaces/InventoryItem";
import { marketAPI } from "./api";
import { AxiosResponse } from "axios";

export const getAllInventoryItems = async (): Promise<InventoryItem[]> => {
    try {
        const response: AxiosResponse<InventoryItem[]> = await marketAPI({
            url: '/inventoryItem',
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return []
    }
}

export const getInventoryItemById = async (id: string): Promise<InventoryItem | undefined> => {
    try {
        const response: AxiosResponse<InventoryItem | undefined> = await marketAPI({
            url: `/inventory/${id}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const getInventoryByProduct = async (productId: string): Promise<InventoryItem | undefined> => {
    try {
        const response: AxiosResponse<InventoryItem | undefined> = await marketAPI({
            url: `/inventory/product/${productId}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const getInventoryByShop = async (shopId: string): Promise<InventoryItem | undefined> => {
    try {
        const response: AxiosResponse<InventoryItem | undefined> = await marketAPI({
            url: `/inventory/shop/${shopId}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const addInventoryItem = async (
    requestData: AddInventoryItemDTO
): Promise<InventoryItem> => {
    try {
        const response: AxiosResponse<InventoryItem> = await marketAPI({
            url: '/inventoryItem',
            method: 'post',
            data: requestData,
        })

        return response.data

    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const updateInventoryItem = async (
    id: string,
    requestData: AddInventoryItemDTO
): Promise<InventoryItem | null> => {
    try {
        const response: AxiosResponse<InventoryItem | null> = await marketAPI({
            url: `/inventoryItem/${id}`,
            method: 'put',
            data: requestData,
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const deleteInventoryItem = async (
    id: string
): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await marketAPI({
            url: `/inventoryItem/${id}`,
            method: 'delete',
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}