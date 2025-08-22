import Address from "./Address";

export interface SubscriptionProduct {
    productId: string;
    quantity: number;
}

export interface Subscription {
    _id: string;
    userId: string;
    products: SubscriptionProduct[];
    frequency: 'daily' | 'weekly' | 'monthly';
    nextDeliveryDate: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deliveryAddress: Address;
}

export interface AddCategoryDTO {
    name: string;
}