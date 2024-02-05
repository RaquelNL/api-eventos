import { ObjectId } from "mongodb";
import { collections } from "../services/databaseService.js";


const products: Product[] = []; //Base de datos antigua

export class Product {
    public _id?: ObjectId;

    constructor(
        public title: string,
        public imageUrl: string,
        public description: string,
        public price: number,
        public id?: number
    ){
        if(id) this._id = new ObjectId(id);
    }
    async save(){
        if(this._id){
            const result = await collections.products?.updateOne({_id: this._id},{$set: this});
            result
                ? console.log(`Successfully updated product with id ${this._id}`)
                : console.log("Failed to create a new product.");
            return;
        }else{
            const result = await collections.products?.insertOne(this);
            result
                    ? console.log(`Successfully created a new product with id ${result.insertedId}`)
                    : console.log("Failed to create a new product.");
        }
        
        // if(!this.id){
        //     this.id = Math.round(Math.random()*1000000);
        //     products.push(this);
        // }else{
        //     const index = products.findIndex( p => p.id === this.id );
        //     if(this.id>=0){
        //         products[index]=this; //{...this};
        //     }
        // }
    };

    static async fetchAll(){
        return await collections.products?.find().toArray();
    };
    static async findById(productId: string){
        console.log('FindById',productId);
        return await collections.products?.findOne({_id: new ObjectId(productId)});
    }
    //static deleteById(productId: number){}
}