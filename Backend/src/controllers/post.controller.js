import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/post.model.js";

// creating a post
export const createPost = asyncHandler(async(req, res) => {
    const {title, description, links} = req.body;
    const userId = req.user.id;

    const uploadedFiles = req.files ? req.files.map(file => file.path) : [];

    let post = await Post.create({
        title,
        description,
        links,
        uploads: uploadedFiles,
        author: userId
    });

    post = await post.populate("author", "fullname email");

    return res.status(201).json(new ApiResponse(201, "Post created successfully", post));
})


// view all  post
export const getAllPost = asyncHandler(async(req, res) => {
    const posts = await Post.find().populate("author", "fullname email").sort({ createdAt: -1 });
    if(!posts || posts.length === 0) {
        throw new ApiError(404, "Post not found");
    }
    return res.status(200).json(new ApiResponse(200, "Posts get successfully", posts));
})

// view post by user
export const getPostsByUser = asyncHandler(async(req, res) => {
    const userId = req.user.id;

    const posts = await Post.find({ author: userId }).populate("author", "fullname email").sort({ createdAt: -1 });
    if(!posts || posts.length === 0) {
        return res.status(404).json(new ApiResponse(404, "No posts found for this user"));
    }
    return res.status(200).json(new ApiResponse(200, "Posts get successfully", posts));
})

// update the post
export const updatePost = asyncHandler(async(req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;
    console.log("REQ BODY:", req.body);
    const { title, description, links } = req.body;

    const post = await Post.findById(postId);
    if(!post) throw new ApiError(404, "Post not found");

    if(post.author.toString() !== userId) throw new ApiError(403, "You are not authorized to update this post");

    let uploadedFiles = post.uploads;
    if(req.files && req.files.length > 0){
        uploadedFiles = [
            ...uploadedFiles,
            ...req.files.map(file => file.path)
        ]
    }

    post.title = title;
    post.description = description;
    post.links = links;
    post.uploads = uploadedFiles;

    await post.save();

    return res.status(200).json(new ApiResponse(200, "Post updated successfully", post));
});

// deleting a post
export const deletePost = asyncHandler(async(req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if(!post) throw new ApiError(404, "Post not found");

    if(post.author.toString() !== userId) throw new ApiError(403, "You are not authorized to update this post");

    // => delete the uploads post later............

    await post.deleteOne();

    return res.status(200).json(new ApiResponse(200, null, "Post deleted successfully"));

})
