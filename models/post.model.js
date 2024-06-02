import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, "date is required!"],
    },
    content: {
      type: String,
      required: [true, "content is required!"],
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    likes: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
