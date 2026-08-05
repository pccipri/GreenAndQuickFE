export interface Product {
    _id?: string;
    id?: string;
    shopId?: string;
    shop?: string;
    categoryId?: string;
    category?: string;
    name: string;
    description: string;
    imageUrl?: string | null;
    imageUrls?: string[];
    price: number;
    reducedPrice?: number | null;
    stock?: number;
    isAvailable?: boolean;
    lowStockThreshold?: number;
    slug?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface AddProductDTO {
    shopId?: string;
    shop?: string;
    name: string;
    description: string;
    price: number;
    reducedPrice?: number | null;
    categoryId?: string;
    category?: string;
    stock?: number;
    isAvailable?: boolean;
    lowStockThreshold?: number;
    images?: Array<File | string> | File | string | null;
}

export interface ProductListResponse {
    items: Product[];
    page: number;
    limit: number;
    total: number;
    pages: number;
}