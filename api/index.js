import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

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

// Mock data

const posts = [
  {
    id: 1,
    title: "First Post",
    content: "This is the first blog post.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "Second Post",
    content: "This is the second blog post.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Get all posts

app.get("/", (req, res) => {
  res.json("Blog Server is running on port " + PORT);
});

// Get single post by ID

app.get("/api/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
});

// Create a new post

app.post("/api/posts", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const newPost = {
    id: Date.now(),
    title,
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  posts.push(newPost);

  res.status(201).json(newPost);
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

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
