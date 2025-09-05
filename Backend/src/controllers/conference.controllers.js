import { Conference } from "../models/conference.model.js";

// Create a new conference paper
export const createConference = async (req, res) => {
  try {
    const conference = new Conference(req.body);
    const saved = await conference.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all conference papers (latest first by year)
export const getAllConferences = async (req, res) => {
  try {
    const conferences = await Conference.find().sort({ year: -1 });
    res.status(200).json(conferences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get conference paper by ID
export const getConferenceById = async (req, res) => {
  try {
    const conference = await Conference.findById(req.params.id);
    if (!conference) return res.status(404).json({ error: "Conference paper not found" });
    res.status(200).json(conference);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update conference paper by ID
export const updateConference = async (req, res) => {
  try {
    const updated = await Conference.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Conference paper not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete conference paper by ID
export const deleteConference = async (req, res) => {
  try {
    const deleted = await Conference.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Conference paper not found" });
    res.status(200).json({ message: "Conference paper deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
