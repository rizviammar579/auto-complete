import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import requireOwner from "../middleware/requireOwner.js";
import {
  fetchAssignmentData,
  markAsTurnedIn
} from "../services/assignmentServices.js";

const router = express.Router();


router.get("/", fetchAssignmentData);
router.patch("/", requireAuth, requireOwner, markAsTurnedIn);


export default router;