import express from "express";
import {
  createConference,
  getAllConferences,
  getConferenceById,
  updateConference,
  deleteConference,
} from "../controllers/conference.controller.js";

const router = express.Router();

router.post("/", createConference);
router.get("/", getAllConferences);
router.get("/:id", getConferenceById);
router.put("/:id", updateConference);
router.delete("/:id", deleteConference);

export default router;