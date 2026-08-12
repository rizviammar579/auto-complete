import { auth } from './services/google/googleService.js'
import fs from 'fs'
import connectDB from './services/mongoose/connectDB.js';
import { startScheduler } from './scheduler/scheduler.js';


export async function startup() {

  await connectDB()

  // Create downloads and solutions folder only once
  fs.mkdirSync("./downloads", { recursive: true })
  fs.mkdirSync("./solutions", { recursive: true })


  startScheduler()


}

