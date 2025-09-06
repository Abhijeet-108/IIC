import { Achievement } from "../models/achievement.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

// Create a new achievement
export const createAchievement = asyncHandler(async (req, res) => {
  const { title,  description, date} = req.body;

  if(!title || !description || !date) {
    throw new ApiError(400, "All fields are required");
  }

  let photoPath = null;
  if (req.files && req.files.length > 0) {
    const cloudinaryResponse = await uploadOnCloudinary(req.files[0].path);
    photoPath = cloudinaryResponse?.url || null;
  }

  const achievement = await Achievement.create({
    title,
    description,
    date,
    photo: photoPath
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Achievement created successfully", achievement));
});

// Get all achievements (latest first)
export const getAllAchievements = asyncHandler(async (req, res) => {
  const achievements = await Achievement.find().sort({ date: -1 });
  if (!achievements || achievements.length === 0) {
    return res.status(404).json(new ApiResponse(404, "No achievements found"));
  }
  return res.status(200).json(new ApiResponse(200, "Achievements retrieved successfully", achievements));
});

// Get achievement by ID
export const getAchievementById = asyncHandler(async (req, res) => {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) return res.status(404).json(new ApiResponse(404, "Not found"));
    res.status(200).json(new ApiResponse(200, "Achievement retrieved successfully", achievement));
});

// Update achievement by ID
export const updateAchievement = asyncHandler(async (req, res) => {
    const updated = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.status(200).json(updated);
});

// Delete achievement by ID
export const deleteAchievement = asyncHandler(async (req, res) => {
  const deleted = await Achievement.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.status(200).json({ message: "Deleted successfully" });
}); 