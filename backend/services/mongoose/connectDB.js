import mongoose from 'mongoose';
import { runtimeState } from '../../utils/runtimeState.js';
import dotenv from 'dotenv'

dotenv.config()

export default async function connectDB() {

    // Connecting to mongoDB atlas
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "assignment-automation-database"
    })

    runtimeState.mongoDBConnected = true;

}