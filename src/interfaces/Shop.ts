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
    owner: string;
    description: string;
    logo: string | null;
    coverImage: string | null;
    location: string | null;
}