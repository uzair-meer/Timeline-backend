import {
  uploadToCloudinary,
  removeFromCloudinary,
} from "../config/cloudinaryConfig.js";
import Post from "../models/post.model.js";
import { getDataUri } from "../utils/dataUri.js";

export const createPost = async (req, res, next) => {
  const { date, content, likes } = req.body;
  const file = req.file;

  try {
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileUri = getDataUri(file);
    const result = await uploadToCloudinary(fileUri, "post-images");

    const post = await Post.create({
      date,
      content,
      image: {
        public_id: result.public_id,
        url: result.url,
      },
      likes,
    });

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { date, content, likes } = req.body;
  const file = req.file;

  try {
    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Update fields if provided
    if (date) post.date = date;
    if (content) post.content = content;
    if (likes) post.likes = likes;

    // Handle file upload if a new file is provided
    if (file) {
      // Remove the old image from Cloudinary
      if (post.image && post.image.public_id) {
        await removeFromCloudinary(post.image.public_id);
      }

      // Upload the new image to Cloudinary
      const fileUri = getDataUri(file);
      const result = await uploadToCloudinary(fileUri, "post-images");
      post.image = {
        public_id: result.public_id,
        url: result.url,
      };
    }

    // Save the updated post
    await post.save();

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
