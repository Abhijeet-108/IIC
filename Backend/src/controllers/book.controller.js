import { Book } from "../models/book.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new book
export const createBook = asyncHandler(async (req, res) => {
    // console.log(req.body);
    const { title, authors, isbn, publisherName, year, supportDocument } = req.body;

    if (!title || !authors || !isbn || !publisherName || !year) {
        throw new ApiError(400, "All required fields (title, authors, isbn, publisherName, year) must be provided");
    }

    // Check if book already exists with same ISBN
    const existingBook = await Book.findOne({ isbn });
    if (existingBook) throw new ApiError(409, "Book with this ISBN already exists");

    const book = await Book.create({
        title,
        authors,
        isbn,
        publisherName,
        year,
        supportDocument
    });

    return res.status(201).json(
        new ApiResponse(201, "Book created successfully", book)
    );
});

// Get all books (with filters/search)
export const getBooks = asyncHandler(async (req, res) => {
    const { search, publisherName, year } = req.query;

    let filter = {};
    if (search) {
        filter.$text = { $search: search };
    }
    if (publisherName) {
        filter.publisherName = publisherName;
    }
    if (year) {
        filter.year = parseInt(year, 10);
    }

    const books = await Book.find(filter).sort({ year: -1, title: 1 });

    return res.status(200).json(
        new ApiResponse(200, "Books fetched successfully", books)
    );
});

// Get book by ID
export const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) throw new ApiError(404, "Book not found");

    return res.status(200).json(
        new ApiResponse(200, "Book fetched successfully", book)
    );
});

// Update book by ID
export const updateBook = asyncHandler(async (req, res) => {
    const book = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!book) throw new ApiError(404, "Book not found");

    return res.status(200).json(
        new ApiResponse(200, "Book updated successfully", book)
    );
});

// Delete book by ID
export const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) throw new ApiError(404, "Book not found");

    return res.status(200).json(
        new ApiResponse(200, "Book deleted successfully", {})
    );
});