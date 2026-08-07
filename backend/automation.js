import { auth } from './services/google/googleService.js'
import fs from 'fs'
import connectDB from './services/mongoose/connectDB.js';
import { startScheduler } from './scheduler/scheduler.js';
import { sync } from './functions/sync.js';
import { runtimeState } from './utils/runtimeState.js';



export async function automation() {

  runtimeState.automationRunning = true

  await connectDB()

  // Create downloads and solutions folder only once
  await fs.mkdirSync("./downloads", { recursive: true })
  await fs.mkdirSync("./solutions", { recursive: true })


  try {

    // await sync()
    console.log('hi');
    

  } catch (err) {

    console.error(err)

  }

  // startScheduler()


}

