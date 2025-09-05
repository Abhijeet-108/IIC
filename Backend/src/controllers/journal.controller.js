import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Journal } from "../models/journal.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";
import e from "express";

// creating a journal
export const createJournal = asyncHandler(async (req, res) => {
    const { titleOfManuscript, authorsDetails, isbn, journalName, publisherName, issue, no, pageNo, year, doiLink} = req.body;
    const files = req.files;

    if(!titleOfManuscript || !authorsDetails || !isbn || !journalName || !publisherName || !issue || !no || !pageNo || !year || !doiLink || !files) {
        throw new ApiError(400, "All fields are required");
    }

    const existingJournal = await Journal.findOne({ 
        $or: [{doiLink}, {isbn}] 
    });
    if(existingJournal) throw new ApiError(409, "Journal already exists");

    let supportDocumentPath = null;
    if(files && files.length > 0){
        const cloudinaryResponse = await uploadOnCloudinary(files[0].path);
        supportDocumentPath = cloudinaryResponse?.url || null;
    }

    const newJournal = await Journal.create({
        titleOfManuscript,
        authorsDetails,
        isbn,
        journalName,
        publisherName,
        issue,
        no,
        pageNo,
        year,
        doiLink,
        supportDocumentPath: supportDocumentPath,
    })

    return res.status(201).json(new ApiResponse(201, "Journal created successfully", newJournal));
})

// get all journals
export const getAllJournals = asyncHandler(async (req, res) => {
    const journals = await Journal.find();
    return res.status(200).json(new ApiResponse(200, "Journals retrieved successfully", journals));
})

// get journal by id
export const getJournalById = asyncHandler(async (req, res) => {
    const journal = await Journal.findById(req.params.id);
    if (!journal)  return res.status(404).json(new ApiResponse(404, "No journal found with this ID"));
    return res.status(200).json(new ApiResponse(200, "Journal retrieved successfully", journal));
})

// update Journal
export const updateJournal = asyncHandler(async (req, res) => {
    const journalId = req.params.id;
    const { titleOfManuscript, authorsDetails, isbn, journalName, publisherName, issue, no, pageNo, year, doiLink } = req.body;

    const journal = await Journal.findOne({
        $or: [{ _id: journalId }, { doiLink }, { isbn }]
    });
    if (!journal) return res.status(404).json(new ApiResponse(404, "No journal found with this ID"));

    let uploadedFiles = journal.supportDocument;
    if(req.files && req.files.length > 0){
        uploadedFiles = [
            ...uploadedFiles,
            ...req.files.map(file => file.path)
        ]
    }

    if(titleOfManuscript) journal.titleOfManuscript = titleOfManuscript;
    if(authorsDetails) journal.authorsDetails = authorsDetails;
    if(isbn) journal.isbn = isbn;
    if(journalName) journal.journalName = journalName;
    if(publisherName) journal.publisherName = publisherName;
    if(issue) journal.issue = issue;
    if(no) journal.no = no;
    if(pageNo) journal.pageNo = pageNo;
    if(year) journal.year = year;
    if(doiLink) journal.doiLink = doiLink;

    if(req.files && req.files.length > 0){
        journal.supportDocument = uploadedFiles;
    }

    await journal.save();

    return res.status(200).json(new ApiResponse(200, "Journal updated successfully", journal));
});

// delete Journal
export const deleteJournal = asyncHandler(async (req, res) => {
    const journal = await Journal.findByIdAndDelete(req.params.id);
    if (!journal) return res.status(404).json(new ApiResponse(404, "No journal found with this ID"));
    return res.status(200).json(new ApiResponse(200, "Journal deleted successfully", journal));
});