import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface Product {
    id: bigint;
    stockQuantity: bigint;
    name: string;
    description: string;
    category: ProductCategory;
    priceInr: bigint;
}
export enum ProductCategory {
    groceries = "groceries",
    snacks = "snacks",
    beverages = "beverages",
    personalCare = "personalCare",
    dairy = "dairy",
    household = "household"
}
export interface backendInterface {
    addProduct(name: string, category: ProductCategory, priceInr: bigint, description: string, stockQuantity: bigint): Promise<bigint>;
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    clearCart(): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCart(): Promise<Array<CartItem>>;
    getProductsByCategory(category: ProductCategory): Promise<Array<Product>>;
    getStoreInfo(): Promise<{
        hours: string;
        name: string;
        address: string;
        phone: string;
    }>;
    initializeProducts(): Promise<void>;
    removeFromCart(productId: bigint): Promise<void>;
    searchProductsByName(searchTerm: string): Promise<Array<Product>>;
    updateStoreInfo(name: string, address: string, phone: string, hours: string): Promise<void>;
}
