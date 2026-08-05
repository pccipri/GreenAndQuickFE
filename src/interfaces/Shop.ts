import ShopLocation from './ShopLocation';

export interface Shop {
    _id?: string;
    id?: string;
    name: string;
    slug?: string;
    description?: string;
    logo?: string | null;
    logoUrl?: string | null;
    coverImage?: string | null;
    coverImageUrl?: string | null;
    ownerId?: string;
    cui?: string;
    nrRegCom?: string;
    location?: ShopLocation | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    productCount?: number;
    ownerName?: string | null;
}

export interface AddShopDTO {
    name: string;
    owner?: string;
    description?: string;
    logo?: string | File | null;
    coverImage?: string | File | null;
    location?: ShopLocation | null;
    cui?: string;
    nrRegCom?: string;
}

export interface ShopListResponse {
    items: Shop[];
    page: number;
    limit: number;
    total: number;
    pages: number;
}