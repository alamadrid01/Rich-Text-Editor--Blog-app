const express = require("express")
const { createPost, deletePost, updatePost, getSinglePost, getAllPost, saveId } = require("../controllers/blog");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Verify = require("../controllers/verify")

const router = express.Router();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog', 
    public_id: (req, file) => Date.now() + '-' + file.originalname 
  }
});
  
  const upload = multer({ storage: storage });

// router.get("/blog", Verify, getAllPost);
router.get("/blog", getAllPost);
router.post("/blog",upload.single('image'), createPost);
router.get("/blog/:postId", getSinglePost);
router.delete("/blog/:userId/:postId", deletePost);
router.patch("/blog/:postId", upload.none(), updatePost)
router.put("/blog/:postId", upload.none(), saveId);

module.exports = router;