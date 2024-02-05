import { ObjectId } from "mongodb"

import { collections } from "../services/databaseService.js";


interface address {
    calle: string,
    telf: string,
    CP: string
}

export interface CartItem{
    pid: ObjectId,
    qty: number
}

export class User {
    public _id?: ObjectId
    public cart: CartItem[] = [];

    constructor(
        public DNI: string,
        public name: string,
        public mail: string,
        public contacto: address,
        cart?: CartItem[],
        id? : string
    ) {
        if(id) this._id = new ObjectId(id);
        cart ? this.cart = cart : this.cart = [];
    }
    async save(){
        const result1 = await collections.users?.findOne({DNI: this.DNI});
        if(result1){
            this._id = result1._id;
            console.log("Usuario ya disponible");
            return this;
        }

        const result = await collections.users?.insertOne(this);
        console.log(result);
        result
                ? console.log(`Successfully created a new user with id ${result.insertedId}`)
                : console.log("Failed to create a new user.");           
        return //this;
    }
    static async fetchById(id: string){
        return await collections.users?.findOne({_id: new ObjectId(id)});
    }
    async addToCart(id: string){
        //Ver si el producto está en el carro
        const index =  this.cart.findIndex( c => c.pid.toHexString() === id  );
        if( index >= 0 ){
            this.cart[index].qty += 1;
        } else {
            const prodId = new ObjectId(id);
            this.cart.push({pid: prodId, qty: 1});
        }
        return await collections.users?.updateOne({_id: this._id},{$set: {cart: this.cart}});
    }
    async getCart(){
        const prodIds = this.cart.map( ci => ci.pid );
        const products = await collections.products?.find({_id:{$in: prodIds}}).toArray();
        return products?.map( p => {
            const qty = this.cart.find( ci => p._id.toHexString() === ci.pid.toHexString() )?.qty;
            return {
                _id: p._id,
                title: p.title,
                price: p.price,
                qty: qty
            }
        })
    }
    async deleteCartItem(id: string){
        const index = this.cart.findIndex( c => c.pid.toHexString() === id );
        console.log(index);
        if(index >= 0){
            this.cart.splice(index,1);
            return await collections.users?.updateOne({_id: this._id},{$set: {cart: this.cart}});
        }
    }
    async decreaseCartItem(id:string){
        const index = this.cart.findIndex( c => c.pid.toHexString() === id );
        if(index >= 0){
            const qty = this.cart[index].qty;
            if(qty === 1) {
                await this.deleteCartItem(id);
            }
            else{
                this.cart[index].qty -= 1;
            }
            return await collections.users?.updateOne({_id: this._id},{$set: {cart: this.cart}});
        }else{
            return
        }
    }
}