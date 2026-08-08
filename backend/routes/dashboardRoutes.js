import express from "express";
import {
  fetchDashboardData,
  markAsTurnedIn
} from "../services/dashboardServices.js";

const router = express.Router();

 
router.get("/" , fetchDashboardData);
router.patch("/" , markAsTurnedIn);


export default router;