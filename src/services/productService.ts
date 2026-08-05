import { AddProductDTO, Product, ProductListResponse } from "@/interfaces/Product";
import { marketAPI } from "../lib/api";
import { extractApiErrorMessage } from "@/lib/apiError";
import { normalizeListResponse } from "@/lib/normalizeListResponse";
import { AxiosResponse } from "axios";

const normalizeProductListResponse = (responseData: unknown): ProductListResponse => {
    return normalizeListResponse<Product>(responseData) as ProductListResponse;
};

export const getProducts = async (
    params?: Record<string, string | number | boolean | undefined>
): Promise<ProductListResponse> => {
    try {
        const response: AxiosResponse<any> = await marketAPI({
            url: '/product',
            method: 'get',
            params,
        });
        return normalizeProductListResponse(response.data);
    } catch (error) {
        console.error('Error:', error);
        return { items: [], page: 1, limit: 10, total: 0, pages: 1 };
    }
};

export const getAllProducts = async (): Promise<Product[]> => {
    const response = await getProducts({ limit: 50, page: 1 });
    return response.items;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
    try {
        const response: AxiosResponse<Product | undefined> = await marketAPI({
            url: `/product/${id}`,
            method: 'get',
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return undefined;
    }
};

export const getProductsByShop = async (shopId: string): Promise<ProductListResponse> => {
    try {
        const response: AxiosResponse<any> = await marketAPI({
            url: `/shop/${shopId}/products`,
            method: 'get',
        });
        return normalizeProductListResponse(response.data);
    } catch (error) {
        console.error('Error:', error);
        return { items: [], page: 1, limit: 10, total: 0, pages: 1 };
    }
};

export const getProductsByCategory = async (categoryId: string): Promise<ProductListResponse> => {
    try {
        const response: AxiosResponse<any> = await marketAPI({
            url: `/product`,
            method: 'get',
            params: { category: categoryId },
        });
        return normalizeProductListResponse(response.data);
    } catch (error) {
        console.error('Error:', error);
        return { items: [], page: 1, limit: 10, total: 0, pages: 1 };
    }
};

export const addProduct = async (
    shopId: string,
    requestData: AddProductDTO | FormData
): Promise<Product> => {
    try {
        const response: AxiosResponse<Product> = await marketAPI({
            url: `/shop/${shopId}/products`,
            method: 'post',
            data: requestData,
        });

        return response.data;
    } catch (error: any) {
        console.error('Error:', error);
        throw new Error(extractApiErrorMessage(error, 'Unable to create product'));
    }
};

export const updateProduct = async (
    id: string,
    requestData: AddProductDTO | FormData
): Promise<Product | null> => {
    try {
        const response: AxiosResponse<Product | null> = await marketAPI({
            url: `/product/${id}`,
            method: 'patch',
            data: requestData,
        });

        return response.data;
    } catch (error: any) {
        console.error('Error:', error);
        throw new Error(extractApiErrorMessage(error, 'Unable to update product'));
    }
};

export const deleteProduct = async (
    id: string
): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await marketAPI({
            url: `/product/${id}`,
            method: 'delete',
        });

        return response.data;
    } catch (error: any) {
        console.error('Error:', error);
        throw new Error(extractApiErrorMessage(error, 'Unable to delete product'));
    }
};