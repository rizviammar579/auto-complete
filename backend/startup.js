import { auth } from './services/google/googleService.js'
import fs from 'fs'
import connectDB from './services/mongoose/connectDB.js';
import { automation } from './functions/automation.js';
import { startScheduler } from './scheduler/scheduler.js';
import { runtimeState } from './utils/runtimeState.js';



export async function startup() {

  await connectDB()

  // Create downloads and solutions folder only once
  await fs.mkdirSync("./downloads", { recursive: true })
  await fs.mkdirSync("./solutions", { recursive: true })


  try {

    await automation()
    console.log('hi');

    runtimeState.lastSync = new Date()
    runtimeState.automationRunning = true
    

  } catch (err) {

    console.error(err)

  }

  // startScheduler()


}

