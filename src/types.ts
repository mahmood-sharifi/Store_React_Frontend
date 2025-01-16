export interface Review {
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    product_image: string[];
    reviews?: Review[];
}


export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}
