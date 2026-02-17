const Post = require("../Models/Post.model");
const imagekit = require("../config/imagekit")
const getUserFromToken = require("../middleware/Auth");

// ===== CREATE POST =====
const CreatePostController = async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const { caption } = req.body;

    const base64File = req.file.buffer.toString("base64");
    const fileData = `data:${req.file.mimetype};base64,${base64File}`;

    const uploadResponse = await imagekit.upload({
      file: fileData,
      fileName: `${Date.now()}-${req.file.originalname}`,
      folder: "posts",
    });

    const newPost = await Post.create({
      caption,
      img_url: uploadResponse.url,
      img_fileId: uploadResponse.fileId,
      user: userId,
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });

  } catch (error) {
    console.error("CREATE POST ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===== GET ALL POSTS =====
const GetAllPostsController = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username email profile")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error("GET ALL POSTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===== GET MY POSTS =====
const GetMyPostsController = async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const posts = await Post.find({ user: userId })
      .populate("user", "username email profile")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error("GET MY POSTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===== DELETE POST =====
const DeletePostController = async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (post.img_fileId) {
      await imagekit.deleteFile(post.img_fileId);
    }

    await post.deleteOne();

    res.json({ message: "Post deleted successfully" });

  } catch (error) {
    console.error("DELETE POST ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  CreatePostController,
  GetAllPostsController,
  GetMyPostsController,
  DeletePostController,
};
