import { AddProductDTO, Product } from "@/interfaces/Product";
import { marketAPI } from "../lib/api";
import { AxiosResponse } from "axios";

export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const response: AxiosResponse<Product[]> = await marketAPI({
            url: '/product',
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return []
    }
}

export const getProductById = async (id: string): Promise<Product | undefined> => {
    try {
        const response: AxiosResponse<Product | undefined> = await marketAPI({
            url: `/product/${id}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const getProductsByShop = async (shopId: string): Promise<Product | undefined> => {
    try {
        const response: AxiosResponse<Product | undefined> = await marketAPI({
            url: `/product/shop/${shopId}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const getProductsByCategory = async (categoryId: string): Promise<Product | undefined> => {
    try {
        const response: AxiosResponse<Product | undefined> = await marketAPI({
            url: `/product/category/${categoryId}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const addProduct = async (
    requestData: AddProductDTO
): Promise<Product> => {
    try {
        const response: AxiosResponse<Product> = await marketAPI({
            url: '/product',
            method: 'post',
            data: requestData,
        })

        return response.data

    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const updateProduct = async (
    id: string,
    requestData: AddProductDTO
): Promise<Product | null> => {
    try {
        const response: AxiosResponse<Product | null> = await marketAPI({
            url: `/product/${id}`,
            method: 'put',
            data: requestData,
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const deleteProduct = async (
    id: string
): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await marketAPI({
            url: `/product/${id}`,
            method: 'delete',
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}