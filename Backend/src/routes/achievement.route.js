import express from "express";
import {
  createAchievement,
  getAllAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievments.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/").post(upload.array("photo"), createAchievement).get(getAllAchievements);
router.route("/:id").get(getAchievementById).put(upload.array("photo"), updateAchievement).delete(deleteAchievement);

export default router;