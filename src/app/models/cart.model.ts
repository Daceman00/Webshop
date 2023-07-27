export interface CartItem {
    id:number;
    product: string;
    name: string;
    price: number;
    quantity: number;
    
}

export interface Cart {
    items: Array<CartItem>;
}