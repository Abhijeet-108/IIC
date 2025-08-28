import { createPost, getAllPost, getPostsByUser, updatePost, deletePost } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/post.multer.middleware.js";
import Router from "express";

const router = Router();

router.route("/create-posts").post(verifyJWT, upload.array("uploads"), createPost);
router.route("/get-posts").get(verifyJWT, getAllPost);
router.route("/get-posts/user").get(verifyJWT, getPostsByUser);
router.route("/posts/:postId").put(verifyJWT, updatePost).delete(verifyJWT, deletePost);

export default router;