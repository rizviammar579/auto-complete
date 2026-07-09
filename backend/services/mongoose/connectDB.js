import mongoose from 'mongoose';

export default async function connectDB() {

    // Connecting to mongoDB compass
    mongoose.connect("mongodb://localhost:27017/assignment-automation-database")    

}