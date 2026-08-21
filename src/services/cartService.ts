import { marketAPI } from "../lib/api";
import { extractApiErrorMessage } from "@/lib/apiError";
import type { Cart, CartSummary, CheckoutPayload, CheckoutSessionResult } from "@/interfaces/Cart";

export const resolveCheckoutClientSecret = (result?: CheckoutSessionResult): string | undefined => {
  if (!result) {
    return undefined;
  }

  if (result.clientSecret) {
    return result.clientSecret;
  }

  if (Array.isArray(result.clientSecrets) && result.clientSecrets.length > 0) {
    return result.clientSecrets[0];
  }

  return undefined;
};

export const getCart = async (): Promise<Cart> => {
  try {
    const response = await marketAPI.get<Cart>("/cart");
    return response.data;
  } catch (error: any) {
    throw new Error(extractApiErrorMessage(error, "Unable to load cart"));
  }
};

export const addCartItem = async (productId: string, quantity = 1): Promise<Cart> => {
  try {
    const response = await marketAPI.post<Cart>("/cart/items", { productId, quantity });
    return response.data;
  } catch (error: any) {
    throw new Error(extractApiErrorMessage(error, "Unable to add item to cart"));
  }
};

export const updateCartItemQuantity = async (productId: string, quantity: number): Promise<Cart> => {
  try {
    const response = await marketAPI.patch<Cart>(`/cart/items/${productId}`, { quantity });
    return response.data;
  } catch (error: any) {
    throw new Error(extractApiErrorMessage(error, "Unable to update cart item"));
  }
};

export const removeCartItem = async (productId: string): Promise<Cart> => {
  try {
    const response = await marketAPI.delete<Cart>(`/cart/items/${productId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(extractApiErrorMessage(error, "Unable to remove cart item"));
  }
};

export const clearCart = async (): Promise<{ success: boolean }> => {
  try {
    const response = await marketAPI.delete<{ success: boolean }>('/cart');
    return response.data;
  } catch (error: any) {
    throw new Error(extractApiErrorMessage(error, "Unable to clear cart"));
  }
};

export const createCardCheckout = async (payload: CheckoutPayload): Promise<CheckoutSessionResult> => {
  try {
    const response = await marketAPI.post<CheckoutSessionResult>('/checkout/card', payload);
    return response.data;
  } catch (error: any) {
    throw new Error(extractApiErrorMessage(error, "Unable to create checkout session"));
  }
};

export const createCashCheckout = async (payload: CheckoutPayload): Promise<{ orderId?: string; totalAmount?: number }> => {
  try {
    const response = await marketAPI.post<{ orderId?: string; totalAmount?: number }>('/checkout/cash', payload);
    return response.data;
  } catch (error: any) {
    throw new Error(extractApiErrorMessage(error, "Unable to place cash order"));
  }
};

export const getCartSummary = (cart: Cart): CartSummary => {
  const totalItems = cart.items.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
  const totalAmount = cart.items.reduce((sum, item) => sum + (item.priceAtAdd ?? 0) * (item.quantity ?? 0), 0);

  return {
    items: cart.items,
    totalItems,
    totalAmount,
  };
};
