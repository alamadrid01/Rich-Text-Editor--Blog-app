const express = require("express");
const router = express.Router();
const UpdateProfile = require("../controllers/profileUpdate/updateProfile");

router.put("/update/:id", UpdateProfile);

module.exports = router;