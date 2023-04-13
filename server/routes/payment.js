const express = require("express");
const router = express.Router();
const Payment = require("../controllers/payment/payment");

router.post("/payment", Payment);

module.exports = router;