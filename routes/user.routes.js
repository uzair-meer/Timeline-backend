import express from "express";
import { createPost, updatePost } from "../controller/postController.js";
import { singleUpload } from "../middleware/mutler.js";
const router = express.Router();

router.post("/post", singleUpload, createPost);
router.patch("/post/:id", singleUpload, updatePost);

export { router as clientRoutes };
