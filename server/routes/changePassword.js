const express = require("express");
const router = express.Router();
const ChangePassword = require("../controllers/profileUpdate/changePassword");
const multer = require("multer");

const upload = multer();

router.patch("/change-password/:id", upload.none(), ChangePassword);

module.exports = router;