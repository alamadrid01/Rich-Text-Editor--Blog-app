const express = require("express");
const router = express.Router();
const ChangePassword = require("../controllers/profileUpdate/changePassword");

router.patch("/change-password/:id", ChangePassword);

module.exports = router;