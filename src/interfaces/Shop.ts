export interface Shop {
    _id: string;
    name: string;
    description: string;
    // imageUrl: string;
    owner: string;
    categories: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface AddShopDTO {
    name: string;
    description: string;
    owner: string;
    categories: string[];
}