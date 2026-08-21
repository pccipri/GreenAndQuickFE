import type { Product } from "./Product";
import type BaseAddress from "./BaseAddress";

export interface CartItemPayload {
  productId: string;
  quantity: number;
  priceAtAdd?: number;
  product?: Product;
}

export interface Cart {
  _id?: string;
  userId?: string;
  items: CartItemPayload[];
  updatedAt?: Date | string;
}

export interface CartSummary {
  items: CartItemPayload[];
  totalItems: number;
  totalAmount: number;
}

export interface CheckoutAddress extends BaseAddress {
  isDefault?: boolean;
}

export interface CheckoutPayload {
  address?: CheckoutAddress;
  paymentMethod: "card" | "cash";
  paymentMethodId?: string;
  saveAddress?: boolean;
  saveCard?: boolean;
}

export interface PaymentMethod {
  _id?: string;
  stripePaymentMethodId: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault?: boolean;
  createdAt?: Date | string;
}

export interface CheckoutSessionResult {
  clientSecret?: string;
  clientSecrets?: string[];
  orderId?: string;
  bucketSummary?: unknown;
  totalAmount?: number;
  paymentIntentId?: string;
}
