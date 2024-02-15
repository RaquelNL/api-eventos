import { ObjectId } from "mongodb";
import { collections } from "../services/databaseService.js";

export class Event {
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
            const result = await collections.events?.updateOne({_id: this._id},{$set: this});
            result
                ? console.log(`Successfully updated event with id ${this._id}`)
                : console.log("Failed to create a new event.");
            return;
        }else{
            const result = await collections.events?.insertOne(this);
            result
                    ? console.log(`Successfully created a new event with id ${result.insertedId}`)
                    : console.log("Failed to create a new event.");
        }
    };

    static async fetchAll(){
        return await collections.events?.find().toArray();
    };

    static async findById(eventId: string){
        console.log('FindById', eventId);
        return await collections.events?.findOne({_id: new ObjectId(eventId)});
    }

    static async deleteById(eventId: number){
        const result = await collections.events?.deleteOne({_id: new ObjectId(eventId)});
        if (result && result.deletedCount === 1) {
            console.log(`Successfully deleted event with id ${eventId}`);
        } else {
            console.log(`Failed to delete event with id ${eventId}`);
        }
    }
}
