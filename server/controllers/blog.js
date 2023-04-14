const blogSchema = require("../model/blogSchema");
const User = require("../model/userSchema");
const mongoose = require("mongoose");

const getAllPost = async (req, res) => {
  try {
    const allPosts = await blogSchema.find();
    res.json(allPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPost = async (req, res) => {
  const { title, body, author, description } = req.body;
  const file = req.file;

  const { originalname, path } = req.file;


  if (!title || !body || !author || !file || !description) {
    res.status(400).json({ message: "Missing or no parameters" });
    return;
  }

  try {
    const saveBlog = await blogSchema.create({
      title,
      body,
      author,
      description,

      blogImage: {
        image: originalname,
        path,
      },
    });
    res.status(201).json(saveBlog);
  } catch (err) {
    res.status(500);
  }
};

const saveId = async(req, res) => {
  const userId = req.params.postId;
  const {postId} = req.body;

  if (!postId || !userId) {
    res.status(400).json({ message: "User ID and Post Id is required" });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(409).json({ message: "Id is not valid" });

    try {

      await User.updateOne(
        { _id: userId },
        { $addToSet: { posts: postId } }
      );

      res.sendStatus(204);

    } catch (err) {
      res.status(500).json(err.message);
    }

}

const deletePost = async (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;

  if (!postId || !userId) {
    res.status(400).json({ message: "No params was passed in" });
    return;
  }

  if(!mongoose.Types.ObjectId.isValid(postId)) return res.status(409).json({message: "Id is not valid"});

  try {
    const deleteBlog = await blogSchema.findOneAndDelete({ _id: postId });
    await User.updateOne({ _id: userId }, { $pull: { posts: postId } })
      .then((result) => {
        
      })
      .catch((error) => {   
        return res.status(500).json(error);
      });
    if (!deleteBlog) {
      res.status(404).json({ message: "Blog post not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updatePost = async (req, res) => {
  const { title, body, author } = req.body;
  const postId = req.params.postId;

  if (!title || !body || !postId || !author) {
    res.status(400).json({ message: "Missing or invalid parameters" });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(409).json({ message: "Id is not valid" });

  try {
    const updatedBlog = await blogSchema.findOneAndUpdate(
      postId,
      { title, body, author },
      { new: true }
    );
    if (updatedBlog) {
      res.status(200).json(updatedBlog);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getSinglePost = async (req, res) => {
  const postId = req.params.postId;

  if (!postId) {
    res.status(400).json({ message: "No params was passed in" });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(409).json({ message: "Id is not valid" });

  try {
    const post = await blogSchema.findById(postId);
    if (!post) {
      res.status(404).json({ message: "No post found with that ID" });
      return;
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createPost,
  deletePost,
  updatePost,
  getSinglePost,
  getAllPost,
  saveId
};
