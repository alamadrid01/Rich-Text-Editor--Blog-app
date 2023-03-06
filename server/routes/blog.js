const express = require("express")
const { createPost, deletePost, updatePost, getSinglePost, getAllPost } = require("../controllers/blog");

const router = express.Router();


router.get("/blog", getAllPost);
router.post("/blog", createPost);
router.get("/blog/:postId", getSinglePost);
router.delete("/blog/:postId", deletePost);
router.patch("/blog/:postId", updatePost)

module.exports = router;