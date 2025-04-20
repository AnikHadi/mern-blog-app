import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      // ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://simplybuiltsites.com/wp-content/uploads/how-to-write-a-blog-post.png",
    },
    category: {
      type: String,
      required: true,
      default: "Uncategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
