export interface ProductInput {
    product_name: string;
    description: string;
    price: number;
    photo_url: string;
    owner_id: string;
    hasInStock: boolean;
    rating: number;
    product_category: string;
}

export interface Product extends ProductInput {
    product_id: string;
}
