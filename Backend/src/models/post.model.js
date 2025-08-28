import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    links:{
        type: [String],
        default: []
    },
    uploads:{
        type: [String],
        default: []
    },
},{ timestamps: true })

export const Post = mongoose.model("Post", postSchema);