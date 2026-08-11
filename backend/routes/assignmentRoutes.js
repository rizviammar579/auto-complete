import express from "express";
import {
  fetchAssignmentData
} from "../services/assignmentServices.js";

const router = express.Router();

 
router.get("/" , fetchAssignmentData);


export default router;