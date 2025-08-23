import Address from "./Address";

export interface OrderItem {
    productId: string;
    quantity: number;
}

export interface Order {
    _id: string;
    userId: string;
    shopGroupId: string;
    items: OrderItem[];
    totalAmount: number;
    paymentOption: 'cash' | 'stripe';
    deliveryOption: 'fanCourier';
    deliveryAddress: Address;
    status: 'pending' | 'processing' | 'delivered' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}

export interface AddOrderDTO {
    userId: string;
    shopGroupId: string;
    items: OrderItem[];
    totalAmount: number;
    paymentOption: 'cash' | 'stripe';
    deliveryOption: 'fanCourier';
    deliveryAddress: Address;
    status: 'pending' | 'processing' | 'delivered' | 'cancelled';
}