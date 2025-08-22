import Address from "./Address";

export interface ShopGroup {
    _id: string;
    name: string;
    description: string;
    shops: string[];
    deliveryAddress: Address;
    createdAt: Date;
    updatedAt: Date;
}

export interface AddShopGroupDTO {
    name: string;
}