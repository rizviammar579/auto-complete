import express from "express";
import cors from 'cors'
import session from "express-session";
import dotenv from 'dotenv'
import dashboardRoutes from './routes/dashboardRoutes.js'
import assignmentRoutes from './routes/assignmentRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import settingsRoutes from './routes/settingsRoutes.js'
import authRoutes from './routes/authRoutes.js'
// import historyRoutes from './routes/historyRoutes.js'

dotenv.config()

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    })
);


app.use("/", dashboardRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/notifications", notificationRoutes);
app.use("/settings", settingsRoutes);
// app.use("/history", historyRoutes);
app.use("/auth", authRoutes);

export default app;