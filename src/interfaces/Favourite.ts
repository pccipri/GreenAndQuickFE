export interface Favourite {
    _id: string;
    user: string;
    products: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface AddFavouriteDTO {
    user: string;
    products: string[];
}