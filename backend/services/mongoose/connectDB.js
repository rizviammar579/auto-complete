import mongoose from 'mongoose';
import { runtimeState } from '../../utils/runtimeState.js';

export default async function connectDB() {

    // Connecting to mongoDB compass
    mongoose.connect("mongodb://localhost:27017/assignment-automation-database") 
    
    runtimeState.mongoDBConnected = true;
    
}