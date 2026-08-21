import type Address from "./Address";
import type BaseAddress from "./BaseAddress";
import type { Product } from "./Product";

export interface OrderItem {
    productId: string;
    quantity: number;
    priceAtPurchase?: number;
    product?: Product;
    shopId?: string;
}

export type OrderStatus = 'active' | 'placed' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethodType = 'card' | 'cash';

export interface OrderStatusHistoryEntry {
    status: OrderStatus;
    changedAt?: Date | string;
    changedBy?: string;
}

export interface Order {
    _id: string;
    id?: string;
    customerId?: string;
    userId?: string;
    shopGroupId?: string | null;
    items: OrderItem[];
    totalAmount: number;
    paymentMethod?: PaymentMethodType;
    paymentStatus?: PaymentStatus;
    stripePaymentIntentId?: string | null;
    deliveryAddress?: Address | null;
    pickupAddress?: BaseAddress | null;
    status?: OrderStatus;
    statusHistory?: OrderStatusHistoryEntry[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orderNumber?: string;
}

export interface AddOrderDTO {
    userId?: string;
    customerId?: string;
    shopGroupId?: string | null;
    items: OrderItem[];
    totalAmount: number;
    paymentMethod?: PaymentMethodType;
    paymentStatus?: PaymentStatus;
    deliveryAddress?: Address | null;
    pickupAddress?: BaseAddress | null;
    status?: OrderStatus;
}