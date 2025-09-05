import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Patent } from "../models/patent.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

// create the patent
export const createPatent = asyncHandler(async(req, res) => {
    const { patentNumber, title, area, domain, status, year } = req.body;
    const files = req.files;

    if (!patentNumber || !title || !area || !domain || !status || !year) throw new ApiError(400, "All fields are required");

    const existingPatent = await Patent.findOne({ patentNumber });
    if (existingPatent) throw new ApiError(409, "Patent with this number already exists");

    let supportDocumentPath = null;
    if(files && files.length > 0){
        const cloudinaryResponse = await uploadOnCloudinary(files[0].path);
        supportDocumentPath = cloudinaryResponse?.url || null;
    }
    
    const patent = await Patent.create({
        patentNumber,
        title,
        area,
        domain,
        status,
        year,
        supportDocument : supportDocumentPath,
    });

    return res.status(201).json(
        new ApiResponse(201, "Patent created successfully", patent)
    );
})

// view all patent
export const getAllPatents = asyncHandler(async(req, res) => {
    const patents = await Patent.find().sort({ year: -1, title: 1 });
    if(!patents || patents.length === 0) {
        throw new ApiError(404, "No patents found");
    }
    return res.status(200).json(new ApiResponse(200, "Patents retrieved successfully", patents));
})

// view patent by user
export const getPatentByUser = asyncHandler(async(req, res) => {
    const patents = await Patent.findById(req.params.id);
    if(!patents) {
        return res.status(404).json(new ApiResponse(404, "No patents found for this user"));
    }
    return res.status(200).json(new ApiResponse(200, "Patents retrieved successfully", patents));
});


// update the patent
export const updatePatent = asyncHandler(async(req, res) => {
    const patentId = req.params.id;

    const { patentNumber, title, area, domain, status, year } = req.body;

    const patent = await Patent.findOne({
         $or: [{ _id: patentId }, { patentNumber }]
    });
    if(!patent) throw new ApiError(404, "Patent not found");

    let uploadedFiles = patent.supportDocument;
    if(req.files && req.files.length > 0){
        uploadedFiles = [
            ...uploadedFiles,
            ...req.files.map(file => file.path)
        ]
    }

    if (title) patent.title = title;
    if (area) patent.area = area;
    if (domain) patent.domain = domain;
    if (status) patent.status = status;
    if (year) patent.year = year;

    if (uploadedFiles.length > 0) {
        patent.supportDocument = uploadedFiles;
    }

    await patent.save();

    return res.status(200).json(new ApiResponse(200, "Patent updated successfully", patent));
});

// deleting a patent
export const deletePatent = asyncHandler(async(req, res) => {
    const patentId  = req.params.id;

    const patent = await Patent.findById(patentId);
    if(!patent) throw new ApiError(404, "Patent not found");

    // => delete the uploads patent later............

    await patent.deleteOne();

    return res.status(200).json(new ApiResponse(200, null, "Patent deleted successfully"));

})