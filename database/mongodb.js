import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if(!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables");
}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");
    }
    catch(error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export default connectDB;