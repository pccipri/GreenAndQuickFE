import { AddCategoryDTO, Category } from "@/interfaces/Category";
import { marketAPI } from "../lib/api";
import { AxiosResponse } from "axios";

export const getAllCategories = async (): Promise<Category[]> => {
    try {
        const response: AxiosResponse<Category[]> = await marketAPI({
            url: '/category',
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return []
    }
}

export const getCategoryById = async (id: string): Promise<Category | undefined> => {
    try {
        const response: AxiosResponse<Category | undefined> = await marketAPI({
            url: `/category/${id}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const addCategory = async (
    requestData: AddCategoryDTO
): Promise<Category> => {
    try {
        const response: AxiosResponse<Category> = await marketAPI({
            url: '/category',
            method: 'post',
            data: requestData,
        })

        return response.data

    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const updateCategory = async (
    id: string,
    requestData: AddCategoryDTO
): Promise<Category | null> => {
    try {
        const response: AxiosResponse<Category | null> = await marketAPI({
            url: `/category/${id}`,
            method: 'put',
            data: requestData,
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const deleteCategory = async (
    id: string
): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await marketAPI({
            url: `/category/${id}`,
            method: 'delete',
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}