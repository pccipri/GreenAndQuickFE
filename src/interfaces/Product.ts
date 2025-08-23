export interface Product {
    _id: string;
    shop: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    reducedPrice?: number;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AddProductDTO {
    shop: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    reducedPrice?: number;
    category: string;
}