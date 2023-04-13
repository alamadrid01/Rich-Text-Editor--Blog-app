const express = require("express");
const router = express.Router();
const UpdateProfile = require("../controllers/profile/updateProfile");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog",
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const upload = multer({storage: storage});

router.put("/update/:id", upload.single('image'), UpdateProfile);

module.exports = router;
