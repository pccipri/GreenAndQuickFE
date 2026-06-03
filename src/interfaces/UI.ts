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
    id: number;
    date: string;
    shop: string;
    total: number;
    status: string;
}