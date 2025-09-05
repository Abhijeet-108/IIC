import express from "express";
import {
  createAchievement,
  getAllAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievements.controller.js";

const router = express.Router();

router.post("/", createAchievement);
router.get("/", getAllAchievements);
router.get("/:id", getAchievementById);
router.put("/:id", updateAchievement);
router.delete("/:id", deleteAchievement);

export default router;