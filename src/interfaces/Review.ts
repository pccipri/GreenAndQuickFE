export interface Review {
    _id: string;
    user: string;
    product?: string;
    shop?: string;
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AddReviewDTO {
    name: string;
}