import { AddShopDTO, Shop, ShopListResponse } from "@/interfaces/Shop";
import { marketAPI } from "../lib/api";
import { extractApiErrorMessage } from "@/lib/apiError";
import { normalizeListResponse } from "@/lib/normalizeListResponse";
import { AxiosResponse } from "axios";

const normalizeShopListResponse = (responseData: unknown): ShopListResponse => {
    return normalizeListResponse<Shop>(responseData) as ShopListResponse;
};

export const getShops = async (
    params?: Record<string, string | number | boolean | undefined>
): Promise<ShopListResponse> => {
    try {
        const response: AxiosResponse<any> = await marketAPI({
            url: '/shop',
            method: 'get',
            params,
        });
        return normalizeShopListResponse(response.data);
    } catch (error) {
        console.error('Error:', error);
        return { items: [], page: 1, limit: 10, total: 0, pages: 1 };
    }
};

export const getAllShops = async (): Promise<Shop[]> => {
    const response = await getShops({ limit: 50, page: 1 });
    return response.items;
};

export const getShopById = async (id: string): Promise<Shop | undefined> => {
    try {
        const response: AxiosResponse<Shop | undefined> = await marketAPI({
            url: `/shop/${id}`,
            method: 'get',
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return undefined;
    }
};

export const getShopBySlug = async (slug: string): Promise<Shop | undefined> => {
    try {
        const response: AxiosResponse<Shop | undefined> = await marketAPI({
            url: `/shop/${slug}`,
            method: 'get',
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return undefined;
    }
};

export const getShopByOwner = async (ownerId: string): Promise<Shop | undefined> => {
    try {
        const response: AxiosResponse<Shop | undefined> = await marketAPI({
            url: `/shop/owner/${ownerId}`,
            method: 'get',
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return undefined;
    }
};

export const validateCui = async (cui: string): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await marketAPI({
            url: '/shop/validate-cui',
            method: 'post',
            data: { cui },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error:', error);
        throw new Error(extractApiErrorMessage(error, 'Unable to validate CUI'));
    }
};

export const addShop = async (
    requestData: AddShopDTO | FormData
): Promise<Shop> => {
    try {
        const response: AxiosResponse<Shop> = await marketAPI({
            url: '/shop',
            method: 'post',
            data: requestData,
        });

        return response.data;
    } catch (error: any) {
        console.error('Error:', error);
        throw new Error(extractApiErrorMessage(error, 'Unable to create shop'));
    }
};

export const updateShop = async (
    id: string,
    requestData: AddShopDTO | FormData
): Promise<Shop | null> => {
    try {
        const response: AxiosResponse<Shop | null> = await marketAPI({
            url: `/shop/${id}`,
            method: 'patch',
            data: requestData,
        });

        return response.data;
    } catch (error: any) {
        console.error('Error:', error);
        throw new Error(extractApiErrorMessage(error, 'Unable to update shop'));
    }
};

export const deleteShop = async (
    id: string
): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await marketAPI({
            url: `/shop/${id}`,
            method: 'delete',
        });

        return response.data;
    } catch (error: any) {
        console.error('Error:', error);
        throw new Error(extractApiErrorMessage(error, 'Unable to delete shop'));
    }
};