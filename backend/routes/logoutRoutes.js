import express from "express";
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router();

router.post("/", (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                message: "Logout failed"
            });
        }

        res.clearCookie("connect.sid", {
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
        });

        res.json({
            message: "Logged out successfully"
        });
    });

});

export default router;