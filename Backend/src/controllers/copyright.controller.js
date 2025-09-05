import { Copyright } from "../models/copyright.model.js";

// Create a new copyright
export const createCopyright = async (req, res) => {
  try {
    const copyright = new Copyright(req.body);
    const saved = await copyright.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all copyrights (with optional filters via query params)
export const getAllCopyrights = async (req, res) => {
  try {
    const { area, domain, status, startYear, endYear } = req.query;

    let filter = {};

    if (area) filter.area = new RegExp(area, "i");
    if (domain) filter.domain = new RegExp(domain, "i");
    if (status) filter.status = new RegExp(`^${status}$`, "i");
    if (startYear && endYear) {
      filter.year = { $gte: Number(startYear), $lte: Number(endYear) };
    }

    const copyrights = await Copyright.find(filter).sort({ year: -1 });
    res.status(200).json(copyrights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a copyright by ID
export const getCopyrightById = async (req, res) => {
  try {
    const copyright = await Copyright.findById(req.params.id);
    if (!copyright) return res.status(404).json({ error: "Not found" });
    res.status(200).json(copyright);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a copyright by ID
export const updateCopyright = async (req, res) => {
  try {
    const updated = await Copyright.findByIdAndUpdate(
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

// Delete a copyright by ID
export const deleteCopyright = async (req, res) => {
  try {
    const deleted = await Copyright.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Extra: search by copyrightNumber
export const getByCopyrightNumber = async (req, res) => {
  try {
    const { number } = req.params;
    const copyright = await Copyright.findOne({ copyrightNumber: number });
    if (!copyright) return res.status(404).json({ error: "Not found" });
    res.status(200).json(copyright);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
