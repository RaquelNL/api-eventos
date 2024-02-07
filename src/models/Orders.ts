import { ObjectId } from "mongodb";

import { Product } from "./Product.js";
import { User } from "./User.js";

export interface OrderItem {
    product: Product,
    qty: number
}

export interface Order {
    date: Date,
    user: User,
    items: OrderItem[]
}

