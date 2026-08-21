import { AddOrderDTO, Order, OrderStatus } from "@/interfaces/Order";
import { marketAPI } from "../lib/api";
import { extractApiErrorMessage } from "@/lib/apiError";
import { AxiosResponse } from "axios";

export const getAllOrders = async (): Promise<Order[]> => {
    try {
        const response: AxiosResponse<Order[]> = await marketAPI.get('/orders');
        return response.data;
    } catch (error: any) {
        throw new Error(extractApiErrorMessage(error, 'Unable to fetch orders'));
    }
};

export const getOrderById = async (id: string): Promise<Order | undefined> => {
    try {
        const response: AxiosResponse<Order | undefined> = await marketAPI.get(`/orders/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(extractApiErrorMessage(error, 'Unable to fetch order'));
    }
};

export const getMyOrders = async (): Promise<Order[]> => {
    try {
        const response: AxiosResponse<Order[]> = await marketAPI.get('/orders');
        return response.data;
    } catch (error: any) {
        throw new Error(extractApiErrorMessage(error, 'Unable to fetch your orders'));
    }
};

export const getShopOrders = async (): Promise<Order[]> => {
    try {
        const response: AxiosResponse<Order[]> = await marketAPI.get('/orders/shop/orders');
        return response.data;
    } catch (error: any) {
        throw new Error(extractApiErrorMessage(error, 'Unable to fetch shop orders'));
    }
};

export const addOrder = async (
    requestData: AddOrderDTO
): Promise<Order> => {
    try {
        const response: AxiosResponse<Order> = await marketAPI.post('/orders', requestData);
        return response.data;
    } catch (error: any) {
        console.error('Error creating order:', error);
        throw new Error(extractApiErrorMessage(error, 'Unable to create order'));
    }
};

export const updateOrder = async (
    id: string,
    requestData: AddOrderDTO
): Promise<Order | null> => {
    try {
        const response: AxiosResponse<Order | null> = await marketAPI.patch(`/orders/${id}`, requestData);
        return response.data;
    } catch (error: any) {
        console.error('Error updating order:', error);
        throw new Error(extractApiErrorMessage(error, 'Unable to update order'));
    }
};

export const cancelOrder = async (id: string): Promise<Order> => {
    try {
        const response: AxiosResponse<Order> = await marketAPI.post(`/orders/${id}/cancel`);
        return response.data;
    } catch (error: any) {
        console.error('Error cancelling order:', error);
        throw new Error(extractApiErrorMessage(error, 'Unable to cancel order'));
    }
};

export const cancelShopOrder = async (id: string): Promise<Order> => {
    try {
        const response: AxiosResponse<Order> = await marketAPI.post(`/orders/shop/orders/${id}/cancel`);
        return response.data;
    } catch (error: any) {
        console.error('Error cancelling shop order:', error);
        throw new Error(extractApiErrorMessage(error, 'Unable to cancel shop order'));
    }
};

export const updateOrderStatus = async (id: string, status: OrderStatus): Promise<Order> => {
    try {
        const response: AxiosResponse<Order> = await marketAPI.patch(`/orders/shop/orders/${id}/status`, { status });
        return response.data;
    } catch (error: any) {
        console.error('Error updating order status:', error);
        throw new Error(extractApiErrorMessage(error, 'Unable to update order status'));
    }
};

export const deleteOrder = async (
    id: string
): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await marketAPI.delete(`/orders/${id}`);
        return response.data;
    } catch (error: any) {
        console.error('Error deleting order:', error);
        throw new Error(extractApiErrorMessage(error, 'Unable to delete order'));
    }
};