import mongoose from "mongoose";

const ConferenceSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Paper title is required"],
      trim: true,
      maxlength: [500, "Title cannot exceed 500 characters"],
      // index: true,
    },

    authors: {
      type: String,
      required: [true, "Author details are required"],
      trim: true,
      maxlength: [1000, "Authors field cannot exceed 1000 characters"],
    },

    issn: {
      type: String,
      required: [true, "ISSN is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^\d{4}-\d{3}[\dX]$/.test(v); // e.g. 1234-567X
        },
        message: "Invalid ISSN format. Use format: XXXX-XXXX",
      },
      // index: true,
    },

    journalName: {
      type: String,
      required: [true, "Journal name is required"],
      trim: true,
      maxlength: [300, "Journal name cannot exceed 300 characters"],
      // index: true,
    },

    publisherName: {
      type: String,
      required: [true, "Publisher name is required"],
      trim: true,
      maxlength: [200, "Publisher name cannot exceed 200 characters"],
      // index: true,
    },

    issue: {
      type: String,
      required: [true, "Issue is required"],
      trim: true,
      maxlength: [50, "Issue cannot exceed 50 characters"],
    },

    no: {
      type: String,
      required: [true, "Number is required"],
      trim: true,
      maxlength: [50, "Number cannot exceed 50 characters"],
    },

    pageNo: {
      type: String,
      required: [true, "Page number is required"],
      trim: true,
      maxlength: [50, "Page number cannot exceed 50 characters"],
    },

    year: {
      type: Number,
      required: [true, "Publication year is required"],
      min: [1000, "Year must be at least 1000"],
      max: [
        new Date().getFullYear() + 10,
        "Year cannot be more than 10 years in the future",
      ],
      // index: true,
    },

    doiLink: {
      type: String,
      required: [true, "DOI/Link is required"],
      trim: true,
      maxlength: [500, "DOI/Link cannot exceed 500 characters"],
    },

    supportDocument: {
      type: String,
      trim: true,
    },
},{collection: "conferences",});

ConferenceSchema.index({ title: "text", authors: "text", journalName: "text" });
ConferenceSchema.index({ publisherName: 1, year: -1 });
ConferenceSchema.index({ year: -1, title: 1 });
ConferenceSchema.index({ issn: 1, issue: 1, no: 1 });
ConferenceSchema.index({ journalName: 1, year: -1 });


ConferenceSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        this.title = this.title.trim();
    }
    next();
});

export const Conference = mongoose.model("Conference", ConferenceSchema);
