import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    date: {
      type: Date,
      required: [true, "Event date is required"],
      index: true,
    },

    headline: {
      type: String,
      required: [true, "Event headline is required"],
      trim: true,
      index: true,
    },

    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
    },

    status: {
      type: String,
      required: [true, "Event status is required"],
      enum: {
        values: ["Notice", "Activity", "Meeting"],
        message: "Status must be one of: Notice, Activity, Meeting",
      },
      index: true,
    },
}, {collection: "events",});

// Indexes
EventSchema.index({ date: 1, status: 1 });
EventSchema.index({ status: 1, date: -1 });
EventSchema.index({ headline: "text", description: "text" });


EventSchema.pre("save", function (next) {
    if (this.isModified("headline")) {
        this.headline = this.headline.trim();
    }
    if (this.isModified("status")) {
        this.status = this.status.charAt(0).toUpperCase() + this.status.slice(1).toLowerCase();
    }
    next();
});

export const Event = mongoose.model("Event", EventSchema);