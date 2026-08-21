export type HeaderItem = {
    name: string;
    route?: string;
}

export interface Column {
    id: 'id' | 'date' | 'shop' | 'total' | 'status';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

export interface Data {
    id: number | string;
    date: string;
    shop: string;
    total: number;
    status: string;
}

export interface InventoryItemCol {
    id: 'id' | 'name' | 'image' | 'category' | 'stock' | 'available';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

export interface InventoryItemData {
    id: number;
    name: string;
    image: string;
    category: string;
    stock: number;
    available: 'Available' | 'Unavailable' | 'Out of Stock';
}