import mongoose from "mongoose";

export const dbconnect=async()=>{
    try{
        await mongoose.connect(process.env.mongo_url!);
        console.log("database connected");
    }
    catch{
        console.error("db connection failed");
        process.exit(1);
    }
}