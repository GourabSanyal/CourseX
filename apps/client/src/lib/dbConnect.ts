import mongoose from "mongoose"

let alreadyDone = false

export async function ensureDbConnected(){
    const dbUrl = process.env.DB_CONNECTION_URL
    if (!dbUrl){
        console.log("Database connection URL is not defined");
    }
    if(alreadyDone){
        return;
    }
    alreadyDone = true 
    await mongoose.connect(dbUrl as string);
    console.log("db connected");
}