import { AddFavouriteDTO, Favourite } from "@/interfaces/Favourite";
import { marketAPI } from "./api";
import { AxiosResponse } from "axios";

export const getAllFavourites = async (): Promise<Favourite[]> => {
    try {
        const response: AxiosResponse<Favourite[]> = await marketAPI({
            url: '/favourite',
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return []
    }
}

export const getFavouriteById = async (id: string): Promise<Favourite | undefined> => {
    try {
        const response: AxiosResponse<Favourite | undefined> = await marketAPI({
            url: `/favourite/${id}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const addFavourite = async (
    requestData: AddFavouriteDTO
): Promise<Favourite> => {
    try {
        const response: AxiosResponse<Favourite> = await marketAPI({
            url: '/favourite',
            method: 'post',
            data: requestData,
        })

        return response.data

    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const updateFavourite = async (
    id: string,
    requestData: AddFavouriteDTO
): Promise<Favourite | null> => {
    try {
        const response: AxiosResponse<Favourite | null> = await marketAPI({
            url: `/favourite/${id}`,
            method: 'put',
            data: requestData,
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const deleteFavourite = async (
    id: string
): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await marketAPI({
            url: `/favourite/${id}`,
            method: 'delete',
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}