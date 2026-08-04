import express from "express";
import {
  fetchDashboardData
} from "../services/dashboardServices.js";

const router = express.Router();

 
router.get("/" , fetchDashboardData);


export default router;