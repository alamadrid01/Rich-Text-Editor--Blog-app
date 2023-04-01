const express = require("express");
const router = express.Router();
const {Login} = require("../controllers/login");
const multer = require("multer");

const upload = multer();

router.post("/login", upload.none(), Login);

module.exports = router;