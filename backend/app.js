import express from "express";
import dashboardRoutes from './routes/dashboardRoutes.js'
import assignmentRoutes from './routes/assignmentRoutes.js'
import historyRoutes from './routes/historyRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import settingsRoutes from './routes/settingsRoutes.js'

const app = express();

app.use(express.json());


app.use("/", dashboardRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/history", historyRoutes);
app.use("/notifications", notificationRoutes);
app.use("/settings", settingsRoutes);

export default app;