import express from "express";
import cors from 'cors'
import MongoStore from "connect-mongo";
import session from "express-session";
import dotenv from 'dotenv'
import dashboardRoutes from './routes/dashboardRoutes.js'
import assignmentRoutes from './routes/assignmentRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import settingsRoutes from './routes/settingsRoutes.js'
import authRoutes from './routes/authRoutes.js'
import healthRoutes from './routes/healthRoutes.js'
// import historyRoutes from './routes/historyRoutes.js'

dotenv.config()

const app = express();

app.use(cors({
    origin: "https://auto-complete-nu-sand.vercel.app/",
    credentials: true
}));

app.use(express.json());

app.set("trust proxy", 1);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI
        }),
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: "none"
        }
    })
);


app.use("/", dashboardRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/notifications", notificationRoutes);
app.use("/settings", settingsRoutes);
// app.use("/history", historyRoutes);
app.use("/health", healthRoutes);
app.use("/auth", authRoutes);

export default app;