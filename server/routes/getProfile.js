const express = require("express");
const router = express.Router();
const Profile = require("../controllers/profile/profile");

router.get("/profile/:id", Profile);

module.exports = router;