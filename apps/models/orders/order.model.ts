export interface OrderInput {
    product_id: string;
    quantity: number;
    customer_id: string;
    price: number;
    status?: string;
}

export interface OrderType extends OrderInput {
    order_id: string;
}
