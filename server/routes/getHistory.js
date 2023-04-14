const express = require("express");
const router = express.Router();
const History = require("../controllers/profile/getHistory");

router.get("/profile-history/:userId", History);

module.exports = router;