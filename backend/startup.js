import { auth } from './services/google/googleService.js'
import fs from 'fs'
import connectDB from './services/mongoose/connectDB.js';
import { automation } from './functions/automation.js';
import { startScheduler } from './scheduler/scheduler.js';
import { runtimeState } from './utils/runtimeState.js';
import { createNotification } from './utils/createNotification.js';



export async function startup() {

  await connectDB()

  // Create downloads and solutions folder only once
  await fs.mkdirSync("./downloads", { recursive: true })
  await fs.mkdirSync("./solutions", { recursive: true })


  try {

    // await automation()

  } catch (err) {

    console.error(err)

    await createNotification(
      "Unexpected Error",
      "An unexpected error occurred while running automation. Please check the console for more details.",
      "error"
    );

  }

  // startScheduler()


}

