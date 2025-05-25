import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}` || '', {
            dbName: 'video_mcq_generator'
        })

        console.log("MongoDb connected !! ");
        
    } catch (error) {
        console.log(error);
    }
}