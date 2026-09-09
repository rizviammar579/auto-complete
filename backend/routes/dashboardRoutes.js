import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import requireOwner from "../middleware/requireOwner.js";
import {
  fetchDashboardData,
  markAsTurnedIn,
  regenerateSolution
} from "../services/dashboardServices.js";

const router = express.Router();


router.get("/", fetchDashboardData);
router.patch("/", requireAuth, requireOwner, markAsTurnedIn);
router.post("/regenerate-solution", requireAuth, requireOwner, regenerateSolution);


export default router;