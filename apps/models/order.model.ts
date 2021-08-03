export interface OrderInput {
    productID: string;
    quantity: number;
    customerID: string;
    price: number;
    status?: string;
}

export interface OrderType extends OrderInput {
    orderID: string;
}
