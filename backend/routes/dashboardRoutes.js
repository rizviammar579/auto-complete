import express from "express";
import {
  fetchDashboardData,
  markAsTurnedIn,
  regenerateSolution
} from "../services/dashboardServices.js";

const router = express.Router();

 
router.get("/" , fetchDashboardData);
router.patch("/" , markAsTurnedIn);
router.post("/regenerate-solution" , regenerateSolution);


export default router;