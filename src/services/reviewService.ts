import { AddReviewDTO, Review } from "@/interfaces/Review";
import { marketAPI } from "../lib/api";
import { AxiosResponse } from "axios";

export const getAllReviews = async (): Promise<Review[]> => {
    try {
        const response: AxiosResponse<Review[]> = await marketAPI({
            url: '/review',
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return []
    }
}

export const getReviewById = async (id: string): Promise<Review | undefined> => {
    try {
        const response: AxiosResponse<Review | undefined> = await marketAPI({
            url: `/review/${id}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const getReviewsByUser = async (userId: string): Promise<Review | undefined> => {
    try {
        const response: AxiosResponse<Review | undefined> = await marketAPI({
            url: `/review/user/${userId}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const getReviewsByProduct = async (productId: string): Promise<Review | undefined> => {
    try {
        const response: AxiosResponse<Review | undefined> = await marketAPI({
            url: `/review/product/${productId}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const getReviewsByShop = async (shopId: string): Promise<Review | undefined> => {
    try {
        const response: AxiosResponse<Review | undefined> = await marketAPI({
            url: `/review/shop/${shopId}`,
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.error('Error:', error);
        return undefined
    }
}

export const addReview = async (
    requestData: AddReviewDTO
): Promise<Review> => {
    try {
        const response: AxiosResponse<Review> = await marketAPI({
            url: '/review',
            method: 'post',
            data: requestData,
        })

        return response.data

    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const updateReview = async (
    id: string,
    requestData: AddReviewDTO
): Promise<Review | null> => {
    try {
        const response: AxiosResponse<Review | null> = await marketAPI({
            url: `/review/${id}`,
            method: 'put',
            data: requestData,
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}

export const deleteReview = async (
    id: string
): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await marketAPI({
            url: `/review/${id}`,
            method: 'delete',
        })

        return response.data
    } catch (error: any) {
        console.error('Error:', error)
        throw new Error(error.response?.data?.error || 'Something went wrong')
    }
}