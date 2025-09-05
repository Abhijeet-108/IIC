import { BookChapter } from "../models/bookChapter.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create new Book Chapter
export const createBookChapter = asyncHandler(async (req, res) => {
  const { title, authors, isbn, chapterName, publisherName, pageNo, year, doiLink, supportDocument } = req.body;

  if (!title || !authors || !isbn || !chapterName || !publisherName || !pageNo || !year || !doiLink) {
    throw new ApiError(400, "All required fields must be provided");
  }

  // Prevent duplicate (same ISBN + chapterName)
  const existing = await BookChapter.findOne({ isbn, chapterName });
  if (existing) throw new ApiError(409, "Chapter with this ISBN and Chapter Name already exists");

  const chapter = await BookChapter.create({
    title,
    authors,
    isbn,
    chapterName,
    publisherName,
    pageNo,
    year,
    doiLink,
    supportDocument
  });

  return res.status(201).json(
    new ApiResponse(201, "Book chapter created successfully", chapter)
  );
});

// Get all Book Chapters
export const getBookChapters = asyncHandler(async (req, res) => {
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

  const chapters = await BookChapter.find(filter).sort({ year: -1, title: 1 });

  return res.status(200).json(
    new ApiResponse(200, "Book chapters fetched successfully", chapters)
  );
});

// Get Book Chapter by ID
export const getBookChapterById = asyncHandler(async (req, res) => {
  const chapter = await BookChapter.findById(req.params.id);
  if (!chapter) throw new ApiError(404, "Book chapter not found");

  return res.status(200).json(
    new ApiResponse(200, "Book chapter fetched successfully", chapter)
  );
});

// Update Book Chapter
export const updateBookChapter = asyncHandler(async (req, res) => {
  const chapter = await BookChapter.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!chapter) throw new ApiError(404, "Book chapter not found");

  return res.status(200).json(
    new ApiResponse(200, "Book chapter updated successfully", chapter)
  );
});

// Delete Book Chapter
export const deleteBookChapter = asyncHandler(async (req, res) => {
  const chapter = await BookChapter.findByIdAndDelete(req.params.id);
  if (!chapter) throw new ApiError(404, "Book chapter not found");

  return res.status(200).json(
    new ApiResponse(200, "Book chapter deleted successfully", {})
  );
});
