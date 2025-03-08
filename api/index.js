import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Connect to Mongodb DataBase

function connectMongoDB() {
  try {
    const url = process.env.MONGO_URL;
    const mongo = mongoose.connect(url);
    if (mongo) {
      console.log("MongoDB connected successfully!");
    }
  } catch (error) {
    console.log(err);
  }
}
connectMongoDB();

// All routes should import here
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

app.use("/user", userRoutes);
app.use("/auth", authRoutes);

// Get all posts

app.get("/", (req, res) => {
  res.json({
    message: "Hello, API is running...",
    port: "Blog Server is running on port " + PORT,
  });
});

// Update an existing post

app.put("/api/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  post.title = title;
  post.content = content;
  post.updatedAt = new Date();

  res.json(post);
});

// Delete a post

app.delete("/api/posts/:id", (req, res) => {
  const postIndex = posts.findIndex((p) => p.id === parseInt(req.params.id));

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts.splice(postIndex, 1);

  res.json({ message: "Post deleted successfully" });
});

// Middleware to log requests

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
