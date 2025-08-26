export interface InventoryItem {
    _id: string;
    productId: string;
    shopId: string;
    stock: number;
    lowStockThreshold?: number;
    updatedAt: Date;
    createdAt: Date;
}

export interface AddInventoryItemDTO {
    productId: string;
    shopId: string;
    stock: number;
    lowStockThreshold?: number;
}