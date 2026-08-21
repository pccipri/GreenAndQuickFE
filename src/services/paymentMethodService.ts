import { marketAPI } from "../lib/api";
import { extractApiErrorMessage } from "@/lib/apiError";
import type { PaymentMethod } from "@/interfaces/Cart";

export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  try {
    const response = await marketAPI.get<PaymentMethod[]>('/payment-methods');
    return response.data;
  } catch (error: any) {
    throw new Error(extractApiErrorMessage(error, 'Unable to load saved payment methods'));
  }
};

export const addPaymentMethod = async (paymentMethodId: string): Promise<PaymentMethod> => {
  try {
    const response = await marketAPI.post<PaymentMethod>('/payment-methods', { paymentMethodId });
    return response.data;
  } catch (error: any) {
    throw new Error(extractApiErrorMessage(error, 'Unable to save payment method'));
  }
};

export const removePaymentMethod = async (id: string): Promise<void> => {
  try {
    await marketAPI.delete(`/payment-methods/${id}`);
  } catch (error: any) {
    throw new Error(extractApiErrorMessage(error, 'Unable to remove payment method'));
  }
};

export const setDefaultPaymentMethod = async (id: string): Promise<PaymentMethod> => {
  try {
    const response = await marketAPI.patch<PaymentMethod>(`/payment-methods/${id}/default`);
    return response.data;
  } catch (error: any) {
    throw new Error(extractApiErrorMessage(error, 'Unable to update default payment method'));
  }
};
