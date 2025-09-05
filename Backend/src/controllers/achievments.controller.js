import { Achievement } from "../models/achievement.model.js";

// Create a new achievement
export const createAchievement = async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    const saved = await achievement.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all achievements (latest first)
export const getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ date: -1 });
    res.status(200).json(achievements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get achievement by ID
export const getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) return res.status(404).json({ error: "Not found" });
    res.status(200).json(achievement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update achievement by ID
export const updateAchievement = async (req, res) => {
  try {
    const updated = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete achievement by ID
export const deleteAchievement = async (req, res) => {
  try {
    const deleted = await Achievement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};