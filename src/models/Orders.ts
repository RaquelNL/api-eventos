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

// 'items.product._id' 
//{
//     date: "2024-02-07 14:00",
//     user: {
//         _id: 'adsasdf'
//         name: 'Pepe',
//         mail: 'asdfasdf',
//         ...
//     }
//     items: [
//         {product: {
//             _id: 'dasfsd',
//             title: 'Libro',
//             price: 34
//             ...

//         }
//         qty: 1}
//         ,
//         {
//             _id: 'dasfsd',
//             title: 'Libro',
//             price: 34
//             ...

//         }
//     ]
// }

