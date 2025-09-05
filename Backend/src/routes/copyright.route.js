import express from "express";
import {
  createCopyright,
  getAllCopyrights,
  getCopyrightById,
  updateCopyright,
  deleteCopyright,
  getByCopyrightNumber,
} from "../controllers/copyrightController.js";

const router = express.Router();

router.post("/", createCopyright);
router.get("/", getAllCopyrights);
router.get("/:id", getCopyrightById);
router.put("/:id", updateCopyright);
router.delete("/:id", deleteCopyright);

// extra route
router.get("/number/:number", getByCopyrightNumber);

export default router;
