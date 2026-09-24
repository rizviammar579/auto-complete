import express from "express";
import oauth2Client from "../services/google/googleOAuth.js";
import { google } from "googleapis";

const router = express.Router();


router.get("/google", (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "openid",
            "email",
            "profile"
        ]
    });

    res.redirect(authUrl);
});

router.get("/google/callback", async (req, res) => {
    try {
        const { code } = req.query;

        const { tokens } = await oauth2Client.getToken(code);

        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({
            version: "v2",
            auth: oauth2Client
        });

        const { data } = await oauth2.userinfo.get();

        req.session.user = {
            email: data.email,
            name: data.name
        }

        req.session.save((err) => {

            if (err) {
                console.error(err);
                return res.status(500).send("Session save failed");
            }

        });

        res.redirect("https://auto-complete-8p7xaq9ml-ammar-970d.vercel.app/dashboard");

    } catch (error) {
        console.error("Google authentication failed:", error);
        res.status(500).send("Google authentication failed");
    }
});

router.get("/me", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            authenticated: false
        });
    }

    res.json({
        authenticated: true,
        user: req.session.user
    });
});


export default router;