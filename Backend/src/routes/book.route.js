import { Router } from "express";
import {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
} from "../controllers/book.controller.js";

const router = Router();

router.post("/", createBook);

// Get all books (with optional filters/search)
router.get("/", getBooks);

router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;