import mongoose from "mongoose"

let alreadyDone = false

export async function ensureDbConnected(){
    if(alreadyDone){
        return;
    }
    alreadyDone = true 
    await mongoose.connect("mongodb+srv://admin:admin@admin-user-db.cgoa0xw.mongodb.net/");
    console.log("db connected");
    
}