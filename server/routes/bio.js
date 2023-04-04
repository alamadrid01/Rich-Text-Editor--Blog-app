const express = require("express");
const router = express.Router();
const Bio = require("../controllers/profileUpdate/bio");

router.patch("/bio/:id", Bio);

module.exports = router;