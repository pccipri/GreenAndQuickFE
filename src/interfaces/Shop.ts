import ShopLocation from './ShopLocation';

export interface Shop {
    _id: string;
    name: string;
    slug: string;
    description: string;
    logo: string | null;
    coverImage: string | null;
    ownerId: string;
    location: ShopLocation | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface AddShopDTO {
    name: string;
    owner: string;
    description: string;
    logo: string | null;
    coverImage: string | null;
    location: ShopLocation;
}