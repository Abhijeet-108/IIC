import { Organization } from "../models/organization.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//Create a new organization
export const createOrganization = asyncHandler(async (req, res) => {
    const { name, thrustArea, city, address, contact, Stages, status } = req.body;

    if (!name || !address || !Stages || !status) {
        throw new ApiError(400, "Name, address, stages, and status are required");
    }

    const organization = await Organization.create({
        name,
        thrustArea,
        city,
        address,
        contact,
        Stages,
        status,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, organization, "Organization created successfully"));
});

// Get all organizations
export const getOrganizations = asyncHandler(async (req, res) => {
    const organizations = await Organization.find();
    if(!organizations) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, "No organizations found"));
    }
    return res
        .status(200)
        .json(new ApiResponse(200, organizations, "Organizations fetched successfully"));
});

// Get organization by ID
export const getOrganizationById = asyncHandler(async (req, res) => {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
        throw new ApiError(404, "Organization not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, organization, "Organization fetched successfully"));
});

// Update organization
export const updateOrganization = asyncHandler(async (req, res) => {
    const organization = await Organization.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!organization) {
        throw new ApiError(404, "Organization not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, organization, "Organization updated successfully"));
});

// Delete organization
export const deleteOrganization = asyncHandler(async (req, res) => {
    const organization = await Organization.findByIdAndDelete(req.params.id);

    if (!organization) {
        throw new ApiError(404, "Organization not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Organization deleted successfully"));
});

// Get incubators
export const getIncubators = asyncHandler(async (req, res) => {
    const incubators = await Organization.findIncubators();

    if(!incubators || incubators.length === 0) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, "No incubators found"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, incubators, "Incubators fetched successfully"));
});

// Get startups
export const getStartups = asyncHandler(async (req, res) => {
    const startups = await Organization.findStartups();
    if(!startups || startups.length === 0) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, "No startups found"));
    }
    return res
        .status(200)
        .json(new ApiResponse(200, startups, "Startups fetched successfully"));
});

// Get organizations by city
export const getByCity = asyncHandler(async (req, res) => {
    const organizations = await Organization.findByCity(req.params.city);
    if(!organizations || organizations.length === 0) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, "No organizations found for the specified city"));
    }
    return res
        .status(200)
        .json(new ApiResponse(200, organizations, "Organizations fetched by city"));
});

// Get organizations by stage
export const getByStage = asyncHandler(async (req, res) => {
    const organizations = await Organization.findByStage(req.params.stage);
    if(!organizations || organizations.length === 0) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, "No organizations found for the specified stage"));
    }
    return res
        .status(200)
        .json(new ApiResponse(200, organizations, "Organizations fetched by stage"));
});

// Get organizations by thrust area
export const getByThrustArea = asyncHandler(async (req, res) => {
    const organizations = await Organization.findByThrustArea(req.params.area);
    if(!organizations || organizations.length === 0) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, "No organizations found for the specified thrust area"));
    }
    return res
        .status(200)
        .json(new ApiResponse(200, organizations, "Organizations fetched by thrust area"));
});
