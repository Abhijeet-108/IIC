import mongoose from "mongoose";

const connectDb = async() => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/IIC`)
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.log("Error while connecting to MongoDB", error);
        process.exit(1);
    }
}

export default connectDb;
