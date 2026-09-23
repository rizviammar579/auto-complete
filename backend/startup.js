import connectDB from './services/mongoose/connectDB.js';
import { startScheduler } from './scheduler/scheduler.js';
import { makeTempDirectories } from './automation_pipeline/tempDirectories.js';


export async function startup() {

  await connectDB();

  await makeTempDirectories();

  startScheduler();

}

