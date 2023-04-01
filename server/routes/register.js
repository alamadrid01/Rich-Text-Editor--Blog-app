const express = require("express");
const router = express.Router();
const {Register} = require("../controllers/register");
const multer = require("multer");

const upload = multer();


router.post('/register', upload.none(), Register);

module.exports = router ;


