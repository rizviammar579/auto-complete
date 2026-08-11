import express from "express";
import {
  fetchAssignmentData,
  markAsTurnedIn
} from "../services/assignmentServices.js";

const router = express.Router();

 
router.get("/" , fetchAssignmentData);
router.patch("/" , markAsTurnedIn);


export default router;