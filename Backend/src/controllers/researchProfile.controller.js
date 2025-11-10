import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ResearchProfile } from "../models/researchProfile.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

// create the research profile
export const createResearchProfile = asyncHandler(async (req, res) => {
    const data = req.body;

    const exists = await ResearchProfile.findOne({ facultyId: data.facultyId, isDeleted: false });
    if (exists) {
        throw new ApiError(400, "Research profile already exists for this faculty");
    }

    if (req.file) {
        const uploadResult = await uploadOnCloudinary(req.file.path);
        if (!uploadResult?.secure_url) {
            throw new ApiError(500, "Photograph upload failed");
        }
        data.photograph = uploadResult.secure_url;
    }

    const profile = await ResearchProfile.create(data);
    return res
        .status(201)
        .json(new ApiResponse(201, profile, "Research profile created successfully"));
});

// get all research profile
export const getAllResearchProfiles = asyncHandler(async (req, res) => {

    const profile = await ResearchProfile.find().populate("facultyId");

    if (!profile) {
        throw new ApiError(404, "Research profile not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, profile, "Research profile fetched successfully"));
});

// get research profile by faculty ID
export const getResearchProfileByFacultyId = asyncHandler(async (req, res) => {
    const { facultyId } = req.params;

    const profile = await ResearchProfile.findByFacultyId(facultyId);
    if (!profile) {
        throw new ApiError(404, "Research profile not found for this faculty ID");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, profile, "Research profile fetched successfully"));
});

// update research profile by ID
export const updateResearchProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
        const uploadResult = await uploadOnCloudinary(req.file.path);
        if (!uploadResult?.secure_url) {
            throw new ApiError(500, "Photograph upload failed");
        }
        updates.photograph = uploadResult.secure_url;
    }

    const profile = await ResearchProfile.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true
    });

    if (!profile) {
        throw new ApiError(404, "Research profile not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, profile, "Research profile updated successfully"));
});

// delete research profile by ID
export const deleteResearchProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const profile = await ResearchProfile.findByIdAndDelete(id);
    if (!profile) {
        throw new ApiError(404, "Research profile not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, profile, "Research profile deleted successfully"));
});

// get research profile by designation
export const getResearchProfileByDesignation = asyncHandler(async (req, res) => {
    const { designation } = req.params;

    const profile = await ResearchProfile.findOne({ designation });
    if (!profile || profile.length === 0) {
        throw new ApiError(404, "Research profile not found for this designation");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, profile, "Research profile fetched successfully"));
});
