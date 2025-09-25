import  mongoose from "mongoose";

export const connectTODb = async() => {
    const uri = process.env.MONGODB_URI;
    try {
        await  mongoose.connect(uri);
        console.log("MongoDb has been connected")
    } catch (error) {
        console.log("Error to connect to MongoDb",error);
        process.exit(1);
        
        }
        mongoose.connection.on("error",(error)=> {
            console.log("Mongodb connection error")
        })
}