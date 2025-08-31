import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    photo: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

export const Achievement = mongoose.model("Achievement", achievementSchema);
