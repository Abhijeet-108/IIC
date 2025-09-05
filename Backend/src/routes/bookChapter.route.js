import { Router } from "express";
import {
  createBookChapter,
  getBookChapters,
  getBookChapterById,
  updateBookChapter,
  deleteBookChapter
} from "../controllers/bookChapter.controller.js";

const router = Router();

router.post("/", createBookChapter);
router.get("/", getBookChapters);
router.get("/:id", getBookChapterById);
router.put("/:id", updateBookChapter);
router.delete("/:id", deleteBookChapter);

export default router;
