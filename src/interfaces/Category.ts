export interface Category {
    _id: string;
    name: string;
    isGlobal: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface AddCategoryDTO {
    name: string;
}